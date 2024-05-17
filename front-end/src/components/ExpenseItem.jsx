/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { useExpenses } from "../contexts/ExpensesContext";
import styles from "./ExpenseItem.module.css";

function ExpenseItem({ expense }) {
  const { currentExpense, deleteExpense } = useExpenses();
  const { _id, amount, type } = expense;

  function handleClick(e) {
    e.preventDefault();
    deleteExpense(_id);
  }

  return (
    <li>
      <Link
        className={`${styles.expenseItem} ${
          currentExpense?._id === _id ? styles["expenseItem--active"] : ""
        }`}
        to={`${_id}`}
      >
        <h3 className={styles.amount}>{amount}</h3>
        <time className={styles.type}>{type}</time>
        <button className={styles.deleteBtn} onClick={handleClick}>
          &times;
        </button>
      </Link>
    </li>
  );
}

export default ExpenseItem;
