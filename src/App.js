import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Homepage from './pages/Homepage';
import Dashboard from './pages/Dashboard';
import Complaints from './pages/Complaints';
import CreateComplaint from './pages/CreateComplaint';
import ComplaintDetail from './pages/ComplaintDetail';
import AssignComplaint from './pages/AssignComplaint';
import UpdateComplaintStatus from './pages/UpdateComplaintStatus';
import ComplaintHistory from './pages/ComplaintHistory';
import VoiceComplaint from './pages/VoiceComplaint';
import Notices from './pages/Notices';
import CreateNotice from './pages/CreateNotice';
import EditNotice from './pages/EditNotice';
// 🟢 FIXED: Import Food instead of MessMenu
import Food from './pages/Food'; 
import UploadMenu from './pages/UploadMenu';
import RateMeal from './pages/RateMeal';
import MyFeedback from './pages/MyFeedback';
import MessAnalytics from './pages/MessAnalytics';
import Bills from './pages/Bills';
import ManageBills from './pages/ManageBills';
import PaymentHistory from './pages/PaymentHistory';
import Profile from './pages/Profile';
import ChangePassword from './pages/ChangePassword';
import Users from './pages/Users';
import Search from './pages/Search';
import Settings from './pages/Settings';
import Notifications from './pages/Notifications';
import ScanQR from './pages/ScanQR';
import GenerateReport from './pages/GenerateReport';
import EmergencySOS from './pages/EmergencySOS';
import PublicDashboard from './pages/PublicDashboard';
import MaintenanceHeatmap from './pages/MaintenanceHeatmap';
import Help from './pages/Help';
import About from './pages/About';

const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/public-dashboard" element={<PublicDashboard />} />
      
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/complaints" element={<ProtectedRoute><Complaints /></ProtectedRoute>} />
      <Route path="/complaints/create" element={<ProtectedRoute><CreateComplaint /></ProtectedRoute>} />
      <Route path="/complaints/:id" element={<ProtectedRoute><ComplaintDetail /></ProtectedRoute>} />
      <Route path="/complaints/:id/assign" element={<ProtectedRoute><AssignComplaint /></ProtectedRoute>} />
      <Route path="/complaints/:id/update-status" element={<ProtectedRoute><UpdateComplaintStatus /></ProtectedRoute>} />
      <Route path="/complaints/:id/history" element={<ProtectedRoute><ComplaintHistory /></ProtectedRoute>} />
      <Route path="/voice-complaint" element={<ProtectedRoute><VoiceComplaint /></ProtectedRoute>} />
      
      <Route path="/notices" element={<ProtectedRoute><Notices /></ProtectedRoute>} />
      <Route path="/notices/create" element={<ProtectedRoute><CreateNotice /></ProtectedRoute>} />
      <Route path="/notices/edit/:id" element={<ProtectedRoute><EditNotice /></ProtectedRoute>} />
      
      {/* 🟢 FIXED: Route changed to /food */}
      <Route path="/food" element={<ProtectedRoute><Food /></ProtectedRoute>} />
      
      <Route path="/upload-menu" element={<ProtectedRoute><UploadMenu /></ProtectedRoute>} />
      <Route path="/rate-meal/:menuId" element={<ProtectedRoute><RateMeal /></ProtectedRoute>} />
      <Route path="/my-feedback" element={<ProtectedRoute><MyFeedback /></ProtectedRoute>} />
      <Route path="/mess-analytics" element={<ProtectedRoute><MessAnalytics /></ProtectedRoute>} />
      
      <Route path="/bills" element={<ProtectedRoute><Bills /></ProtectedRoute>} />
      <Route path="/manage-bills" element={<ProtectedRoute><ManageBills /></ProtectedRoute>} />
      <Route path="/payment-history" element={<ProtectedRoute><PaymentHistory /></ProtectedRoute>} />
      
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/about" element={<About />} />
      
      <Route path="/users" element={
        (user?.role === 'warden' || user?.role === 'admin') 
        ? <ProtectedRoute><Users /></ProtectedRoute> 
        : <Navigate to="/dashboard" replace />
      } />
      
      <Route path="/search" element={<ProtectedRoute><Search /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
      <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
      <Route path="/scan-qr" element={<ProtectedRoute><ScanQR /></ProtectedRoute>} />
      <Route path="/generate-report" element={<ProtectedRoute><GenerateReport /></ProtectedRoute>} />
      <Route path="/emergency-sos" element={<ProtectedRoute><EmergencySOS /></ProtectedRoute>} />
      <Route path="/heatmap" element={<ProtectedRoute><MaintenanceHeatmap /></ProtectedRoute>} />
      <Route path="/help" element={<ProtectedRoute><Help /></ProtectedRoute>} />
      <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />
      
      <Route path="/" element={user ? <Navigate to="/dashboard" replace /> : <Homepage />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;