import express from 'express';
import axios from 'axios';
import { getManagementAccessToken } from '../tokenManagerBackend.js';
import fs from 'fs';
import path from 'path';

const router = express.Router();

// Load VM sizes from JSON file
const loadVMSizes = () => {
    const vmSizesPath = path.join(__dirname, '..', 'config', 'vmSizes.json');
    const rawData = fs.readFileSync(vmSizesPath);
    return JSON.parse(rawData);
};

// Calculate used memory percentage
const calculateMemoryUsagePercentage = (allocatedMemoryGB, availableMemoryMB) => {
    if (!allocatedMemoryGB || !availableMemoryMB) return null;
    const totalMemoryMB = allocatedMemoryGB * 1024;
    const usedMemoryMB = totalMemoryMB - availableMemoryMB;
    return ((usedMemoryMB / totalMemoryMB) * 100).toFixed(2);
};

router.get('/vms', async (req, res) => {
    try {
        const accessToken = await getManagementAccessToken();
        const vmSizes = loadVMSizes();  // Load VM sizes
        
        const response = await axios.get(`https://management.azure.com/subscriptions/${process.env.AZURE_SUBSCRIPTION_ID}/providers/Microsoft.Compute/virtualMachines?api-version=2021-07-01`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        const vms = response.data.value.map(vm => {
            const vmSize = vm.properties.hardwareProfile.vmSize;
            const totalMemoryGB = vmSizes[vmSize] / 1024;  // Get allocated memory in GB
            return {
                name: vm.name,
                id: vm.id,
                location: vm.location,
                size: vmSize,
                totalMemoryGB
            };
        });

        res.json({ vms });  // Send back the VM data with memory information
    } catch (error) {
        console.error('Error fetching VMs:', error);
        res.status(500).send('Error fetching VMs');
    }
});

export default router;
