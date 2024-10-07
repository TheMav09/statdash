// src/pages/AzureManagement.tsx

import React from 'react';
import Logout from '../components/Logout'; // Import the reusable Logout component

/**
 * AzureManagement Component:
 * - This page is designed for administrators to manage various Azure resources.
 * - It currently displays a placeholder message and includes the reusable Logout button.
 * - Future features will include functionality for managing Virtual Machines (VMs), scheduling backups, and handling secrets within Azure Key Vault.
 */
const AzureManagement: React.FC = () => {
  return (
        <div>
            <h1>Azure Management</h1>
            {/* Placeholder text explaining the future admin management functionality */}
            <p>Admins can manage VMs, backups, and Key Vault here.</p>

            {/* Add the Logout button for user logout functionality */}
            <Logout />
        </div>
    );
};

export default AzureManagement;
