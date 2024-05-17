import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "../api/Axios";
import styles from "./Account.module.css";

import DeleteAccountPopUp from "../components/DeleteAccountPopUp";
import UpdatePasswordForm from "../components/UpdatePasswordForm";
import BackButton from "../components/BackButton";
import SpinnerFullPage from "../components/SpinnerFullPage";

function Account() {
  const navigate = useNavigate();
  const [showUpdatePasswordForm, setShowUpdatePasswordForm] = useState(false);
  const [showDeleteUserPopUp, setShowDeleteUserPopUp] = useState(false);

  const [cities, setCities] = useState([]);
  const [expenses, setExpenses] = useState([]);

  const token = localStorage.getItem("token");


  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [navigate, token]);

  useEffect(() => {
    if (!token) {
      return;
    }
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
    if (!token) {
      return;
    }
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


  if (!token) {
    return <SpinnerFullPage />
  }
  
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
          <h1 className={styles.title}>Account</h1>
          <p className={styles.paragraph}>Here you can update your password or delete your account.</p>
          <div>
            <button className={styles.toggle} onClick={toggleUpdatePasswordForm}>Update Password</button>
            <button className={styles.toggle} onClick={toggleDeletePopUp}>Delete Account</button>
          </div>

          <div className={styles.listContainer}>
            <h2>User Stats</h2>
            <p className={styles.paragraph}>Total cities: {totalCities}</p>
            <p className={styles.paragraph}>Total expenses: {totalExpenses}</p>
            <p className={styles.paragraph}>Total expenses amount: {totalExpensesAmount}</p>
          </div>
          <BackButton className={styles.backButton} />
        </>
      )}
    </div>
  );
}

export default Account;
