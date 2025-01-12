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
        position: 'absolute', // Keeps the button fixed on the screen
        top: '10px', // Distance from the bottom of the screen
        left: '170px', // Distance from the left side of the screen
        cursor: 'pointer',
        fontSize: '16px',
        border: '2px solid blue',
        width: '40px',
        height: '40px',
        color: 'blue',
        backgroundColor: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', // Adds subtle shadow
        outline: 'none',
        zIndex: 1000, // Ensures it stays on top of other elements
        }}>
        ←
      </button>
  );
}


const App = () => {
  return (
    <div style={{ height: '100vh', margin: 0, padding: 0, display: 'flex', flexDirection: 'column' }}>
      <BackButton />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/items-expense" element={<ItemsExpense />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </div>
  );
};


export default App;