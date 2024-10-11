// src/services/vmsByTagsService.ts

import axios from 'axios';

/**
 * Fetch VMs by tag pair from the backend
 * @returns {Promise<any>} List of VMs
 */
export const fetchVmsByTag = async (): Promise<any> => {
    try {
        const response = await axios.get('http://localhost:5000/api/vmsByTags');
        return response.data.vms;
    } catch (error) {
        console.error('Error fetching VMs by tag:', error);
        throw error;
    }
};
