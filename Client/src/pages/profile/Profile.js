import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { useSpinner } from '../../contexts/SpinnerContext';
import Sidebar from '../../components/profile/Sidebar';

import './profile.scss';

const ProfilePage = () => {
    const { setLoading } = useSpinner();

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    }, [setLoading]);
    return (
        <div className="profile-page-container">
            <Sidebar />
            <Outlet />
        </div>
    );
};

export default ProfilePage;
