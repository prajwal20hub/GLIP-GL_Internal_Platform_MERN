import React from 'react';
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Register from './Components/Authentication/Register/register';
import Login from './Components/Authentication/Login/login';
import ForgotPassword from './Components/Authentication/Fogot_Password/forgot-password';
import Deactivate from './Components/Authentication/Deactivate/deactivate';
import Home from './Components/Home/home'
import NotFound from './Components/NotFound/NotFound'
import Dashboard from './Components/Dashboard/dashboard';
import ResetPassword from './Components/Authentication/Reset_Password/reset-password'
import AccessDenied from './Components/AccessDenied/access-denied'
import LeaveManageAdmin from './Components/Tiles/Leave-Management/Leave-Management-Admin/leave-manage-admin';
import LeaveManageEmp from './Components/Tiles/Leave-Management/Leave-Management-Emp/leave-manage-emp';

//Tiles
import AccessPrivilegeAdmin from './Components/Tiles/Access-Privilege/Access-Privilege-Admin/access-privilege-admin';
import AccessPrivilegeEmp from './Components/Tiles/Access-Privilege/Access-Privilege-Employee/access-privilege-emp';

import TaskManagementAdmin from './Components/Tiles/Task-Management/Task-Management-Admin/task-management-admin';
import TaskManagementEmp from './Components/Tiles/Task-Management/Task-Management-Emp/task-management-emp';

import TransportEmp from './Components/Tiles/Transport/Transport-Employee/transport-emp';
import TransportAdmin from './Components/Tiles/Transport/Transport-Admin/transport-admin';

import PayslipsAdmin from './Components/Tiles/Payslips/Payslip-Admin/payslips-admin';
import PayslipsEmp from './Components/Tiles/Payslips/Payslip-Emp/payslips-emp';

import FeedbackHome from './Components/Tiles/Feedbacks/Feedback-Home/feedback-home';

import FeedForm from './Components/Tiles/Feedbacks/Feedback-Form/Form/feed-form';
import FeedChart from './Components/Tiles/Feedbacks/Feedback-Form/Chart/feed-chart';

import CompSurvey from './Components/Tiles/Feedbacks/Comapany-Survey/Form/comp-survey';
import CompSurveyChart from './Components/Tiles/Feedbacks/Comapany-Survey/Chart/comp-survey-chart';

import TechSurvey from './Components/Tiles/Feedbacks/Technology-Survey/Form/tech-survey';

import TechSurveyChart from './Components/Tiles/Feedbacks/Technology-Survey/Chart/tech-survey-chart';

import AlreadyFill from './Components/Tiles/Feedbacks/Already-Filled/already-filled';

const App = () => {
  const isloggedin = useSelector((state) => state.isloggedin);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />

        {/* Protected Routes */}
        <Route path='/register' element={!isloggedin ? <Register /> : <AccessDenied />} /> 
        <Route path='/login' element={!isloggedin ?<Login /> : <AccessDenied />} /> 
        <Route path='/forgotpassword' element={!isloggedin ? <ForgotPassword /> : <AccessDenied />} /> 
        
        <Route path='/deactivate/:id' element={<Deactivate />} />
        <Route path='/dashboard/:id' element={<Dashboard />} /> 
        <Route path='/resetpassword/:id' element={<ResetPassword />} /> 
        <Route path='*' element={<NotFound />} /> 
       
        {/* Tiles  */}
        <Route path='/dashboard/access-privilege-emp/:id' element={<AccessPrivilegeEmp />} /> 
        <Route path='/dashboard/access-privilege-admin/:id' element={<AccessPrivilegeAdmin />} /> 

        <Route path='/dashboard/task-manage-emp/:id' element={<TaskManagementEmp />} /> 
        <Route path='/dashboard/task-manage-admin/:id' element={<TaskManagementAdmin />} /> 

        <Route path='/dashboard/transport-manage-emp/:id' element={<TransportEmp />} /> 
        <Route path='/dashboard/transport-manage-admin/:id' element={<TransportAdmin />} /> 

        <Route path='/dashboard/leave-manage-emp/:id' element={<LeaveManageEmp />} /> 
        <Route path='/dashboard/leave-manage-admin/:id' element={<LeaveManageAdmin />} /> 

        <Route path='/dashboard/payslips-emp/:id' element={<PayslipsEmp />} />
        <Route path='/dashboard/payslips-admin/:id' element={<PayslipsAdmin />} />

        <Route path="/dashboard/feedback-home/:id" element={<FeedbackHome />} />

        <Route path="/dashboard/feedback-form/:id" element={<FeedForm />} />
        <Route path="/dashboard/feedback-chart/:id" element={<FeedChart />} />

        <Route path="/dashboard/company-survey/:id" element={<CompSurvey />} />
        <Route path="/dashboard/company-survey-chart/:id" element={<CompSurveyChart />} />

        <Route path="/dashboard/tech-survey/:id" element={<TechSurvey />} />
        <Route path="/dashboard/tech-survey-chart/:id" element={<TechSurveyChart />} />

        <Route path="/dashboard/already-filled/:id" element={<AlreadyFill />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
