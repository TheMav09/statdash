import express from 'express';
import axios from 'axios';
import { getManagementAccessToken } from '../tokenManagerBackend.js'; // Make sure this retrieves the right token

const router = express.Router();

// Costs API route (using Management API)
router.get('/', async (req, res) => {
    try {
        const accessToken = await getManagementAccessToken();  // Correct Management API token
        const payload = {
            type: "Usage",
            timeframe: "MonthToDate",
            dataset: {
                granularity: "Daily",
                aggregation: {
                    totalCost: {
                        name: "PreTaxCost",
                        function: "Sum"
                    }
                },
                grouping: [
                    {
                        type: "Dimension",
                        name: "ResourceGroup"
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
