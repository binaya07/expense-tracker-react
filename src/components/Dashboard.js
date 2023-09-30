import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();
    const isAuthenticated = sessionStorage.getItem("isAuthenticated");
    
    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    return <h1>Welcome to the Dashboard!</h1>;
}

export default Dashboard;