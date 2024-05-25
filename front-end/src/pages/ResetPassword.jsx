import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./ResetPassword.module.css";
import PageNav from "../components/PageNav";
import Spinner from "../components/Spinner";
import Message from "../components/Message";
import Button from "../components/Button";
import Axios from "../api/Axios";

function ResetPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("danighera");
  const [passwordConfirm, setPasswordConfirm] = useState("danighera");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const params = useParams();
  const token = params.passwordResetToken;

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      await Axios.patch(`/users/reset-password/${token}`, {
        password,
        passwordConfirm,
      });
      setIsLoading(false);
      navigate("/login");
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  }

  return (
    <main className={styles.reset}>
      <PageNav />
      {isLoading && <Spinner />}
      {error && <Message message={error} />}
      {!error && !isLoading && (
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.row}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <div className={styles.row}>
            <label htmlFor="passwordConfirm">Password Confirm</label>
            <input
              type="password"
              id="passwordConfirm"
              onChange={(e) => setPasswordConfirm(e.target.value)}
              value={passwordConfirm}
            />
          </div>

          <div className={styles.buttons}>
            <Button type="primary">Reset password</Button>
            <Button
              type="back"
              onClick={(e) => {
                e.preventDefault();
                navigate("/login");
              }}
            >
              Annul
            </Button>
          </div>
        </form>
      )}
    </main>
  );
}

export default ResetPassword;
