import { Visibility, VisibilityOff } from '@mui/icons-material';
import { TextField, Button, InputAdornment, IconButton } from '@mui/material'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useUser } from '../Contexts/UserContext';
import { useMediaQuery } from '@mui/material';
const LoginPage = () => {
    const navigate = useNavigate();
    const isMobile = useMediaQuery('(max-width: 600px)');
    const { setUser } = useUser();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const response = await fetch('http://localhost:5000/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        console.log("LOGIN RESPONSE:", data);
        const userData = data.user || { 
          _id: data.objectId,
          name: data.name || '',
          email: data.email || ''
        };
        // Backend returns: "exist", "wrong password", "not exist"
        if (data.status === true) {
            toast.success("Login successful", { autoClose: 3000 });
            navigate("/home");
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
            if (data.token) {
              localStorage.setItem('token', data.token);
            }
          } else {
            toast.error(data.message, { autoClose: 3000 });
          }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
            <div className='flexRow fullH' style={{padding: '30px', borderRadius: '10px'}}>
                {!isMobile && <div className='flexCol halfWidth jCntr aCntr' style={{backgroundColor: '#0b4938', borderRadius:'10px 0px 0px 10px'}}>
                  <div style={{width:'250px', height:'250px'}}>
                    <img src={'/public/Icons/LoginBanner.png'} alt="logo" />
                  </div>
                  <span style={{fontSize: '24px', fontWeight: 'bold', color: '#ffffff'}}>Welcome to "E-Commerce Store"</span>
                </div>}
                <div className='flexCol jCntr aCntr halfWidth' style={{border:'1px solid rgb(214, 216, 219)', borderRadius:'0px 10px 10px 0px'}}>
                    <span style={{fontSize: '32px', fontWeight: 'bold'}} className='pdngBLG'>Login</span>
                    <form onSubmit={handleSubmit} style={{width: '60%'}}>
<div className='flexCol'>
                        <TextField
                            label="Email"
                            value={email}
                            fullWidth
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            // placeholder="Email"
                            style={{ marginBottom: "30px" }}
                        />

                        <TextField
                            fullWidth
                            label="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type={showPassword ? "text" : "password"}
                            InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <IconButton>
                                        {showPassword ? <Visibility onClick={() => setShowPassword(!showPassword)} /> : <VisibilityOff onClick={() => setShowPassword(!showPassword)} />}
                                    </IconButton>
                                  </InputAdornment>
                                ),
                              }}    
                            // placeholder="Password"
                            style={{ marginBottom: "30px" }}
                        />
</div>
                        <Button fullWidth variant="contained" type="submit">Login</Button>
                    </form>
                    <span style={{marginTop: '20px'}}>Don't have an account? <Link style={{color: '#0b4938', textDecoration: 'none'}} to="/signup">Sign up</Link></span>
                </div>
            </div>


        </div>
    );
};

export default LoginPage;
