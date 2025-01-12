import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import DashBoard from './components/dashBoard';
import ItemsExpense from './components/itemsExpense';
import { useNavigate } from 'react-router-dom';
import Profile from './components/Profile';
import Logout from './components/Logout.js';

const BackButton = () => {
  const navigate = useNavigate();
  return (
      <button onClick={() => navigate(-1)} style={{ 
        margin: '0px',
        position: 'fixed',
        top: 7,
        left: 170,
        cursor: 'pointer',
        fontSize: '50px',
        border: 'none',
        padding: 0,
        color:'blue',
        background:'transparent',
        outline:'none',
        }}>
        ← 
      </button>
  );
}

const App = () => {
  return (
    <div>

      <BackButton />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/items-expense" element={<ItemsExpense />} />

        <Route path="/profile" element={<Profile />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
      </div>
      </Routes>
    </div>

  );
};

export default App;