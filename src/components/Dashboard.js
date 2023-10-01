import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import MyPieChart from '../components/MyPieChart';
import IncomeExpenseTabs from './IncomesExpensesTabs';

const Dashboard = () => {
    const navigate = useNavigate();
    const isAuthenticated = sessionStorage.getItem("isAuthenticated");

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    return (<div>
    <NavBar/>
    <MyPieChart/>
    <IncomeExpenseTabs/>
    </div>
    );
}

export default Dashboard;