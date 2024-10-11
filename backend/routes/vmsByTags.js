import express from 'express';
import axios from 'axios';
import { getManagementAccessToken } from '../tokenManagerBackend.js';

const router = express.Router();

// Helper function to extract the resource group from the ID
const extractResourceGroup = (id) => {
    const match = id.match(/resourceGroups\/([^\/]*)\//);
    return match ? match[1] : '';
};

// Function to get VMs by tag
export const getVMsByTag = async () => {
    try {
        const accessToken = await getManagementAccessToken();  // Correct Management API token
        console.log("Using access token for Management API:", accessToken);  // Log token

        const tagName = process.env.AZURE_VM_TAG_NAME;
        const tagValue = process.env.AZURE_VM_TAG_VALUE;

        console.log(`Fetching VMs with tag: ${tagName} = ${tagValue}`);

        const filterQuery = encodeURIComponent(`tagName eq '${tagName}' and tagValue eq '${tagValue}'`);

        const response = await axios.get(
            `https://management.azure.com/subscriptions/${process.env.AZURE_SUBSCRIPTION_ID}/resources?api-version=2021-04-01&$filter=${filterQuery}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        console.log('Response from Management API:', response.data);

        const vms = response.data.value.map(vm => ({
            name: vm.name,
            id: vm.id,
            location: vm.location,
            resourceGroup: extractResourceGroup(vm.id),
        }));

        console.log('Fetched VMs:', vms);  // Log the fetched VMs

        return vms; // Return the list of VMs
    } catch (error) {
        console.error('Error fetching VMs by tag:', error.response ? error.response.data : error.message);
        throw new Error('Error fetching VMs by tag');
    }
};

// API to retrieve VMs based on tags
router.get('/', async (req, res) => {
    try {
        const vms = await getVMsByTag();
        res.json({ vms });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching VMs by tag' });
    }
});

export default router;
