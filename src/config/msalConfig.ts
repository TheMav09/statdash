// msalConfig.ts

/**
 * MSAL Configuration:
 * - This object defines the necessary configuration settings for MSAL authentication.
 * - The settings include information for the authentication process such as client ID, authority, and redirect URI.
 * - It also specifies the caching location for authentication state.
 */
const msalConfig = {
  auth: {
    // The Client ID of the Azure AD application, loaded from environment variables (.env)
    clientId: process.env.REACT_APP_AZURE_CLIENT_ID || "", // Fallback to an empty string if not set

    // The authority URL for Azure AD, specific to the tenant the app is registered with
    authority: `https://login.microsoftonline.com/${process.env.REACT_APP_AZURE_TENANT_ID}`, 

    // The redirect URI to which users will be redirected after login, loaded from .env or defaults to the current window location
    redirectUri: process.env.REACT_APP_REDIRECT_URI || window.location.origin, 
  },
  cache: {
    // Where to store the authentication tokens, options are 'localStorage' or 'sessionStorage'
    cacheLocation: "localStorage",  // This stores the tokens in the browser's localStorage

    // Set to true for older browsers like IE11 or Edge, typically false for modern applications
    storeAuthStateInCookie: false,  
  },
};

/**
 * loginRequest:
 * - Defines the scopes required by the application during login.
 * - Scopes dictate what kind of access the user is granting (e.g., User.Read gives permission to read the user profile).
 */
export const loginRequest = {
  scopes: ["User.Read"],  // This scope allows the app to read the user's profile
};

// Export the MSAL configuration for use throughout the app
export default msalConfig;
