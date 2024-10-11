// src/pages/AzureCosts.tsx

/**
 * AzureCosts Component:
 * - This page is intended to display Azure cost data to users.
 * - It fetches cost data from the backend API.
 * - Displays the subscription and resource group costs.
 * - It also includes a Logout button.
 */

import React, { useEffect, useState } from "react";
import axios from "axios";
import Logout from "../components/Logout";

const AzureCosts: React.FC = () => {
    const [costData, setCostData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const fetchCostData = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:5000/api/costs'); // Updated: Full URL to backend
            setCostData(response.data);  // Store the entire response data
            setLoading(false);
        } catch (err) {
            setError("Error fetching cost data.");
            console.error('Error:', err);
            setLoading(false);
        }
    };
    

    useEffect(() => {
        fetchCostData();
    }, []);

    return (
        <div>
            <h1>Azure Costs</h1>

            {loading && <p>Loading cost data...</p>}
            {error && <p>{error}</p>}

            {/* Display cost by subscription */}
            {costData ? (
                <div>
                    <h2>Cost by Subscription</h2>
                    <pre>{JSON.stringify(costData, null, 2)}</pre>
                </div>
            ) : (
                !loading && <p>No cost data available</p>
            )}

            {/* Reusable Logout button */}
            <Logout />
        </div>
    );
};

export default AzureCosts;
