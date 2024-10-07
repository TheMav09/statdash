// src/pages/AzureHealth.tsx

import React from 'react';
import Logout from '../components/Logout'; // Import the reusable Logout component

/**
 * AzureHealth Component:
 * - This page is designed to display the health status of Azure Virtual Machines (VMs).
 * - It currently displays a placeholder message and includes the reusable Logout button.
 * - Future iterations will include clickable tiles, allowing users to view more detailed health metrics for each VM.
 */
const AzureHealth: React.FC = () => {
    return (
        <div>
            <h1>Azure Health</h1>
            {/* Placeholder message indicating future integration with Azure VM health data */}
            <p>This will display Azure VM health with clickable tiles for detailed metrics.</p>
            
            {/* Add the Logout button for user logout functionality */}
            <Logout />
        </div>
    );
};

export default AzureHealth;
