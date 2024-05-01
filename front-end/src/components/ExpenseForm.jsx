import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useExpenses } from '../contexts/ExpensesContext'
import { useCities } from '../contexts/CitiesContext'
import styles from './ExpenseForm.module.css'
import BackButton from './BackButton'
import Button from './Button'
import Message from './Message'

function ExpenseForm() {
  const navigate = useNavigate()
  const { createExpense, isLoading, error } = useExpenses()
  const { currentCity } = useCities()
  const [formData, setFormData] = useState({
    description: '',
    type: '',
    amount: '',
  });
  
  async function handleSubmit(e) {
    e.preventDefault();
    
    const newExpense = {
      description: formData.description,
      type: formData.type,
      amount: formData.amount,
      date: currentCity.date || new Date(),
    };
    
    await createExpense(newExpense);
    navigate(-1, { replace: true });
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  
  if (error) {
    <Message message={error} />
  }
  
  return (
    <form className={`${styles.form} ${isLoading ? "loading" : ""}`}>
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

      <div className={styles.buttons}>
        <Button onClick={e => handleSubmit(e)} type={"primary"}>
          {isLoading ? "Loading..." : "Create"}
        </Button>
        <BackButton />
      </div>
    </form>
  )
}

export default ExpenseForm
