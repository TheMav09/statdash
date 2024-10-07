// src/pages/AzureCosts.tsx

import React from "react";
import Logout from '../components/Logout'; // Import the reusable Logout component

/**
 * AzureCosts Component:
 * - This page is intended to display Azure cost data to users.
 * - It currently displays a placeholder message and includes the reusable Logout button.
 * - Future functionality will allow users to view cost breakdowns and export data as a CSV file for financial purposes.
 */
const AzureCosts: React.FC = () => {
    return (
        <div>
            <h1>Azure Costs</h1>
            {/* Placeholder message indicating future cost data integration */}
            <p>This page will show cost breakdowns with the ability to export as CSV.</p>
            
            {/* Add the Logout button for user logout functionality */}
            <Logout />
        </div>
    );
};

export default AzureCosts;
