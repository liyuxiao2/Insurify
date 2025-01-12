import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './dashBoard.css';


const Sidebar = () => {
    const navigate = useNavigate(); // React Router's navigate hook
    const location = useLocation(); // React Router's location hook
    
    
    return (
        <div className="sidebar">
            <h2>Sidebar</h2>
            <ul> 
                <li>
                    <button
                            className="sidebar-button"
                            onClick={() => navigate('/items-expense')}
                    >
                            Home
                        </button>
                    </li>
                    <li>
                        <button
                            className="sidebar-button"
                            onClick={() => navigate('/profile')}
                        >
                            Profile
                        </button>
                    </li>
                    <li>
                        <button
                            className="sidebar-button"
                            onClick={() => navigate('/settings')}
                        >
                            Settings
                        </button>
                    </li>
                    <li>
                        <button
                            className="sidebar-button"
                            onClick={() => navigate('/logout')}
                        >
                            Logout
                        </button>
                    </li>
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
