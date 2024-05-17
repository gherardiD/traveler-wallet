import { useEffect, useState } from "react";
import Axios from "../api/Axios";
import styles from "./AdminExpenseList.module.css";

// eslint-disable-next-line react/prop-types
export default function AdminExpenseList({ token }) {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    Axios.get("/admin/expenses", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => setExpenses(response.data.expenses))
      .catch((error) => console.error(error));
  }, [token]);

  function handleClick(expenseId) {
    Axios.delete(`/admin/expenses/${expenseId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(() => {
        setExpenses(expenses.filter((expense) => expense._id !== expenseId));
      })
      .catch((error) => console.error(error));
  }
  
  return (
    <div className={styles.container}>
      <ul className={styles.expenseList}>
        {expenses.map((expense) => (
          <li key={expense._id} className={styles.expenseListItem}>
            <h3 className={styles.amount}>{expense.amount}</h3>
            <time className={styles.type}>{expense.type}</time>
            <button
              className={styles.deleteBtn}
              onClick={() => handleClick(expense._id)}
            >
              &times;
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
