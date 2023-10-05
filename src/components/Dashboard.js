import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import MyPieChart from '../components/MyPieChart';
import IncomeExpenseTabs from './IncomesExpensesTabs';
import TransactionForm from './TransactionForm';
import { Button, Dialog, DialogTitle, DialogContent } from '@material-ui/core';
import '../css/dashboard.css';
import { createTransaction } from '../apis/Api';

const Dashboard = () => {
    const navigate = useNavigate();
    const isAuthenticated = sessionStorage.getItem("isAuthenticated");
    const userId = sessionStorage.getItem("userId");
    const [isFormOpen, setIsFormOpen] = useState(false);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    const openForm = () => setIsFormOpen(true);
    const closeForm = () => setIsFormOpen(false);

    const addTransaction = async (transaction) => {
        transaction['userId'] = userId;
        const response = await createTransaction(transaction);
        closeForm();
        window.location.reload(false);
    };

    return (
    <div>
        <NavBar />
        <MyPieChart />
        <div className="padding-20">
            <div className="margin-bottom-10">
                <Button variant="contained" color="secondary" onClick={openForm}>
                    Add Transaction
                </Button></div>
            <IncomeExpenseTabs />
        </div>

        <Dialog open={isFormOpen} onClose={closeForm}>
            <DialogTitle className='dialog'>Add New Transaction</DialogTitle>
            <DialogContent>
                <TransactionForm addTransaction={addTransaction} closeForm={closeForm} />
            </DialogContent>
        </Dialog>
    </div>
    );
}

export default Dashboard;
