import React from 'react';
import './dashBoard.css';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <h2>Sidebar</h2>
            <ul>
                <li>Home</li>
                <li>Profile</li>
                <li>Settings</li>
                <li>Logout</li>
            </ul>
        </div>
    );
};

const HomePage = () => {
    return (
        <div className="homepage">
            <h1>Welcome to the Dashboard</h1>
            <p>This is the homepage content.</p>
        </div>
    );
};

const DashBoard = () => {
    return (
        <div className="dashboard">
            <Sidebar />
            <HomePage />
        </div>
    );
};

export default DashBoard;