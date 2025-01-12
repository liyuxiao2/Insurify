import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';

const firebaseConfig = {
  apiKey: "AIzaSyDqsiV5kTzjlFWQujbDGrv4Z7cw20jxqAo",
  authDomain: "hack-4e8f7.firebaseapp.com",
  projectId: "hack-4e8f7",
  storageBucket: "hack-4e8f7.appspot.com",
  messagingSenderId: "425237262999",
  appId: "1:425237262999:web:226e2cc8fcf363f489afd2",
  measurementId: "G-3QN7DXBHPH"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const LoginPage = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setError('');
        navigate('/dashboard');
      })
      .catch((error) => {
        console.error('Error logging in:', error.message);
        setError('Failed to log in. Please try again.');
      });
  };

  const handleGoogleLogin = () => {
    signInWithPopup(auth, provider)
      .then(() => {
        setError('');
        navigate('/dashboard');
      })
      .catch((error) => {
        console.error('Google Login Error:', error.message);
      });
  };

  return (
    <div className="login-page">
      <div className="header">
        <h1 className="header-title">Disaster Relief A.I Assistant</h1>
      </div>
      <div className="login-card">
        <h1>Welcome Back</h1>
        <p className="login-subtitle">Please enter your details.</p>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleLogin} className="login-form">
          <input type="email" name="email" placeholder="Email" required className="input-field" />
          <input type="password" name="password" placeholder="Password" required className="input-field" />
          <button type="submit" className="primary-button">Log In</button>
        </form>
        <button onClick={handleGoogleLogin} className="secondary-button">Log in with Google</button>
      </div>
    </div>
  );
};

export default LoginPage;
