import { Link } from "react-router-dom";
import styles from "./Logo.module.css";

function Logo() {
  return (
    <Link to="/" className={styles.logo}>
      <img src="/icon.png" alt="Traveler Wallet logo" className={styles.img} />
      <span className={styles.title}>traveler wallet</span>
    </Link>
  );
}

export default Logo;
