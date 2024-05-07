import { useState } from "react";
import styles from "./UpdatePasswordForm.module.css";
import { useAuth } from "../contexts/AuthContext";
import Spinner from "./Spinner";
import Message from "./Message";
import Button from "./Button";

// eslint-disable-next-line react/prop-types
function UpdatePasswordForm({ toggleUpdatePasswordForm }) {
  const { changePassword, isLoading, error } = useAuth();
  const [formData, setFormData] = useState({
    oldPassword: "",
    password: "",
    confirmPassword: "",
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
  }

  return (
    <div className={styles.container}>
      {isLoading && <Spinner />}
      {error && <Message message={error} />}
      {!error && !isLoading && (
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.row}>
            <label htmlFor="old-password">Password</label>
            <input
              type="oldPassword"
              id="oldPassword"
              name="oldPassword"
              onChange={(e) => handleInputChange(e)}
              value={formData.oldPassword}
            />
          </div>

          <div className={styles.row}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={(e) => handleInputChange(e)}
              value={formData.password}
            />
          </div>

          <div className={styles.row}>
            <label htmlFor="confirmPassword">Confirm password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              onChange={(e) => handleInputChange(e)}
              value={formData.confirmPassword}
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
