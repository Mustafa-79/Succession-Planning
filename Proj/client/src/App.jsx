import './App.css'
import { Routes, Route } from 'react-router-dom';
import Navbar from '../src/components/Navbar';
import Home from '../src/pages/Home';
import Signup from './pages/Signup';
import Login from '../src/pages/Login';
import ResetPwd from './pages/resetPwd';
import ResetFinalPwd from './pages/resetPg2'
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import { UserContextProvider } from '../context/userContext';
import Dashboard from './pages/Admin/Dashboard';
import AssessFeedback from './pages/Admin/AssessFeedback';
import CreateAssessment from './pages/Admin/CreateAssessment';
import EmployeeData from './pages/Admin/EmployeeData';
import AdminSettings from './pages/Admin/AdminSettings';
import ForgetSecurityImage from './pages/forgetsecimg'
import AboutEmployee from './pages/Employee/About'
import EmployeeDashboard from './pages/Employee/EmpDashboard';
import Feedback from './pages/Employee/Feedback';
import FeedbackForm from './pages/Employee/FeedbackForm';
import UserProfile from './pages/UserProfile';
import EmployeeSettings from './pages/Employee/EmployeeSettings';
import DevelopmentPlans from './pages/Employee/DevelopmentPlans';
import AboutAdmin from './pages/Admin/AboutAdmin';
import EmployeePerformance from './pages/Admin/EmployeePerformance';
import ComplaintForm from './pages/Employee/ComplaintForm';
import PendingAssessments from './pages/Employee/PendingAssessments';
import AdminProfile from './pages/Admin/AdminProfile';
import PromotionSkillSet from './pages/Employee/Career Path/PromotonSkillSet';
import AvailablePositions from './pages/Employee/Career Path/AvailablePositions';
import PromotionProgress from './pages/Employee/Career Path/PromotionProgress';
import Courses from './pages/Employee/Development Plans/Courses';
import Workshops from './pages/Employee/Development Plans/Workshops';
import Mentor from './pages/Employee/Development Plans/Mentor';
import ModelTuning from './pages/Admin/ModelTuning';

axios.defaults.baseURL = 'http://localhost:8000/';
axios.defaults.withCredentials = true

function App() {
    return (
        <>
            <Toaster position='bottom-right' toastOptions={{ duration: 2000 }} />
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/login' element={<Login />} />

                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/dashboard/performance' element={<EmployeePerformance/>} />
                <Route path='/assess_feedback' element={<AssessFeedback />} />
                <Route path='/create_assessment' element={<CreateAssessment />} />
                <Route path='/employee_data' element={<EmployeeData />} />
                <Route path='/admin_settings' element={<AdminSettings />} />
                <Route path='/model_tuning' element={<ModelTuning />} />
                <Route path='/about' element={<AboutEmployee />} />


                <Route path='/resetPassword' element={<ResetPwd />} />
                <Route path='/resetPasswordFinalStep' element={<ResetFinalPwd />} />
                <Route path='/resetSecurityImage' element={<ForgetSecurityImage />} />

                <Route path='/employeeDashboard' element={<EmployeeDashboard />} />
                <Route path='/employeeDashboard/skills' element={<PromotionSkillSet />} />
                <Route path='/employeeDashboard/positions' element={<AvailablePositions />} />
                <Route path='/employeeDashboard/progress' element={<PromotionProgress />} />

                {JSON.parse(localStorage.getItem('user')) && JSON.parse(localStorage.getItem('user')).employeeID && (
                <Route path='/feedback' element={<Feedback />} />)}
                <Route path='/feedback/feedbackForm' element={<FeedbackForm />} />
                <Route path='/feedback/complaintForm' element={<ComplaintForm />} />
                <Route path='/feedback/pendingAssessments' element={<PendingAssessments />} />

                <Route path='/developmentPlans' element={<DevelopmentPlans />} />
                <Route path='/developmentPlans/courses' element={<Courses />} />
                <Route path='/developmentPlans/workshops' element={<Workshops />} />
                <Route path='/developmentPlans/mentor' element={<Mentor />} />



                <Route path='/employeeSettings' element={<EmployeeSettings />} />
                <Route path='/userProfile' element={<UserProfile />} />
                <Route path='/aboutAdmin' element={<AboutAdmin />} />
                <Route path='/adminProfile' element={<AdminProfile />} />



            </Routes>
        </>
    )
}

export default App
