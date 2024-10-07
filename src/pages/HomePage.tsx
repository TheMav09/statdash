// src/pages/HomePage.tsx

import React from 'react';
import Logout from '../components/Logout'; // Import the reusable Logout component

/**
 * HomePage Component:
 * - This is the landing page for users after successful authentication.
 * - It currently displays a welcome message and includes the reusable Logout button.
 * - Future iterations may include an overview of metrics or a dashboard for the user's Azure resources.
 */
const HomePage: React.FC = () => {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>

      {/* Add the Logout button for user logout functionality */}
      <Logout />
    </div>
  );
};

export default HomePage;
