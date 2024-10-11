import express from 'express';
import axios from 'axios';
import { getLogAnalyticsAccessToken } from '../tokenManagerBackend.js';
import { getVMsByTag } from './vmsByTags.js';
import fs from 'fs';
import path from 'path';
import { logToFile } from '../backend/utils/logger.js';

const router = express.Router();

// Helper function to group metrics by computer name
const groupMetricsByVM = (metrics) => {
    const vmGroupedData = {};

    metrics.forEach(metric => {
        const { Computer, MetricType, avg_MetricValue } = metric;

        if (!vmGroupedData[Computer]) {
            vmGroupedData[Computer] = {
                CPU: 'N/A',
                Memory: 'N/A',
                DiskFree: 'N/A',
                DiskRead: 'N/A',
                DiskWrite: 'N/A',
                NetworkIn: 'N/A',
                NetworkOut: 'N/A'
            };
        }

        vmGroupedData[Computer][MetricType] = avg_MetricValue;
    });

    return vmGroupedData;
};

router.get('/', async (req, res) => {
    try {
        const accessToken = await getLogAnalyticsAccessToken();
        const workspaceId = process.env.LOG_ANALYTICS_WORKSPACE_ID;

        const vms = await getVMsByTag();

        if (!vms || vms.length === 0) {
            return res.status(404).json({ message: 'No VMs found with the provided tags' });
        }

        const formattedVMNames = vms.map(vm => `'${vm.name}'`).join(', ');
        console.log("VMs passed to KQL query:", formattedVMNames);

        const query = `
        Perf
        | where TimeGenerated >= ago(5m)
        | where Computer has_any (${formattedVMNames})
        | extend MetricType = case(
            ObjectName == "Processor" and CounterName == "% Processor Time", "CPU",
            ObjectName == "Memory" and CounterName == "Available MBytes", "Memory",
            ObjectName == "LogicalDisk" and CounterName == "% Free Space", "DiskFree",
            ObjectName == "LogicalDisk" and CounterName == "Disk Reads/sec", "DiskRead",
            ObjectName == "LogicalDisk" and CounterName == "Disk Writes/sec", "DiskWrite",
            ObjectName == "Network Interface" and CounterName == "Bytes Received/sec", "NetworkIn",
            ObjectName == "Network Interface" and CounterName == "Bytes Sent/sec", "NetworkOut",
            "Unknown"
        )
        | extend MetricValue = iff(isnull(CounterValue), double(null), CounterValue)
        | summarize avg_MetricValue = avg(MetricValue) by MetricType, bin(TimeGenerated, 5m), Computer
        | order by TimeGenerated desc
        | project TimeGenerated, Computer, MetricType, avg_MetricValue = round(avg_MetricValue, 2)
        `;

        const response = await axios.post(
            `https://api.loganalytics.io/v1/workspaces/${workspaceId}/query`,
            { query },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        if (response.data && response.data.tables[0] && response.data.tables[0].rows.length > 0) {
            const metrics = response.data.tables[0].rows.map(row => ({
                TimeGenerated: row[0],
                Computer: row[1],
                MetricType: row[2],
                avg_MetricValue: row[3]
            }));

            // Group metrics by VM
            const groupedMetrics = groupMetricsByVM(metrics);

            // Send the metrics to the frontend
            res.json({ groupedMetrics });
        } else {
            res.json({ groupedMetrics: {} });
        }
    } catch (error) {
        console.error('Error fetching metrics:', error.response ? error.response.data : error.message);
        res.status(500).json({ message: 'Error fetching metrics' });
    }
});

export default router;
