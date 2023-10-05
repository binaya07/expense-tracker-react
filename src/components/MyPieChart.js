import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { getTransactionsForUser } from '../apis/Api';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const MyPieChart = () => {
  const [data, setData] = useState({ income: [], expense: [] });
  const userId = sessionStorage.getItem("userId");
  
  const convertToUSD = (amount, currency) => {
    const conversionRates = { EUR: 1.05, NPR: 0.0075 }; 
    return currency === 'USD' ? amount : amount * conversionRates[currency];
  };

  useEffect(() => {
    const getData = async () => {
      const transactions = await getTransactionsForUser(userId);
      let incomeData = {};
      let expenseData = {};

      transactions.forEach(transaction => {
        // Convert all amount to USD from EUR and NPR
        const amountInUSD = convertToUSD(transaction.amount, transaction.currency);
        if (transaction.type.toLowerCase() === 'income') {
          incomeData[transaction.category] = (incomeData[transaction.category] || 0) + amountInUSD;
        } else {
          expenseData[transaction.category] = (expenseData[transaction.category] || 0) + amountInUSD;
        }
      });

      setData({
        income: Object.keys(incomeData).map(key => ({ name: key, value: incomeData[key] })),
        expense: Object.keys(expenseData).map(key => ({ name: key, value: expenseData[key] }))
      });
    };

    getData();
  }, [userId]);

  const renderPieChart = (data, title) => (
    <div style={{ margin: '20px' }}>
      <h4 style={{textAlign: 'center'}}>{title}</h4>
      <PieChart width={300} height={200}>
        <Pie
          data={data}
          cx={150}
          cy={100}
          labelLine={false}
          outerRadius={60}
          fill="#8884d8"
          dataKey="value"
          label
        >
          {
            data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
          }
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      {renderPieChart(data.income, 'Income by Category (in USD)')}
      {renderPieChart(data.expense, 'Expense by Category (in USD)')}
    </div>
  );
};

export default MyPieChart;

