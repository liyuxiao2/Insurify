import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import DashBoard from './components/dashBoard';
import ItemsExpense from './components/itemsExpense';

const App = () => {
  return (
    <div>
      <nav>
        <Link to="/">Login</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/items-expense">Items Expense</Link>
      </nav>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/items-expense" element={<ItemsExpense />} />
      </Routes>
    </div>
  );
};

export default App;