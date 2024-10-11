// src/services/azureServices/tokenManager.ts

import { PublicClientApplication, AccountInfo } from "@azure/msal-browser";
import msalConfig from "../../config/msalConfig";

// MSAL configuration for authentication
let msalInstance: PublicClientApplication | null = null;

// Cache token for reuse along with expiration time
let cachedAccessToken: string | null = null;
let tokenExpirationTime: number | null = null;  // To store the expiration timestamp

/**
 * Initialize MSAL instance if not already initialized
 */
export const initializeMsalInstance = () => {
    if (!msalInstance) {
        msalInstance = new PublicClientApplication(msalConfig);
    }
};

/**
 * Get an access token for Azure API calls
 * @param scope The Azure scope (e.g., https://management.azure.com/.default)
 * @returns {Promise<string>} Access token
 */
export const getAccessToken = async (scope: string): Promise<string> => {
    if (!msalInstance) {
        throw new Error("MSAL instance is not initialized.");
    }

    // Check if the cached token is still valid
    if (cachedAccessToken && tokenExpirationTime && tokenExpirationTime > Date.now()) {
        return cachedAccessToken;
    }

    try {
        const account = msalInstance.getAllAccounts()[0];  // Get the logged-in user account
        if (!account) {
            throw new Error("No active Azure account found.");
        }

        // Acquire token silently
        const response = await msalInstance.acquireTokenSilent({
            account: account as AccountInfo,
            scopes: [scope],
        });

        // Cache the token and expiration time for future requests
        cachedAccessToken = response.accessToken;
        if (response.expiresOn) {
            tokenExpirationTime = response.expiresOn.getTime(); // Use 'expiresOn' which is a Date object
        }

        return response.accessToken;

    } catch (error) {
        console.error("Failed to acquire access token silently", error);

        // Fallback to interactive login if silent acquisition fails
        try {
            const loginResponse = await msalInstance.acquireTokenPopup({
                scopes: [scope],
            });

            // Cache the new token and expiration time after interactive login
            cachedAccessToken = loginResponse.accessToken;
            if (loginResponse.expiresOn) {
                tokenExpirationTime = loginResponse.expiresOn.getTime(); // Use 'expiresOn' which is a Date object
            }

            return loginResponse.accessToken;
        } catch (interactiveError) {
            console.error("Failed to acquire access token interactively", interactiveError);
            throw interactiveError;
        }
    }
};

/**
 * Clears cached token (e.g., after logout)
 */
export const clearCachedToken = () => {
    cachedAccessToken = null;
    tokenExpirationTime = null;
};
