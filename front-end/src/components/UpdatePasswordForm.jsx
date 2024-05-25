import { useState } from "react";
import styles from "./UpdatePasswordForm.module.css";
import { useAuth } from "../contexts/AuthContext";
import Spinner from "./Spinner";
import Message from "./Message";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function UpdatePasswordForm({ toggleUpdatePasswordForm }) {
  const navigate = useNavigate();
  const { changePassword, isLoading, error, logout } = useAuth();
  const [formData, setFormData] = useState({
    passwordCurrent: "",
    password: "",
    passwordConfirm: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  function handleAnnul(e) {
    e.preventDefault();
    toggleUpdatePasswordForm();
  }

  function handleSubmit(e) {
    e.preventDefault();
    changePassword(formData);
    logout();
    navigate("/login");
  }

  return (
    <div className={styles.container}>
      {isLoading && <Spinner />}
      {error && <Message message={error} />}
      {!error && !isLoading && (
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.row}>
            <label htmlFor="old-password">Old password</label>
            <input
              type="password"
              id="passwordCurrent"
              name="passwordCurrent"
              onChange={(e) => handleInputChange(e)}
              value={formData.passwordCurrent}
            />
          </div>

          <div className={styles.row}>
            <label htmlFor="password">New password</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={(e) => handleInputChange(e)}
              value={formData.password}
            />
          </div>

          <div className={styles.row}>
            <label htmlFor="passwordConfirm">Confirm new password</label>
            <input
              type="password"
              id="passwordConfirm"
              name="passwordConfirm"
              onChange={(e) => handleInputChange(e)}
              value={formData.passwordConfirm}
            />
          </div>

          <div className={styles.buttons}>
            <Button onClick={(e) => handleSubmit(e)} type="primary">
              Update
            </Button>
            <Button onClick={(e) => handleAnnul(e)} type="secondary">
              Annul
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}

export default UpdatePasswordForm;
