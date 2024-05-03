/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import { useCities } from "../contexts/CitiesContext";
import { formatDate } from "../utils/date";
import { convertToFlag } from "../utils/flag";

function CityItem({ city }) {
  const { currentCity, deleteCity } = useCities();
  const { cityName, country, date, _id, position } = city;
  const flag = country?.flag;

  function handleClick(e) {
    e.preventDefault();
    deleteCity(_id);
  }

  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          currentCity._id === _id ? styles["cityItem--active"] : ""
        }`}
        to={`/app/cities/${_id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className={styles.flag}>{convertToFlag(flag)}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn} onClick={handleClick}>
          &times;
        </button>
      </Link>
    </li>
  );
}

export default CityItem;
