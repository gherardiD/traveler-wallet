/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import styles from "./CountryItem.module.css";

function CountryItem({ country }) {
  return (
    <li>
      <Link to={`/app/countries/${country.name}`} className={styles.countryItem}>
        <span>{country.flag}</span>
        <span>{country.name}</span>
      </Link>
    </li>
  );
}

export default CountryItem;
