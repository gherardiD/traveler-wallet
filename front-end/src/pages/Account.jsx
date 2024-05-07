import { useEffect, useState } from "react";
import Axios from "../api/Axios";
import styles from "./Account.module.css";

import DeleteAccountPopUp from "../components/DeleteAccountPopUp";
import UpdatePasswordForm from "../components/UpdatePasswordForm";

function Account() {
  const [showUpdatePasswordForm, setShowUpdatePasswordForm] = useState(false);
  const [showDeleteUserPopUp, setShowDeleteUserPopUp] = useState(false);

  const [cities, setCities] = useState([]);
  const [expenses, setExpenses] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    async function fetchCities() {
      try {
        const response = await Axios.get("/cities", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCities(response.data.cities);
      } catch (error) {
        console.error(error);
      }
    }

    fetchCities();
  }, [token]);

  useEffect(() => {
    async function fetchExpenses() {
      try {
        const response = await Axios.get("/expenses", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setExpenses(response.data.expenses);
      } catch (error) {
        console.error(error);
      }
    }

    fetchExpenses();
  }, [token]);

  const toggleUpdatePasswordForm = () => {
    setShowUpdatePasswordForm(!showUpdatePasswordForm);
  };

  const toggleDeletePopUp = () => {
    setShowDeleteUserPopUp(!showDeleteUserPopUp);
  };

  const totalCities = cities.length;
  const totalExpenses = expenses.length;
  const totalExpensesAmount = expenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );

  return (
    <div className={styles.container}>
      {showUpdatePasswordForm && (
        <UpdatePasswordForm
          toggleUpdatePasswordForm={toggleUpdatePasswordForm}
        />
      )}

      {showDeleteUserPopUp && (
        <DeleteAccountPopUp toggleDeletePopUp={toggleDeletePopUp} />
      )}

      {!showDeleteUserPopUp && !showUpdatePasswordForm && (
        <>
          <h1>Account</h1>
          <p>Here you can update your password or delete your account.</p>
          <div>
            <button onClick={toggleUpdatePasswordForm}>Update Password</button>
            <button onClick={toggleDeletePopUp}>Delete Account</button>
          </div>

          <div>
            <h2>User Stats</h2>
            <p>total cities: {totalCities}</p>
            <p>total expenses: {totalExpenses}</p>
            <p>total expenses amount: {totalExpensesAmount}</p>
          </div>
        </>
      )}
    </div>
  );
}

export default Account;
