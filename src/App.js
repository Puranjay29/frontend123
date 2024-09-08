// src/App.js
import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Components & Pages
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Feed from './pages/Feed';
import Connections from './pages/Connections';
import JobMatching from './pages/JobMatching';
import Messages from './pages/Messages';
import Notifications from './pages/Notifications';
import Settings from './pages/Settings';
import HelpCenter from './pages/HelpCenter';
import UserLogin from './pages/Authentication/UserLogin';
import AdminLogin from './pages/Authentication/AdminLogin';
import Register from './pages/Authentication/Register';
import AdminDashboard from './pages/AdminDashboard';

// Auth Context
import { AuthContext } from './contexts/AuthContext';

const App = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={!isAuthenticated ? <UserLogin /> : <Navigate to="/dashboard" />} />
        <Route path="/admin-login" element={!isAuthenticated ? <AdminLogin /> : <Navigate to="/admin-dashboard" />} />
        <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/dashboard" />} />

        {/* Private Routes for authenticated users */}
        {isAuthenticated && (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/job-matching" element={<JobMatching />} />
            <Route path="/connections" element={<Connections />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/help-center" element={<HelpCenter />} />

            {/* Admin Route */}
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
          </>
        )}

        {/* Redirect unauthenticated users */}
        <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
      </Routes>
    </Router>
  );
};

export default App;
