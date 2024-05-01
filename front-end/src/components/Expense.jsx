import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./Expense.module.css";

import { useExpenses } from "../contexts/ExpensesContext";
import Spinner from "./Spinner";
import BackButton from "./BackButton";
import Button from "./Button";
function Expense() {
  const { currentExpense, isLoading, setCurrentExpense } = useExpenses();
  const { type, amount, description } = currentExpense;
  const { expenseId } = useParams();

  useEffect(() => {
    setCurrentExpense(expenseId);
  }, [expenseId]);

  if (isLoading) return <Spinner />;

  return (
    <div className={styles.expense}>
      <div className={styles.row}>
        <h6>Amount</h6>
        <h3>
          <span>{amount}</span> {}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>Type</h6>
        <p>{type}</p>
      </div>

      {description && (
        <div className={styles.row}>
          <h6>Your description</h6>
          <p>{description}</p>
        </div>
      )}

      <div className={styles.buttons}>
        <Button type={"primary"}>
          <Link to="edit">Edit</Link>
        </Button>
        <BackButton />
      </div>
    </div>
  );
}

export default Expense;
