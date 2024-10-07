// src/pages/AssetManagement.tsx

import React from "react";
import Logout from "../components/Logout"; // Import the reusable Logout component

/**
 * AssetManagement Component:
 * - This page is intended to manage IT assets by integrating with the Asset Panda API.
 * - It currently displays a placeholder message and includes the reusable Logout button.
 * - In future iterations, this page will fetch and display asset data, allowing users to manage IT assets.
 */
const AssetManagement: React.FC = () => {
    return (
        <div>
            <h1>Asset Management</h1>
            {/* Placeholder text that describes the future integration with Asset Panda */}
            <p>This page will integrate with Asset Panda to manage IT assets.</p>
            
            {/* Add the Logout button for user logout functionality */}
            <Logout />
        </div>
    );
};

export default AssetManagement;
