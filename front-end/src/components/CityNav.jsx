import { NavLink } from "react-router-dom";
import styles from "./CityNav.module.css";

function CityNav() {
  return (
    <div className={styles.container}>
      <NavLink to="info" replace>
        Info
      </NavLink>
      <NavLink to="expenses" replace>
        Expenses
      </NavLink>
    </div>
  );
}

export default CityNav;
