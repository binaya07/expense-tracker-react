import React, { useState } from 'react';
import { Tabs, Tab, Paper } from '@material-ui/core';

const IncomeExpenseTabs = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper square>
      <Tabs value={value} indicatorColor="primary" textColor="primary" onChange={handleChange}>
        <Tab label="Incomes" />
        <Tab label="Expenses" />
      </Tabs>
      {value === 0 && <div>/* Render Incomes List Here */</div>}
      {value === 1 && <div>/* Render Expenses List Here */</div>}
    </Paper>
  );
};

export default IncomeExpenseTabs;