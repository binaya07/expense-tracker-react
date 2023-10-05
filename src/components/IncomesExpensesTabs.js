import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Box, Paper, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, InputAdornment } from '@material-ui/core';
import { getTransactionsForUser, deleteTransaction } from '../apis/Api';
import "../css/dashboard.css";
import SearchIcon from '@material-ui/icons/Search';
import DeleteIcon from '@material-ui/icons/Delete';

const IncomeExpenseTabs = () => {
  const [value, setValue] = useState(0);
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [search, setSearch] = useState('');
  const userId = sessionStorage.getItem("userId");

  useEffect(() => {
    getTransactionsForUser(userId).then(response => {
      setIncomes(response.filter(d => d.type.toLowerCase() === "income"));
      setExpenses(response.filter(d => d.type.toLowerCase() === "expense"));
    });
  }, [userId]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setSearch('');
  };

  const handleDelete = async (id) => {
    const isDeleted = await deleteTransaction(id);
    if (isDeleted) {
      setIncomes(incomes.filter(item => item.id !== id));
      setExpenses(expenses.filter(item => item.id !== id));
    }
  };

  const filteredIncomes = incomes.filter(income =>
    income.category.toLowerCase().includes(search.toLowerCase())
  );

  const filteredExpenses = expenses.filter(expense =>
    expense.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Paper className="padding-20" square>
      <Box display="flex" alignItems="center" justifyContent="space-between"> {/* Changed to Box with flex display */}
        <Tabs value={value} indicatorColor="primary" textColor="primary" onChange={handleChange}>
          <Tab label="Incomes" />
          <Tab label="Expenses" />
        </Tabs>
        <TextField
          label="Search Category"
          value={search}
          onChange={e => setSearch(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {value === 0 && (
        <TableContainer style={{ minHeight: '300px' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Amount</TableCell>
                <TableCell>Currency</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredIncomes.length > 0 ? (
                filteredIncomes.map(income => (
                  <TableRow key={income.id}>
                    <TableCell>{income.amount}</TableCell>
                    <TableCell>{income.currency}</TableCell>
                    <TableCell>{income.category}</TableCell>
                    <TableCell>{income.date}</TableCell>
                    <TableCell>{income.description}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleDelete(income.id)} color="secondary">
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">No Results</TableCell> {/* Show 'No Results' for empty data */}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {value === 1 && (
        <TableContainer style={{ minHeight: '300px' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Amount</TableCell>
                <TableCell>Currency</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredExpenses.length > 0 ? (
                filteredExpenses.map(expense => (
                  <TableRow key={expense.id}>
                    <TableCell>{expense.amount}</TableCell>
                    <TableCell>{expense.currency}</TableCell>
                    <TableCell>{expense.category}</TableCell>
                    <TableCell>{expense.date}</TableCell>
                    <TableCell>{expense.description}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleDelete(expense.id)} color="secondary">
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">No Results</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Paper>
  );
};

export default IncomeExpenseTabs;
