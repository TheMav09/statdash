import { createSlice } from '@reduxjs/toolkit';  // Importing createSlice from Redux Toolkit

// Define the shape of the metrics state
// This state holds metrics such as CPU usage for Azure VMs or other tracked resources
interface MetricsState {
  cpuUsage: number;  // A metric to track the CPU usage of a VM or system
}

// Initial state for the metrics slice
const initialState: MetricsState = {
  cpuUsage: 0,  // Initially, CPU usage is set to 0
};

// Create the slice using createSlice from Redux Toolkit
// This slice manages state related to metrics like CPU usage
const metricsSlice = createSlice({
  name: 'metrics',  // Name of the slice, used as a key in the Redux store
  initialState,     // The initial state defined above
  reducers: {       // Reducers define how the state is modified in response to actions
    // Reducer to update the CPU usage in the state
    // This will be used when you want to set the CPU usage metric
    setCpuUsage(state, action) {
      state.cpuUsage = action.payload;  // Set the CPU usage to the value provided in the action payload
    },
  },
});

// Export the setCpuUsage action so it can be dispatched elsewhere in the app
export const { setCpuUsage } = metricsSlice.actions;

// Export the reducer to be included in the Redux store
export default metricsSlice.reducer;
