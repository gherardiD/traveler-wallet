import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import styles from "./Admin.module.css";

import Message from "../components/Message";
import Button from "../components/Button";
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
        return <div className={styles.container}>
            <Message message="Accedi con credenziali da amministratore per queste funzionalità" />
            <Button>
                <Link to="/login">Accedi</Link>
            </Button>
        </div>;
    }

    return (
        <div className={styles.container}>
            <nav>
                <Logo />
                <button onClick={handleLogout}>Logout</button>
            </nav>
            <div>
                <h1>Benvenuto, amministratore</h1>
                <button onClick={() => handleClick("users")}>
                    Utenti
                </button>
                <button onClick={() => handleClick("cities")}>
                    Cities
                </button>
                <button onClick={() => handleClick("expenses")}>
                    Expenses
                </button>
            </div>
            <div>
                {showUsers && <AdminUserList token={token} />}
                {showCities && <AdminCityList token={token} />}
                {showExpenses && <AdminExpenseList token={token} />}
            </div>
        </div>
    )
}
