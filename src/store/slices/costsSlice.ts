import { createSlice } from '@reduxjs/toolkit';  // Importing createSlice from Redux Toolkit

// Define the shape of the costs state
// This state holds the total cost of resources, which can be updated
interface CostsState {
  totalCost: number;  // The total cost of Azure services or other tracked expenses
}

// Initial state for the costs slice
const initialState: CostsState = {
  totalCost: 0,  // Initially, the total cost is set to 0
};

// Create the slice using createSlice from Redux Toolkit
// This slice manages the state related to costs in the app
const costsSlice = createSlice({
  name: 'costs',  // Name of the slice, used as a key in the Redux store
  initialState,   // The initial state defined above
  reducers: {     // Reducers define how the state is modified in response to actions
    // Reducer to update the total cost in the state
    // This will be used when you want to set the total cost of services in the app
    setTotalCost(state, action) {
      state.totalCost = action.payload;  // Set the total cost to the value provided in the action payload
    },
  },
});

// Export the setTotalCost action so it can be dispatched elsewhere in the app
export const { setTotalCost } = costsSlice.actions;

// Export the reducer to be included in the Redux store
export default costsSlice.reducer;
