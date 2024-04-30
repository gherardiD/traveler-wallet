import { useCities } from "../contexts/CitiesContext";
import styles from "./ExpenseList.module.css";
import ExpenseItem from "./ExpenseItem";
import Spinner from "./Spinner";
import Message from "./Message";

function ExpensesList() {
  const { cities, isLoading } = useCities();
  
  if (isLoading) return <Spinner />;

  if (!cities.length)
    return <Message message={"Add your first city by clicking on the map"} />;

  return (
    <ul className={styles.expensesList}>
      {cities.map((city) => (
        <ExpenseItem city={city} key={city._id} />
      ))}
    </ul>
  );
}

export default ExpensesList;