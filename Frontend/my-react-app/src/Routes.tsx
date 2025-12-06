import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import SignUpPage from './Components/Auth/SignUp'
import DashboardPage from './Components/Dashboard'
import LoginPage from './Components/Auth/Login'
import OurCustomersPage from './Components/Customers'
const RoutesComponent = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage/>} />
        <Route path="/signup" element={<SignUpPage/>} />
        <Route path="/dashboard" element={<DashboardPage/>} />
        <Route path="/our-customers" element={<OurCustomersPage/>} />
      </Routes>
    </Router>
  )
}
export default RoutesComponent