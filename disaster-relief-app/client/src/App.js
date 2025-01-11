import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import DashBoard from './components/dashBoard';

const App = () => {
  return (
    <Router>
      <nav>
        <Link to="/">Login</Link>
        <Link to="/disaster-verification">Disaster Verification</Link>
      </nav>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashBoard />} />
      </Routes>
    </Router>
  );
};

export default App;