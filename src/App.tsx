// App.tsx - Fix the route paths
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import JobsPage from './pages/JobsPage';
import SupportPage from './pages/SupportPage';
import TalentSearchPage from './pages/TalentSearchPage';
import PostJobPage from './pages/PostJobPage'; // We'll create this
import './index.css';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<JobsPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/talent-search" element={<TalentSearchPage />} />
        <Route path="/post-job" element={<PostJobPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;