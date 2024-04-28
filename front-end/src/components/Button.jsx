/* eslint-disable react/prop-types */
import styles from "./Button.module.css";

// type: primary - back
function Button({ children, onClick, type }) {
  return (
    <button className={`${styles.btn} ${styles[type]}`} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
