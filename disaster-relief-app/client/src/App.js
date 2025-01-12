import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import DashBoard from './components/dashBoard';
import ItemsExpense from './components/itemsExpense';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/items-expense" element={<ItemsExpense />} />
      </Routes>
    </div>
  );
};

export default App;