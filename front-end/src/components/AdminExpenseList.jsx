import React, { useEffect, useState } from 'react';
import Axios from '../api/Axios';

export default function AdminExpenseList({token}) {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    Axios.get("/admin/expenses", { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => setExpenses(response.data.expenses))
      .catch((error) => console.error(error));
  }, []);

  console.log(expenses);

  return (
    <ul>
      {expenses.map((expense) => (
        <li key={expense._id}>
          {expense.description} - ${expense.amount}
        </li>
      ))}
    </ul>
  );
}
