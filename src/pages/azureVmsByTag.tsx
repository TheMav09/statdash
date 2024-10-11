import React, { useEffect, useState } from "react";
import { fetchVmsByTag } from '../services/azureServices/vmsByTagsService';

interface VM {
    name: string;
    id: string;
    location: string;
    resourceGroup: string;
}

const AzureVmsByTag: React.FC = () => {
    const [vms, setVms] = useState<VM[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadVms = async () => {
            try {
                const vmsData = await fetchVmsByTag();
                setVms(vmsData);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching VMs:', err);
                setError('Failed to load VMs');
                setLoading(false);
            }
        };

        loadVms();
    }, []);

    return (
        <div>
            <h1>Azure VMs By Tag</h1>
            {loading && <p>Loading VMs...</p>}
            {error && <p>{error}</p>}

            {!loading && !error && vms.length === 0 && <p>No VMs found.</p>}

            {!loading && vms.length > 0 && (
                <ul>
                    {vms.map((vm) => (
                        <li key={vm.id}>
                            <strong>Name:</strong> {vm.name} <br />
                            <strong>Location:</strong> {vm.location} <br />
                            <strong>Resource Group:</strong> {vm.resourceGroup} <br />
                            <strong>ID:</strong> {vm.id}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AzureVmsByTag;
