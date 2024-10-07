import { configureStore } from '@reduxjs/toolkit';  // Importing the configureStore method from Redux Toolkit
import authReducer from './slices/authSlice';       // Importing the authentication slice
import assetsReducer from './slices/assetsSlice';   // Importing the assets slice
import costsReducer from './slices/costsSlice';     // Importing the costs slice
import metricsReducer from './slices/metricsSlice'; // Importing the metrics slice

// Configure and create the Redux store
// The store holds the global state for the entire application
export const store = configureStore({
  // Combine all the reducers into a single reducer object
  reducer: {
    // Each key here corresponds to a slice of state, managed by its respective reducer
    auth: authReducer,        // Manages the auth state (e.g., user login/logout)
    assets: assetsReducer,    // Manages the assets state (e.g., IT asset information)
    costs: costsReducer,      // Manages the costs state (e.g., Azure cost tracking)
    metrics: metricsReducer,  // Manages the metrics state (e.g., CPU usage, health metrics)
  },
});

// Define the RootState type, which represents the entire state tree
// This type will be useful for TypeScript when selecting state from the store
export type RootState = ReturnType<typeof store.getState>;

// Define the AppDispatch type, which represents the dispatch function of the store
// This type ensures that only valid actions are dispatched in the application
export type AppDispatch = typeof store.dispatch;
