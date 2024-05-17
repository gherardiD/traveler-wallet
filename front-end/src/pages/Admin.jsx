import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import styles from "./Admin.module.css";

import Message from "../components/Message";
import Logo from "../components/Logo";
import AdminUserList from "../components/AdminUserList";
import AdminCityList from "../components/AdminCityList";
import AdminExpenseList from "../components/AdminExpenseList";

export default function Admin() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [showUsers, setShowUsers] = useState(false);
  const [showCities, setShowCities] = useState(false);
  const [showExpenses, setShowExpenses] = useState(false);

  const token = localStorage.getItem("token");

  function handleLogout() {
    logout();
    navigate("/");
  }

  function handleClick(section) {
    setShowUsers(section === "users");
    setShowCities(section === "cities");
    setShowExpenses(section === "expenses");
  }

  if (!token) {
    return (
      <div className={styles.container}>
        <Message message="Accedi con credenziali da amministratore per queste funzionalità" />
        <div className={styles.navButton}>
          <Link to="/login" style={{ color: "#fff", textDecoration: "none" }}>
            Accedi
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <Logo />
        <button onClick={handleLogout} className={styles.navButton}>
          Logout
        </button>
      </nav>
      <div>
        <h1 className={styles.header}>Benvenuto, amministratore</h1>
        <button
          onClick={() => handleClick("users")}
          className={styles.sectionButton}
        >
          Utenti
        </button>
        <button
          onClick={() => handleClick("cities")}
          className={styles.sectionButton}
        >
          Cities
        </button>
        <button
          onClick={() => handleClick("expenses")}
          className={styles.sectionButton}
        >
          Expenses
        </button>
      </div>
      <div className={styles.adminListContainer}>
        {showUsers && <AdminUserList token={token} />}
        {showCities && <AdminCityList token={token} />}
        {showExpenses && <AdminExpenseList token={token} />}
      </div>
    </div>
  );
}
