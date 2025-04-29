import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import Dashboard from '../pages/User/Dashboard';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import ManageExpense from '../pages/User/ManageExpense';
import ManageCategory from '../pages/User/ManageCategory';
import ManageBudgetType from '../pages/User/ManageBudgetType';
import ManageGoal from '../pages/User/ManageGoal';
import ManageBudget from '../pages/User/ManageBudget';
import ManageProgress from '../pages/User/ManageProgress';
import ManageBudgetCalculator from '../pages/User/ManageCalculator';
import ManageFinanceAssitance from '../pages/User/ManageFinanceAssitance';




const AppRoutes = () => (
  <Router>
    <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/user/dashboard" element={<Dashboard />} />
    <Route path="/login" element={<Login/>} />
    <Route path='/register' element={<Register/>} />
    <Route path='/user/manage_expense' element={<ManageExpense/>} /> 
    <Route path='/user/manage_category' element={<ManageCategory/>} /> 
    <Route path='/user/manage_budget_type' element={<ManageBudgetType/>} /> 
    <Route path='/user/manage_goal' element={<ManageGoal/>} /> 
    <Route path='/user/manage_budget' element={<ManageBudget/>} /> 
    <Route path='/user/manage_progress' element={<ManageProgress/>} /> 
    <Route path='/user/manage_budget_calculator' element={<ManageBudgetCalculator/>} /> 
    <Route path='/user/manage_finance_assistance' element={<ManageFinanceAssitance/>} /> 
    </Routes>
  </Router>
);

export default AppRoutes;
