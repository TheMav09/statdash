import express from "express";
import dotenv from "dotenv";
import cors from "cors"; // Import the CORS middleware
import axios from "axios";
// Import the routes
import vmsRoutes from "./routes/vmsByTags.js"; // VM routes (specifically for VMs by tags)
import costsRoutes from "./routes/costs.js"; // Costs routes
import azureVmMetricsRoutes from "./routes/azureVmMetrics.js"; // New route for Azure VM metrics

// Load environment variables from .env
dotenv.config();

const app = express(); // Initialize Express app
const PORT = process.env.PORT || 5000;

// Basic check to ensure required environment variables are loaded
if (!process.env.LOG_ANALYTICS_WORKSPACE_ID) {
  console.error("LOG_ANALYTICS_WORKSPACE_ID is not defined in the .env file");
  process.exit(1);
}

app.use(cors()); // Enable CORS for all routes (you may specify origins if needed)
app.use(express.json()); // Middleware to parse JSON requests

// Test route to check if the backend is running
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// Use the modularized routes with distinct base paths
app.use("/api/vmsByTags", vmsRoutes); // VM-related API routes (route for VMs by tag)
app.use("/api/costs", costsRoutes); // Cost-related API routes
app.use("/api/azureVmMetrics", azureVmMetricsRoutes); // Route for fetching Azure VM metrics

//Meraki API Calls
app.use("/api/meraki", async (req, res) => {
  console.log("Hel");
  try {
    const response = await axios.get(
      `https://api.meraki.com/api/v1/organizations/${process.env.MERAKI_ORG_ID}/devices`,
      {
        headers: {
          Authorization: `Bearer ${process.env.MERAKI_API_KEY}`,
        },
      }
    );

    res.json(response.data); // Send back the VM data with memory information
  } catch (error) {
    console.error("Error fetching Devices:", error);
    res.status(500).send("Error fetching Devices");
  }

  //res.send("HI");
});
app.use("/api/meraki_status", async (req, res) => {
  console.log("pop");
  try {
    const response = await axios.get(
      `https://api.meraki.com/api/v1/organizations/${process.env.MERAKI_ORG_ID}/devices/availabilities`,
      {
        headers: {
          Authorization: `Bearer ${process.env.MERAKI_API_KEY}`,
        },
      }
    );

    res.json(response.data); // Send back the VM data with memory information
  } catch (error) {
    console.error("Error fetching Availabilities:", error);
    res.status(500).send("Error fetching Availabilities");
  }
});

app.use("/api/meraki_speed", async (req, res) => {
  //{{baseUrl}}/organizations/{{vault:ID}}/wireless/devices/packetLoss/byDevice?timespan=300
  try {
    const response = await axios.get(
      `https://api.meraki.com/api/v1/organizations/${process.env.MERAKI_ORG_ID}/wireless/devices/packetLoss/byDevice?timespan=300`,
      {
        headers: {
          Authorization: `Bearer ${process.env.MERAKI_API_KEY}`,
        },
      }
    );

    res.json(response.data); // Send back the VM data with memory information
  } catch (error) {
    console.error("Error fetching Speeds:", error);
    res.status(500).send("Error fetching Speeds");
  }
  //res.send("");
});

app.use("/api/meraki_speed", async (req, res) => {});

// 404 handler for non-existent routes
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "An internal server error occurred" });
});

// Start the server after all routes are defined
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
