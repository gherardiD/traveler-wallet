import { useExpenses } from "../contexts/ExpensesContext";
import styles from "./ExpenseList.module.css";
import ExpenseItem from "./ExpenseItem";
import Spinner from "./Spinner";
import Message from "./Message";
import Button from "./Button";
import { Link } from "react-router-dom";

function ExpensesList() {
  const { expenses, isLoading } = useExpenses();
  console.log(expenses);

  if (isLoading) return <Spinner />;

  if (!expenses.length) return <Message message={"Add your first expense"} />;

  return (
    <>
      <ul className={styles.expensesList}>
        {expenses.map((expense) => (
          <ExpenseItem expense={expense} key={expense._id} />
        ))}
      </ul>
      <Button type="primary">
        <Link to='form'>Add expense</Link>
      </Button>
    </>
  );
}

export default ExpensesList;
