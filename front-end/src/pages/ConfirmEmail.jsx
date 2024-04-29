import styles from './ConfirmEmail.module.css'
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Message from "../components/Message";
import Button from "../components/Button";

function ConfirmEmail() {
  const { confirmEmail, isAuthenticated } = useAuth();
  const params = useParams();
  const token = params.emailToken;

  // ! FIND A WAY TO RUN USEEFFECT JUST ONCE
  useEffect(() => {
    confirmEmail(token);
  }, [token]);

  return (
    <div >
      {isAuthenticated ? (
        <div className={styles.container}>
          <Message message={"Email confirmed"} className={styles.message} />
          <Button type="primary" className={styles.button}>
            <Link to="/app" className="text-blue-500">
              Go to app
            </Link>
          </Button>
        </div>
      ) : (
        <Message message={"Email not confirmed"} />
      )}
    </div>
  );
}

export default ConfirmEmail;
