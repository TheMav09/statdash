import { createSlice } from '@reduxjs/toolkit';  // Importing createSlice from Redux Toolkit

// Define the shape of the state for assets
// This state will store an array of asset items (strings for now)
interface AssetsState {
  items: string[];  // Array of asset items (can be expanded to hold more complex objects later)
}

// Define the initial state for assets
const initialState: AssetsState = {
  items: [],  // Start with an empty array of asset items
};

// Create the assets slice using createSlice from Redux Toolkit
// A slice contains the state and the reducers (actions) to modify that state
const assetsSlice = createSlice({
  name: 'assets',  // Name of the slice, used as a key in the Redux store
  initialState,    // Initial state for the assets slice
  reducers: {      // Reducers define how the state can be modified
    // Action to add an asset to the state
    addAsset(state, action) {
      state.items.push(action.payload);  // Adds the new asset (from action.payload) to the items array
    }
  }
});

// Export the action so it can be dispatched to modify the state
export const { addAsset } = assetsSlice.actions;

// Export the reducer to be included in the store
export default assetsSlice.reducer;
