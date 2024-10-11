import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';  // Import the CORS middleware

// Import the routes
import vmsRoutes from './routes/vmsByTags.js';  // VM routes (specifically for VMs by tags)
import costsRoutes from './routes/costs.js';  // Costs routes
import azureVmMetricsRoutes from './routes/azureVmMetrics.js';  // New route for Azure VM metrics

// Load environment variables from .env
dotenv.config();

const app = express(); // Initialize Express app
const PORT = process.env.PORT || 5000;

// Basic check to ensure required environment variables are loaded
if (!process.env.LOG_ANALYTICS_WORKSPACE_ID) {
    console.error('LOG_ANALYTICS_WORKSPACE_ID is not defined in the .env file');
    process.exit(1);
}

app.use(cors());  // Enable CORS for all routes (you may specify origins if needed)
app.use(express.json()); // Middleware to parse JSON requests

// Test route to check if the backend is running
app.get('/', (req, res) => {
    res.send('Backend is running!');
});

// Use the modularized routes with distinct base paths
app.use('/api/vmsByTags', vmsRoutes);  // VM-related API routes (route for VMs by tag)
app.use('/api/costs', costsRoutes);  // Cost-related API routes
app.use('/api/azureVmMetrics', azureVmMetricsRoutes);  // Route for fetching Azure VM metrics

// 404 handler for non-existent routes
app.use((req, res, next) => {
    res.status(404).json({ message: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'An internal server error occurred' });
});

// Start the server after all routes are defined
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
