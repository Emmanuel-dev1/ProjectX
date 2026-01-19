import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import ProtectedRoute from './components/ProtectedRoute';
import JobsPage from './pages/JobsPage';
import SupportPage from './pages/SupportPage';
import TalentSearchPage from './pages/TalentSearchPage';
import PostJobPage from './pages/PostJobPage';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import './index.css';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Router>
        <AuthProvider>
          <Routes>
            {/* Public Routes - No authentication required */}
            <Route path="/welcome" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            
            {/* Protected Routes - Require authentication */}
            <Route path="/talent-search" element={
              <ProtectedRoute>
                <TalentSearchPage />
              </ProtectedRoute>
            } />
            
            <Route path="/post-job" element={
              <ProtectedRoute requiredRole="client">
                <PostJobPage />
              </ProtectedRoute>
            } />
            
            {/* Semi-protected routes - Some functionality requires auth but page is accessible */}
            <Route path="/" element={<JobsPage />} />
            <Route path="/support" element={<SupportPage />} />
            
            {/* Redirects */}
            <Route path="/home" element={<Navigate to="/welcome" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
};

export default App;