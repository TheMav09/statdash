import { createSlice, PayloadAction } from '@reduxjs/toolkit';  // Importing createSlice and PayloadAction from Redux Toolkit
import { AccountInfo } from '@azure/msal-browser';  // Importing AccountInfo type from MSAL for user account details

// Define the shape of the authentication state
// This state stores whether the user is authenticated and the user's account information
interface AuthState {
  isAuthenticated: boolean;  // Boolean flag to indicate if the user is authenticated
  user: AccountInfo | null;  // User information, or null if the user is not logged in
}

// Initial state for the authentication slice
const initialState: AuthState = {
  isAuthenticated: false,  // Initially, the user is not authenticated
  user: null,  // No user is logged in initially
};

// Create the authentication slice using createSlice from Redux Toolkit
// This slice manages the state of authentication in the app
const authSlice = createSlice({
  name: 'auth',  // Name of the slice, used as a key in the Redux store
  initialState,  // Initial state defined above
  reducers: {    // Reducers define how the state is modified in response to actions
    // Reducer to handle a successful login
    // When a user logs in successfully, we update the state to set the user and isAuthenticated flag
    loginSuccess(state, action: PayloadAction<AccountInfo>) {
      state.isAuthenticated = true;  // Set the isAuthenticated flag to true
      state.user = action.payload;   // Store the user's account information in the state
    },
    // Reducer to handle a successful logout
    // When a user logs out, we reset the state to indicate they are no longer authenticated
    logoutSuccess(state) {
      state.isAuthenticated = false;  // Set the isAuthenticated flag to false
      state.user = null;  // Clear the user information from the state
    },
  },
});

// Export the actions (loginSuccess and logoutSuccess) so they can be dispatched elsewhere in the app
export const { loginSuccess, logoutSuccess } = authSlice.actions;

// Export the reducer to be included in the Redux store
export default authSlice.reducer;
