import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Button, IconButton, InputAdornment, TextField } from '@mui/material'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const SignUpPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(username, email, password);
    const response = await fetch('http://localhost:5000/signup', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: username, email, password }),
    });
    const data = await response.json();
    console.log(data, 'datasignup');
    if (data?.status === true) {
      setTimeout(() => {
        toast.success('SignUp successful', { position: "top-right", autoClose: 3000 });
      }, 1000);
      navigate('/dashboard');
    } else if (email === '' || password === '' || username === '') {
      toast.error('All fields are required', { position: "top-right", autoClose: 3000 });
    }
    else if (email.includes('@') === false) {
      toast.error('Invalid email', { position: "top-right", autoClose: 3000 });
    }
    else if (password?.length < 8) {
      toast.error('Password must be at least 8 characters long', { position: "top-right", autoClose: 3000 });
    }
    else if (password !== confirmPassword) {
      toast.error('Passwords do not match', { position: "top-right", autoClose: 3000 });
    }
    else if (username?.length < 3) {
      toast.error('Username must be at least 3 characters long', { position: "top-right", autoClose: 3000 });
    }
    else {
      navigate('/');
      toast.error('Email already exists Please Login', { position: "top-right", autoClose: 3000 });
    }
  }
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
      <div className='flexRow fullH' style={{ padding: '30px', borderRadius: '10px' }}>
        <div className='flexCol halfWidth jCntr aCntr' style={{ backgroundColor: '#0b4938', borderRadius: '10px 0px 0px 10px' }}>
          <div style={{ width: '250px', height: '250px' }}>
            <img src={'/public/Icons/LoginBanner.png'} alt="logo" />
          </div>
          <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#ffffff' }}>Welcome to "E-Commerce Store"</span>
        </div>
        <div className='flexCol jCntr aCntr halfWidth' style={{ border: '1px solid rgb(214, 216, 219)', borderRadius: '0px 10px 10px 0px' }}>
          <span style={{ fontSize: '32px', fontWeight: 'bold' }} className='pdngBLG'>SignUp</span>
          <form onSubmit={handleSubmit} style={{ width: '60%' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}> <TextField label="Username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Username" />
              <TextField label="Email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" />
              <TextField label="Password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} type={showPassword ? "text" : "password"} placeholder="Password" InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton>
                      {showPassword ? <Visibility onClick={() => setShowPassword(!showPassword)} /> : <VisibilityOff onClick={() => setShowPassword(!showPassword)} />}
                    </IconButton>
                  </InputAdornment>
                ),
              }} />
              <TextField label="Confirm Password" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type={showPassword ? "text" : "password"} placeholder="Confirm Password" InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton>
                      {showPassword ? <Visibility onClick={() => setShowPassword(!showPassword)} /> : <VisibilityOff onClick={() => setShowPassword(!showPassword)} />}
                    </IconButton>
                  </InputAdornment>
                ),
              }} />
              <Button variant="contained" type="submit">SignUp</Button>
            </div>
          </form>
          <span style={{ marginTop: '20px' }}>Already have an account? <Link style={{ color: '#0b4938', textDecoration: 'none' }} to="/">Login</Link></span>
        </div>
      </div>

    </div>
  )
}
export default SignUpPage