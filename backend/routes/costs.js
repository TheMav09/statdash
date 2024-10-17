import express from 'express';
import axios from 'axios';
import { getManagementAccessToken } from '../tokenManagerBackend.js';  // Ensure this retrieves the right token
import dayjs from 'dayjs';  // We will use dayjs to calculate dates

const router = express.Router();

// Costs API route (using Management API)
router.get('/', async (req, res) => {
    try {
        const accessToken = await getManagementAccessToken();  // Correct Management API token
        
        // Calculate the start date (90 days back) and the end date (today)
        const startDate = dayjs().subtract(90, 'day').format('YYYY-MM-DD');
        const endDate = dayjs().format('YYYY-MM-DD');

        const payload = {
            type: "Usage",
            timePeriod: {
                from: startDate,
                to: endDate
            },
            dataset: {
                granularity: "Daily",  // Keep granularity as daily
                aggregation: {
                    totalCost: {
                        name: "PreTaxCost",
                        function: "Sum"
                    }
                },
                grouping: [
                    {
                        type: "Dimension",
                        name: "ResourceGroup"  // Group by Resource Group
                    }
                ]
            }
        };

        // Axios POST request for Cost Management API
        const response = await axios.post(
            `https://management.azure.com/subscriptions/${process.env.AZURE_SUBSCRIPTION_ID}/providers/Microsoft.CostManagement/query?api-version=2023-08-01`,
            payload,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,  // Correct token here
                    'Content-Type': 'application/json'
                }
            }
        );

        // Sending the cost data as JSON
        res.json({ costData: response.data });
    } catch (error) {
        console.error('Error fetching costs:', error);
        res.status(500).send('Error fetching costs');
    }
});

export default router;
