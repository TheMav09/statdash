// src/App.tsx
// This is the main application component, responsible for setting up the routing and state management.
// It also integrates with Azure MSAL for authentication and Redux for state management.

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; // Routing components from react-router-dom
import { MsalProvider } from '@azure/msal-react'; // Provider for MSAL (Azure authentication) 
import { store } from './store'; // Redux store to manage global state
import { Provider } from 'react-redux'; // Redux provider to wrap the app for global state access
import { PublicClientApplication } from '@azure/msal-browser'; // MSAL class for authentication
import msalConfig from './config/msalConfig'; // MSAL configuration for authentication
import WelcomePage from './pages/WelcomePage'; // Import of the WelcomePage component
import HomePage from './pages/HomePage'; // Import of the HomePage component
import AzureHealth from './pages/AzureHealth'; // Import of the AzureHealth component
import AzureCosts from './pages/AzureCosts'; // Import of the AzureCosts component
import AzureManagement from './pages/AzureManagement'; // Import of the AzureManagement component
import AssetManagement from './pages/AssetManagement'; // Import of the AssetManagement component

// Create an instance of MSAL with the provided configuration
const msalInstance = new PublicClientApplication(msalConfig);

function App() {
  return (
    // Wrap the entire app with Redux provider for global state access
    <Provider store={store}>
      {/* Wrap the app with MsalProvider to provide MSAL authentication */}
      <MsalProvider instance={msalInstance}>
        {/* Set up React Router for navigation */}
        <Router>
          <Routes>
            {/* Define routes for the app */}
            {/* Navigate "/" to "/welcome" by default */}
            <Route path="/" element={<Navigate to="/welcome" replace />} />
            
            {/* Define specific routes for each page */}
            <Route path="/welcome" element={<WelcomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/azure-health" element={<AzureHealth />} />
            <Route path="/azure-costs" element={<AzureCosts />} />
            <Route path="/azure-management" element={<AzureManagement />} />
            <Route path="/asset-management" element={<AssetManagement />} />
          </Routes>
        </Router>
      </MsalProvider>
    </Provider>
  );
}

export default App;
