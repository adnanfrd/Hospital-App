import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
    const location = useLocation();
    const isLinkActive = (path) => location.pathname === path;

    return (
        <nav>
            <ul>
                <li className={isLinkActive('/appointments') ? 'active' : ''}>
                    <Link to="/appointments">Appointments</Link>
                </li>
                <li className={isLinkActive('/doctors') ? 'active' : ''}>
                    <Link to="/doctors">Doctors</Link>
                </li>
                <li className={isLinkActive('/patients') ? 'active' : ''}>
                    <Link to="/patients">Patients</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;
