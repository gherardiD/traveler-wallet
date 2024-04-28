import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import styles from "./SignUp.module.css";
import PageNav from "../components/PageNav";
import Button from "../components/Button";
import BackButton from "../components/BackButton";

function SignUp() {
  const navigate = useNavigate();
  const { signUp, isAuthenticated } = useAuth();
  // PRE-FILL FOR DEV PURPOSES
  const [formData, setFormData] = useState({
    firstName: "Daniele",
    lastName: "Gherardi",
    email: "gherardi.daniele.studente@itispaleocapa.it",
    password: "danieleg",
    passwordConfirm: "danieleg",
    phone: "3207256463",
    dateOfBirth: "26/04/2005",
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/app/cities", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  function handleSubmit(e) {
    e.preventDefault();
    signUp(formData);
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <main className={styles.signUp}>
      <PageNav />
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="firstName">First name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            onChange={(e) => handleInputChange(e)}
            value={formData.firstName}
          />
        </div>
        <div className={styles.row}>
          <label htmlFor="lastName">Last name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            onChange={(e) => handleInputChange(e)}
            value={formData.lastName}
          />
        </div>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => handleInputChange(e)}
            value={formData.email}
          />
        </div>
        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => handleInputChange(e)}
            value={formData.passwordConfirm}
          />
        </div>
        <div className={styles.row}>
          <label htmlFor="passwordConfirm">Confirm password</label>
          <input
            type="password"
            id="passwordConfirm"
            onChange={(e) => handleInputChange(e)}
            value={formData.passwordConfirm}
          />
        </div>
        <div className={styles.row}>
          <label htmlFor="phone">Phone number</label>
          <input
            type="tel"
            id="phone"
            onChange={(e) => handleInputChange(e)}
            value={formData.phone}
          />
        </div>
        <div className={styles.row}>
          <label htmlFor="dateOfBirth">Date of birth</label>
          <input
            type="date"
            id="dateOfBirth"
            onChange={(e) => handleInputChange(e)}
            value={formData.dateOfBirth}
          />
        </div>
        <div className={styles.buttons}>
          <Button type="primary">SignUp</Button>
          <BackButton />
        </div>
      </form>
    </main>
  );
}

export default SignUp;
