import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDqsiV5kTzjlFWQujbDGrv4Z7cw20jxqAo",
  authDomain: "hack-4e8f7.firebaseapp.com",
  projectId: "hack-4e8f7",
  storageBucket: "hack-4e8f7.appspot.com",
  messagingSenderId: "425237262999",
  appId: "1:425237262999:web:226e2cc8fcf363f489afd2",
  measurementId: "G-3QN7DXBHPH"
};

// Dummy Email/Password:
const predefinedEmail = "tonysmean@gmail.com";
const predefinedPassword = "abc12345";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const LoginPage = () => {
  const [error, setError] = useState(null); // State for error messages
  const navigate = useNavigate();

  const handleUserLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (email === predefinedEmail && password === predefinedPassword) {
      setError(null); // Clear the error state
      navigate('/dashboard'); // Navigate to the dashboard page
    } else {
      setError("Invalid email or password. Please try again."); // Set an error message
    }
  };

  const handleGoogleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log('Google Login Success:', result.user);
        setError(null); // Clear the error state
        navigate('/dashboard'); // Navigate to the dashboard page
      })
      .catch((error) => {
        console.error('Google Login Error:', error.message);
        setError("Google login failed. Please try again."); // Display a relevant error
      });
  };

  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleUserLogin}>
        <label>
          Email:
          <input type="email" name="email" required />
        </label>
        <br />
        <label>
          Password:
          <input type="password" name="password" required />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>} {/* Display error message */}
      <br />
      <button onClick={handleGoogleLogin}>Login with Google</button>
    </div>
  );
};

export default LoginPage;