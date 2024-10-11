// src/components/Navbar.tsx

import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
    return (
        <nav>
            <ul>
                <li><Link to="/">Azure Costs</Link></li>
                <li><Link to="/vms-by-tags">VMs by Tag</Link></li>  {/* Add link to the new page */}
            </ul>
        </nav>
    );
};

export default Navbar;
