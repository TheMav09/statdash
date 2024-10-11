import { ConfidentialClientApplication } from '@azure/msal-node';
import dotenv from 'dotenv';

dotenv.config();

const msalConfig = {
    auth: {
        clientId: process.env.AZURE_CLIENT_ID,
        authority: `https://login.microsoftonline.com/${process.env.AZURE_TENANT_ID}`,
        clientSecret: process.env.AZURE_CLIENT_SECRET,
    },
};

const msalInstance = new ConfidentialClientApplication(msalConfig);

// Cache tokens by scope
let tokenCache = {};

// General token function for any scope, caching tokens per scope
const getAccessToken = async (scope) => {
    const now = Date.now();
    
    // Check if there's a cached token for this scope
    const cachedToken = tokenCache[scope];
    if (cachedToken && cachedToken.expirationTime > now) {
        return cachedToken.accessToken;  // Return the cached valid token
    }

    try {
        const result = await msalInstance.acquireTokenByClientCredential({
            scopes: [scope.trim()],
        });

        if (!result || !result.accessToken) {
            throw new Error("Failed to acquire access token.");
        }

        // Cache the new token with its expiration time
        const expirationTime = result.expiresOn ? result.expiresOn.getTime() : now + 3600000; // 1 hour fallback
        tokenCache[scope] = {
            accessToken: result.accessToken,
            expirationTime
        };

        return result.accessToken;
    } catch (error) {
        console.error("Failed to acquire access token", error);
        throw error;
    }
};

// Management API token
export const getManagementAccessToken = async () => {
    const accessToken = await getAccessToken('https://management.azure.com/.default');
    console.log("Management Access Token: ", accessToken);  // Log for debugging
    return accessToken;
};

// Log Analytics API token
export const getLogAnalyticsAccessToken = async () => {
    try {
        const accessToken = await getAccessToken('https://api.loganalytics.io/.default');
        console.log('Log Analytics Access Token:', accessToken);  // Log the actual token
        return accessToken;
    } catch (error) {
        console.error('Error fetching Log Analytics Access Token:', error);
        throw error;
    }
};

// Clear cached tokens
export const clearCachedTokenBackend = () => {
    tokenCache = {};  // Reset the cache
};
