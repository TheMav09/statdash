import axios from 'axios';

export const fetchAzureVmMetrics = async () => {
    try {
        const response = await axios.get('http://localhost:5000/api/azureVmMetrics');
        return response.data.groupedMetrics; // Ensure we access the correct part of the response
    } catch (error) {
        throw new Error('Error fetching Azure VM metrics');
    }
};
