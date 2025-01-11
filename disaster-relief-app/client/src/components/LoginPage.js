import React from 'react';
import { initializeApp } from 'firebase/app'; // Import initializeApp from modular SDK
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider(); // Set up Google Auth Provider

const LoginPage = () => {
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('Logged in:', userCredential.user);
      })
      .catch((error) => {
        console.error('Error logging in:', error.message);
      });
  };

  const handleGoogleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log('Google Login Success:', result.user);
      })
      .catch((error) => {
        console.error('Google Login Error:', error.message);
      });
  };

  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleLogin}>
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
      <br />
      <button onClick={handleGoogleLogin}>Login with Google</button>
    </div>
  );
};

export default LoginPage;