import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import DashBoard from './components/dashBoard';
import ItemsExpense from './components/itemsExpense';

const App = () => {
  return (
    <div>
      <LoginPage />
    </div>
  );
};

export default App;