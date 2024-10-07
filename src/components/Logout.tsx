// src/components/Logout.tsx

import React from 'react';
import { useMsal } from '@azure/msal-react'; // MSAL hook to manage authentication instance
import { useNavigate } from 'react-router-dom'; // React Router hook to programmatically navigate between routes

/**
 * Logout component:
 * - Displays a button that logs the user out of the application.
 * - Uses the MSAL instance for handling the logout process.
 * - Redirects the user to the Welcome page upon successful logout.
 */
const Logout: React.FC = () => {
  // Get the MSAL instance from the MSAL React hook
  const { instance } = useMsal();

  // Get the navigate function from React Router to redirect the user after logout
  const navigate = useNavigate();

  /**
   * handleLogout:
   * - Initiates the logout process via MSAL's logoutPopup method.
   * - On successful logout, it navigates the user to the /welcome page.
   * - If the logout process fails, it logs the error to the console.
   */
  const handleLogout = () => {
    instance.logoutPopup()
      .then(() => {
        // Upon successful logout, redirect the user to the Welcome page
        navigate('/welcome');
      })
      .catch(error => {
        // Log any errors that occur during the logout process
        console.error('Logout failed:', error);
      });
  };

  return (
    <button onClick={handleLogout}>
      Logout {/* Button that triggers the logout process */}
    </button>
  );
};

export default Logout;
