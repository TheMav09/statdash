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

// Define the type for each cost row: [PreTaxCost, UsageDate, ResourceGroup, Currency]
type CostRow = [number, number, string, string];

const AzureCosts: React.FC = () => {
    const [costData, setCostData] = useState<CostRow[]>([]);  // State to store the cost rows
    const [error, setError] = useState<string | null>(null);  // State to handle errors
    const [loading, setLoading] = useState(false);  // State for loading status

    // Function to fetch cost data from the backend API
    const fetchCostData = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:5000/api/costs');  // Full URL to backend
            setCostData(response.data.costData.properties.rows);  // Extract only the cost rows from the response
            setLoading(false);
        } catch (err) {
            setError("Error fetching cost data.");
            console.error('Error:', err);
            setLoading(false);
        }
    };

    // Function to format usage date from YYYYMMDD to MM/DD/YYYY
    const formatDate = (usageDate: number) => {
        const dateStr = usageDate.toString();
        return `${dateStr.slice(4, 6)}/${dateStr.slice(6, 8)}/${dateStr.slice(0, 4)}`;
    };

    // Calculate the total cost by summing up PreTaxCost values
    const totalCost = costData.reduce((sum, row) => sum + row[0], 0).toFixed(2);

    // Use the useEffect hook to fetch cost data when the component mounts
    useEffect(() => {
        fetchCostData();
    }, []);

    return (
        <div>
            <h1>Azure Costs</h1>

            {loading && <p>Loading cost data...</p>}  {/* Display loading status */}
            {error && <p>{error}</p>}  {/* Display any errors */}

            {/* Display cost by subscription */}
            {costData.length > 0 ? (
                <div>
                    <h2>Cost by Subscription</h2>
                    <h3>Total Cost: ${totalCost}</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Pre-Tax Cost (USD)</th>
                                <th>Usage Date</th>
                                <th>Resource Group</th>
                                <th>Currency</th>
                            </tr>
                        </thead>
                        <tbody>
                            {costData.map((row, index) => (
                                <tr key={index}>
                                    <td>{row[0].toFixed(2)}</td>  {/* Pre-Tax Cost */}
                                    <td>{formatDate(row[1])}</td>  {/* Formatted Usage Date */}
                                    <td>{row[2] || 'Unknown'}</td>  {/* Resource Group (handle empty) */}
                                    <td>{row[3]}</td>  {/* Currency */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
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
