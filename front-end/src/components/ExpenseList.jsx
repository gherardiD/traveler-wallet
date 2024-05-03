import { Link } from "react-router-dom";
import { useExpenses } from "../contexts/ExpensesContext";
import styles from "./ExpenseList.module.css";
import ExpenseItem from "./ExpenseItem";
import Spinner from "./Spinner";
import Message from "./Message";
import Button from "./Button";
import BackButton from "./BackButton";

function ExpensesList() {
  const { expenses, isLoading } = useExpenses();
  console.log(expenses);

  if (isLoading) return <Spinner />;

  if (!expenses.length)
    return (
      <>
        <Message message={"Add your first expense"} />
        <div className="buttons">
          <Button type="primary">
            <Link to="form">Add expense</Link>
          </Button>
          <BackButton />
        </div>
      </>
    );

  return (
    <>
      <ul className={styles.expensesList}>
        {expenses.map((expense) => (
          <ExpenseItem expense={expense} key={expense._id} />
        ))}
      </ul>
      <div className={styles.buttons}>
        <Button type="primary">
          <Link to="form">Add expense</Link>
        </Button>
        <BackButton />
      </div>
    </>
  );
}

export default ExpensesList;
