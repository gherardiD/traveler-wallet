import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useExpenses } from "../contexts/ExpensesContext";

import styles from "./ExpenseForm.module.css";
import BackButton from "./BackButton";
import Button from "./Button";
import Message from "./Message";

function EditExpenseForm() {
  const navigate = useNavigate();
  const { updateExpense, isLoading, error } = useExpenses();
  const { currentExpense } = useExpenses();
  const [formData, setFormData] = useState({
    description: "",
    type: "",
    amount: "",
  });

  useEffect(() => {
    setFormData({
      description: currentExpense.description,
      type: currentExpense.type,
      amount: currentExpense.amount,
    });
  }, [currentExpense]);

  async function handleUpdate(e) {
    e.preventDefault();
    await updateExpense(formData);
    navigate(-1, { replace: true });
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (error) {
    <Message message={error} />;
  }

  return (
    <form className={`${styles.form} ${isLoading ? "loading" : ""}`}>
      <div className={styles.row}>
        <label htmlFor="amount">Amount</label>
        <input
          type="number"
          id="amount"
          name="amount"
          onChange={(e) => handleInputChange(e)}
          value={formData.amount}
          required
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="type">Type</label>
        <input
          type="text"
          id="type"
          name="type"
          onChange={(e) => handleInputChange(e)}
          value={formData.type}
          required
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="description">Description</label>
        <input
          type="text"
          id="description"
          name="description"
          onChange={(e) => handleInputChange(e)}
          value={formData.description}
          required
        />
      </div>

      <div className={styles.buttons}>
        <Button onClick={(e) => handleUpdate(e)} type={"primary"}>
          {isLoading ? "Loading..." : "Update"}
        </Button>
        <BackButton />
      </div>
    </form>
  );
}

export default EditExpenseForm;
