import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const DashboardPage = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate('/');
    toast.success('Logged out successfully', { position: "top-right" , autoClose: 3000 });
  }
    return (
    <div style={{ display: 'flex', height: '100vh', flexDirection: 'column' }} >
      <h1>Welcome to Dashboard</h1>
      <Button variant="contained" onClick={handleLogout}>Logout</Button>
      <Button variant="contained" onClick={() => navigate('/our-customers')}>Our Customers</Button>
    </div>
  )
}
export default DashboardPage