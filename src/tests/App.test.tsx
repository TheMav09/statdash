// src/tests/App.test.tsx
// This file contains unit tests for the App component using React Testing Library.

import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MsalProvider } from '@azure/msal-react';
import { PublicClientApplication } from '@azure/msal-browser';
import App from '../App'; // Correct import path for App
import { store } from '../store'; // Correct import path for Redux store
import msalConfig from '../config/msalConfig'; // Correct import path for MSAL config

// Create an MSAL instance for the test
const msalInstance = new PublicClientApplication(msalConfig);

test('renders welcome message', () => {
  // Render the App component with MSAL and Redux providers
  render(
    <MsalProvider instance={msalInstance}>
      <Provider store={store}>
        <App />
      </Provider>
    </MsalProvider>
  );

  // Check if the welcome message is displayed
  const welcomeElement = screen.getByText(/Welcome to StatDash1.0/i);
  
  // Assert that the element is found and is present in the document.
  expect(welcomeElement).toBeInTheDocument();
});
