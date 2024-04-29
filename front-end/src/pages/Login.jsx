import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import styles from "./Login.module.css";
import PageNav from "../components/PageNav";
import Button from "../components/Button";
import Spinner from "../components/Spinner";
import Message from "../components/Message";

export default function Login() {
  const navigate = useNavigate();
  const { login, isAuthenticated, isLoading, error } = useAuth();
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("dani.ghera05@gmail.com");
  const [password, setPassword] = useState("danieleg");

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/app/cities", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  function handleSubmit(e) {
    e.preventDefault();
    login({ email, password });
  }

  return (
    <main className={styles.login}>
      <PageNav />
      {isLoading && <Spinner />}
      {error && <Message message={error} />}
      {!error && !isLoading && (
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.row}>
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>

          <div className={styles.row}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>

          <div className={styles.buttons}>
            <Button type="primary">Login</Button>
            <Button type="back" onClick={e => e.preventDefault}>
              <Link to="/signup">Register</Link>
            </Button>
          </div>
        </form>
      )}
    </main>
  );
}
