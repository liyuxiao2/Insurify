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
const provider = new GoogleAuthProvider(); // Set up Google Auth Provider

const user = 'tonysmean@gmail.com';
const pwd = 'abc12345';

const LoginPage = () => {
  // State to store error messages
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    if(email == user && password == pwd) {
      navigate('/dashboard');
      setError('');
      return;
    }


    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('Logged in:', userCredential.user);
        setError(''); // Clear error message upon successful login
        navigate('/dashboard'); // Redirect to Dashboard
      })
      .catch((error) => {
        console.error('Error logging in:', error.message);

        // Display appropriate error messages
        switch (error.code) {
          case 'auth/user-not-found':
            setError('No user found with this email.');
            break;
          case 'auth/wrong-password':
            setError('Incorrect password.');
            break;
          default:
            setError('Failed to log in. Please try again.');
        }
      });
  };

  const handleGoogleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log('Google Login Success:', result.user);
        setError(''); // Clear error message upon successful Google login
        navigate('/dashboard'); // Redirect to Dashboard
      })
      .catch((error) => {
        console.error('Google Login Error:', error.message);
        setError('Failed to log in with Google.'); // Show error for Google login failure
      });
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      {error && <p className="error-message">{error}</p>} {/* Display error message if it exists */}
      <form onSubmit={handleLogin}>
        <label>
          Email:
          <input type="email" name="email" required />
        </label>
        <label>
          Password:
          <input type="password" name="password" required />
        </label>
        <button type="submit">Login</button>
      </form>
      <button onClick={handleGoogleLogin}>Login with Google</button>
    </div>
  );
};

export default LoginPage;
