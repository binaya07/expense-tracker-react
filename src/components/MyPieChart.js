import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { getTransactionsForUser } from '../apis/Api';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const MyPieChart = () => {
  const [data, setData] = useState({ income: [], expense: [] });
  const userId = sessionStorage.getItem("userId");

  useEffect(() => {
    const getData = async () => {
      const transactions = await getTransactionsForUser(userId);
      let incomeData = {};
      let expenseData = {};

      transactions.forEach(transaction => {
        if (transaction.type.toLowerCase() === 'income') {
          incomeData[transaction.category] = (incomeData[transaction.category] || 0) + transaction.amount;
        } else {
          expenseData[transaction.category] = (expenseData[transaction.category] || 0) + transaction.amount;
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
      {renderPieChart(data.income, 'Income by Category')}
      {renderPieChart(data.expense, 'Expense by Category')}
    </div>
  );
};

export default MyPieChart;

