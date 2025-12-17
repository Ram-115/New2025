import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import SignUpPage from './Components/Auth/SignUp'
import DashboardPage from './Components/Dashboard'
import LoginPage from './Components/Auth/Login'
import OurCustomersPage from './Components/Customers'
import ProductsPage from './Components/Products'
import ShoppingPage from './Components/Shopping'
import HomePage from './Components/Dashboard/Components/Home'

const RoutesComponent = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />

        {/* ✅ Parent Route with Outlet */}
        <Route element={<DashboardPage />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/users" element={<OurCustomersPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/shopping" element={<ShoppingPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default RoutesComponent;
