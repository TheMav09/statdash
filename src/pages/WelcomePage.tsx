// src/pages/WelcomePage.tsx

import React, { useState, useEffect } from 'react';
import { useMsal } from '@azure/msal-react'; // MSAL hook for managing authentication instance
import { useDispatch } from 'react-redux'; // Redux hook for dispatching actions
import { loginSuccess } from '../store/slices/authSlice'; // Action to handle login success
import { loginRequest } from '../config/msalConfig'; // MSAL login request configuration
import { useNavigate } from 'react-router-dom'; // React Router's navigate hook for redirecting

/**
 * WelcomePage Component:
 * - This is the landing page that prompts users to log in using their Microsoft credentials.
 * - If the user is already logged in, it automatically redirects them to the /home page.
 * - It manages the login process via MSAL, including error handling and loading states.
 */
const WelcomePage: React.FC = () => {
  const { instance, accounts } = useMsal(); // Get MSAL instance and accounts from MSAL hook
  const dispatch = useDispatch(); // Redux dispatch function for updating state
  const navigate = useNavigate(); // React Router's navigate hook for redirecting after login
  const [loading, setLoading] = useState(false); // State for tracking the loading status of the login process
  const [error, setError] = useState(''); // State for tracking any login errors

  /**
   * useEffect Hook:
   * - If there are already accounts (i.e., the user is logged in), dispatch the loginSuccess action and redirect to /home.
   */
  useEffect(() => {
    if (accounts.length > 0) {
      dispatch(loginSuccess(accounts[0])); // Dispatch loginSuccess with the logged-in account
      navigate('/home'); // Redirect to home page if user is logged in
    }
  }, [accounts, dispatch, navigate]);

  /**
   * handleLogin:
   * - Initiates the login process using MSAL's loginPopup method.
   * - Handles the loading state and error messaging during the login process.
   * - Upon successful login, the user is redirected to the /home page.
   */
  const handleLogin = () => {
    setLoading(true); // Set loading state to true while login is in progress
    setError(''); // Clear any previous error messages

    instance.loginPopup(loginRequest)
      .then(() => {
        setLoading(false); // Reset loading state after successful login
        navigate('/home'); // Redirect to home page after successful login
      })
      .catch((loginError) => {
        console.error('Login failed:', loginError); // Log any login errors
        setLoading(false); // Reset loading state if login fails
        setError('Login failed. Please try again.'); // Set error message for user
      });
  };

  return (
    <div className="loginContainer">
      <h1>Welcome to StatDash3.0</h1>
      
      {/* Display error message if login fails */}
      {error && <p className="errorMessage">{error}</p>}
      
      {/* Button to initiate login, with loading state */}
      <button 
        onClick={handleLogin} 
        className="loginButton" 
        disabled={loading} 
        aria-busy={loading}  // Accessibility for screen readers during loading
      >
        {loading ? 'Logging in...' : 'Login with Microsoft'} {/* Show loading text during login */}
      </button>
    </div>
  );
};

export default WelcomePage;
