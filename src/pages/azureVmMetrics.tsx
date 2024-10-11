import React, { useEffect, useState } from 'react';
import { fetchAzureVmMetrics } from '../services/azureServices/azureVmMetricsService';

// Define the type for the expanded metric data
interface Metric {
  Computer: string;
  TimeGenerated: string;
  CPU: number;
  Memory: number;
  DiskFree: number;
  DiskRead: number;
  DiskWrite: number;
  NetworkIn: number;
  NetworkOut: number;
  TotalMemoryGB?: number;
}

// Function to calculate the memory usage percentage
const calculateMemoryPercentage = (totalMemoryGB: number, availableMemoryMB: number): string => {
  if (!totalMemoryGB || !availableMemoryMB) return 'N/A';
  const totalMemoryMB = totalMemoryGB * 1024;
  const usedMemoryMB = totalMemoryMB - availableMemoryMB;
  return ((usedMemoryMB / totalMemoryMB) * 100).toFixed(2);
};

const AzureVmMetrics: React.FC = () => {
  const [metrics, setMetrics] = useState<{ [key: string]: Metric } | null>(null); 
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMetrics = async () => {
      try {
        const metricsData = await fetchAzureVmMetrics();
        console.log('Raw data fetched from backend API:', metricsData);

        if (metricsData && Object.keys(metricsData).length > 0) {
          setMetrics(metricsData);
        } else {
          console.warn('No metrics data available from API response.');
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching metrics:', err);
        setError('Failed to load VM metrics');
        setLoading(false);
      }
    };

    loadMetrics();
  }, []);

  if (loading) {
    return <p>Loading metrics...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Azure VM Metrics</h1>

      {metrics && Object.keys(metrics).length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Computer</th>
              <th>Generated</th>
              <th>CPU (%)</th>
              <th>Memory (%)</th>
              <th>Disk Free (%)</th>
              <th>Disk Read (Bytes/sec)</th>
              <th>Disk Write (Bytes/sec)</th>
              <th>Network In (Bytes/sec)</th>
              <th>Network Out (Bytes/sec)</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(metrics).map((vm, index) => (
              <tr key={index}>
                <td>{vm || 'N/A'}</td>
                <td>{metrics[vm].TimeGenerated || 'N/A'}</td>
                <td>{metrics[vm].CPU !== undefined ? metrics[vm].CPU : 'N/A'}</td>
                <td>{metrics[vm].Memory !== undefined ? calculateMemoryPercentage(metrics[vm].TotalMemoryGB || 0, metrics[vm].Memory) : 'N/A'}</td>
                <td>{metrics[vm].DiskFree !== undefined ? metrics[vm].DiskFree : 'N/A'}</td>
                <td>{metrics[vm].DiskRead !== undefined ? metrics[vm].DiskRead : 'N/A'}</td>
                <td>{metrics[vm].DiskWrite !== undefined ? metrics[vm].DiskWrite : 'N/A'}</td>
                <td>{metrics[vm].NetworkIn !== undefined ? metrics[vm].NetworkIn : 'N/A'}</td>
                <td>{metrics[vm].NetworkOut !== undefined ? metrics[vm].NetworkOut : 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No metrics available</p>
      )}
    </div>
  );
};

export default AzureVmMetrics;
