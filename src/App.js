import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import Login from './Components/Login';
import Register from './Components/Register';
import Dashboard from './Components/Dashboard';
import EventsPage from './Components/EventsPage';
import AdminDashboard from './Components/AdminDashboard';
import EventsManage from './Components/EventsManage';
import Logout from './Components/Logout';
import Dash from './Components/Dash';
import ForgotPassword from './Components/ForgotPassword';
import ResetPassword from './Components/ResetPassword';
import BookingHistoryPage from './Components/BookingHistoryPage';
import ManageRegistrations from './Components/ManageRegistrations';
import ManageUsers from './Components/ManageUsers';
import Notification from './Components/Notification';
import TeacherDashboard from './Components/TeacherDashboard';
import NotificationDisplay from './Components/NotificationDisplay';
import RegistrationPage from './Components/RegistrationPage';
import TeacherStudent from './Components/TeacherStudent';
import TeacherNotifications from './Components/TeacherNotifications';
import TeacherReviewRequests from './Components/TeacherReviewRequests';


function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Redirect to Dash if the user goes to the root URL */}
                <Route path="/" element={<Navigate to="/dash" />} />

                {/* Route for Dash */}
                <Route path="/dash" element={<Dash />} />

                {/* Route for Dash */}
                <Route path="/teacher" element={<TeacherDashboard />} />
                <Route path="/teacher/student" element={<TeacherStudent />} />
                <Route path="/teacher/notifications" element={<TeacherNotifications />} />
                <Route path="/teacher/review-requests" element={<TeacherReviewRequests />} />
                

                {/* Route for Register */}
                <Route path="/register" element={<Register />} />

                {/* Route for Login */}
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />

                {/* Route for User Dashboard */}
                <Route path="/dashboard" element={<Dashboard />} />

                {/* Route for Events Page */}
                <Route path="/event" element={<EventsPage />} />
                <Route path="/evereg" element={<RegistrationPage />} />
                <Route path="/booking-history" element={<BookingHistoryPage />} />

                {/* Route for Manage Registrations */}
                <Route path="/manage-registrations" element={<ManageRegistrations />} />

                {/* Route for Admin Dashboard */}
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/notification" element={<Notification />} />
                <Route path="/noti" element={<NotificationDisplay />} />

                {/* Route for Events Manage Page */}
                <Route path="/manage-events" element={<EventsManage />} />
                <Route path="/manage-users" element={<ManageUsers />} />

                {/* Route for Forgot Password */}
                <Route path="/forgot-password" element={<ForgotPassword />} />

                {/* Route for Reset Password */}
                <Route path="/reset-password" element={<ResetPassword />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
