import React, { useState } from 'react';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import '../css/dashboard.css';

const TransactionForm = ({ addTransaction, closeForm }) => {
  const [formData, setFormData] = useState({
    type: '',
    amount: '',
    category: '',
    date: '',
    description: '',
    currency: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTransaction(formData);
    setFormData({
      type: '',
      amount: '',
      category: '',
      date: '',
      description: '',
      currency: ''
    });
    
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="margin-bottom-10">
        <FormControl fullWidth required>
          <InputLabel id="type">Type</InputLabel>
          <Select
            labelId="type"
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
          >
            <MenuItem value={'income'}>Income</MenuItem>
            <MenuItem value={'expense'}>Expense</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="margin-bottom-10">
        <TextField
          fullWidth
          label="Amount"
          name="amount"
          type="number"
          value={formData.amount}
          onChange={handleChange}
          required
        />
      </div>
      <div className="margin-bottom-10">
        <TextField
          fullWidth
          label="Category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        />
      </div>
      <div className="margin-bottom-10">
        <TextField
          fullWidth
          label="Date"
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true,
          }}
          required
        />
      </div>
      <div className="margin-bottom-10">
        <TextField
          fullWidth
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </div>
      <div className="margin-bottom-10">
        <FormControl fullWidth required>
          <InputLabel id="currency">Currency</InputLabel>
          <Select
            labelId="currency"
            id="currency"
            name="currency"
            value={formData.currency}
            onChange={handleChange}
          >
            <MenuItem value={'USD'}>USD</MenuItem>
            <MenuItem value={'EUR'}>EUR</MenuItem>
            <MenuItem value={'NPR'}>NPR</MenuItem>
          </Select>
        </FormControl>
      </div>
      <Button type="submit" color="secondary" variant="contained">
        Add Transaction
      </Button>
    </form>
  );
};

export default TransactionForm;
