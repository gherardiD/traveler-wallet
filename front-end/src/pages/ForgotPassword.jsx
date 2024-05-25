import { useState } from "react";
import Message from "../components/Message";
import PageNav from "../components/PageNav";
import Spinner from "../components/Spinner";
import styles from "./ForgotPassword.module.css";
import BackButton from "../components/BackButton";
import Button from "../components/Button";
import Axios from "../api/Axios";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      await Axios.post("/users/forgot-password", { email });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  }

  return (
    <main className={styles.forgot}>
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

          <div className={styles.buttons}>
            <Button type="primary">{isLoading ? "Loading" : "Send email"}</Button>

            <BackButton />
          </div>
        </form>
      )}
    </main>
  );
}

export default ForgotPassword;
