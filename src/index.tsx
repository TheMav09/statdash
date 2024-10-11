// src/index.tsx
// The entry point of the application that sets up the app with React, MSAL, and Redux.

import React from 'react';
import ReactDOM from 'react-dom/client'; // Import ReactDOM to render the app into the DOM
import { Provider } from 'react-redux'; // Import Redux Provider to wrap the app for global state management
import { PublicClientApplication } from '@azure/msal-browser'; // MSAL PublicClientApplication for authentication
import { MsalProvider } from '@azure/msal-react'; // MsalProvider to integrate MSAL with React
import './index.css'; // Global CSS styles for the app
import App from './App'; // Import the main App component
import msalConfig from './config/msalConfig'; // Import MSAL configuration
import { store } from './store'; // Import the Redux store
import reportWebVitals from './reportWebVitals'; // Import for performance metrics
import { initializeMsalInstance } from './services/azureServices/tokenManager'; // Ensure MSAL initialization

// Initialize MSAL instance before using it
initializeMsalInstance();

// Create an MSAL instance using the provided configuration
const msalInstance = new PublicClientApplication(msalConfig);

// Find the root HTML element where the React app will be rendered
const rootElement = document.getElementById('root')!;
const root = ReactDOM.createRoot(rootElement); // Create a root to render the React app

// Render the app inside the root element
root.render(
  <React.StrictMode> {/* StrictMode is used to highlight potential problems in the app */}
    <MsalProvider instance={msalInstance}> {/* Provide MSAL authentication context */}
      <Provider store={store}> {/* Provide Redux store context for global state management */}
        <App /> {/* Render the main App component */}
      </Provider>
    </MsalProvider>
  </React.StrictMode>
);

// Start measuring performance metrics in the app (optional)
reportWebVitals();
