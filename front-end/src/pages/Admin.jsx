import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import styles from "./Admin.module.css";

import Message from "../components/Message";
import Button from "../components/Button";

export default function Admin() {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const token = localStorage.getItem("token");

    function handleClick() {
        logout();
        navigate("/");
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
            <button onClick={handleClick}>Logout</button>
        </div>
    )
}
