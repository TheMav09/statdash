/**
 * Azure VM Management Service
 * 
 * This service handles operations related to managing Azure Virtual Machines using 
 * the Azure Resource Manager (ARM) API.
 * 
 * Key Functions:
 * - Start a VM
 * - Stop a VM
 * - Check VM status
 */

import axios from 'axios';
import { getAccessToken } from './tokenManager';

// Define Azure API version and subscription details
const apiVersion = '2021-07-01';
const subscriptionId = process.env.REACT_APP_AZURE_SUBSCRIPTION_ID; // Subscription ID from the environment

/**
 * Start a Virtual Machine
 * @param {string} resourceGroupName - The resource group name of the VM
 * @param {string} vmName - The name of the VM to start
 * @returns {Promise<any>}
 */
export const startVM = async (resourceGroupName: string, vmName: string) => {
    try {
        // Fetch the access token
        const accessToken = await getAccessToken('https://management.azure.com/.default');
        
        // Construct the API endpoint
        const endpoint = `https://management.azure.com/subscriptions/${subscriptionId}/resourceGroups/${resourceGroupName}/providers/Microsoft.Compute/virtualMachines/${vmName}/start?api-version=${apiVersion}`;

        // Make the request to start the VM
        const response = await axios.post(
            endpoint,
            null, // No payload needed for this request
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        console.log(`VM ${vmName} started successfully.`);
        return response.data;

    } catch (error) {
        console.error(`Error starting VM ${vmName}:`, error);
        throw error;
    }
};

/**
 * Stop a Virtual Machine
 * @param {string} resourceGroupName - The resource group name of the VM
 * @param {string} vmName - The name of the VM to stop
 * @returns {Promise<any>}
 */
export const stopVM = async (resourceGroupName: string, vmName: string) => {
    try {
        // Fetch the access token
        const accessToken = await getAccessToken('https://management.azure.com/.default');
        
        // Construct the API endpoint
        const endpoint = `https://management.azure.com/subscriptions/${subscriptionId}/resourceGroups/${resourceGroupName}/providers/Microsoft.Compute/virtualMachines/${vmName}/powerOff?api-version=${apiVersion}`;
        
        // Make the request to stop the VM
        const response = await axios.post(
            endpoint,
            null, // No payload needed for this request
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        console.log(`VM ${vmName} is stopping...`);
        return response.data;

    } catch (error) {
        console.error(`Error stopping VM ${vmName}:`, error);
        throw error;
    }
};

/**
 * Get the current status of a Virtual Machine
 * @param {string} resourceGroupName - The resource group name of the VM
 * @param {string} vmName - The name of the VM
 * @returns {Promise<any>}
 */
export const getVMStatus = async (resourceGroupName: string, vmName: string) => {
    try {
        // Fetch the access token
        const accessToken = await getAccessToken('https://management.azure.com/.default');
        
        // Construct the API endpoint
        const endpoint = `https://management.azure.com/subscriptions/${subscriptionId}/resourceGroups/${resourceGroupName}/providers/Microsoft.Compute/virtualMachines/${vmName}/instanceView?api-version=${apiVersion}`;
        
        // Make the request to get the VM status
        const response = await axios.get(endpoint, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });
        console.log(`Status of VM ${vmName}:`, response.data);
        return response.data;

    } catch (error) {
        console.error(`Error fetching status for VM ${vmName}:`, error);
        throw error;
    }
};
