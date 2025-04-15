import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import Dashboard from '../pages/User/Dashboard';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';




const AppRoutes = () => (
  <Router>
    <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/user/dashboard" element={<Dashboard />} />
    <Route path="/login" element={<Login/>} />
    <Route path='/register' element={<Register/>} />
    </Routes>
  </Router>
);

export default AppRoutes;
