import axios from 'axios';

/**
 * Azure Resource Management Service
 * 
 * This service handles interactions with the Azure Resource Manager (ARM) and Azure Monitor APIs.
 * It manages Azure VMs, retrieves resource metrics, and interacts with other related Azure APIs.
 */

// Azure Monitor API Version for metrics
const AZURE_MONITOR_API_VERSION = '2021-05-01';

/**
 * Start an Azure VM
 * @param vmId - The ID of the virtual machine
 */
export const startVM = async (vmId: string, token: string) => {
    try {
        console.log(`Starting VM with ID: ${vmId}`);
        const endpoint = `https://management.azure.com/${vmId}/start?api-version=2021-03-01`; // Adjust API version as needed
        const response = await axios.post(endpoint, {}, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error starting VM:', error);
        throw error;
    }
};

/**
 * Stop an Azure VM
 * @param vmId - The ID of the virtual machine
 */
export const stopVM = async (vmId: string, token: string) => {
    try {
        console.log(`Stopping VM with ID: ${vmId}`);
        const endpoint = `https://management.azure.com/${vmId}/deallocate?api-version=2021-03-01`;
        const response = await axios.post(endpoint, {}, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error stopping VM:', error);
        throw error;
    }
};

/**
 * Get the current status of a VM
 * @param vmId - The ID of the virtual machine
 */
export const getVMStatus = async (vmId: string, token: string) => {
    try {
        console.log(`Getting status for VM with ID: ${vmId}`);
        const endpoint = `https://management.azure.com/${vmId}/InstanceView?api-version=2021-03-01`;
        const response = await axios.get(endpoint, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error getting VM status:', error);
        throw error;
    }
};

/**
 * Fetch health metrics (e.g., CPU usage) for a specific VM from Azure Monitor
 * @param resourceId - The resource ID of the VM
 * @param token - Access token for authentication
 */
export const getAzureHealthMetrics = async (resourceId: string, token: string) => {
    const endpoint = `https://management.azure.com/${resourceId}/providers/Microsoft.Insights/metrics`;
    const params = {
        "api-version": AZURE_MONITOR_API_VERSION,
        "metricnames": "Percentage CPU",  // Example metric
        "timespan": "PT1H",
        "interval": "PT1M"
    };

    try {
        const response = await axios.get(endpoint, {
            headers: { Authorization: `Bearer ${token}` },
            params
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching Azure Health metrics:', error);
        throw error;
    }
};

/**
 * Fetch Azure cost data from Cost Management API
 * @param subscriptionId - The subscription ID of the Azure account
 * @param token - Access token for authentication
 */
export const getAzureCosts = async (subscriptionId: string, token: string) => {
    const endpoint = `https://management.azure.com/subscriptions/${subscriptionId}/providers/Microsoft.CostManagement/query?api-version=2021-10-01`;
    const body = {
        "type": "Usage",
        "timeframe": "MonthToDate",
        "dataset": {
            "granularity": "Daily",
            "aggregation": {
                "totalCost": { "name": "Cost", "function": "Sum" }
            }
        }
    };

    try {
        const response = await axios.post(endpoint, body, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching Azure costs:', error);
        throw error;
    }
};
