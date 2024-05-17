import { useEffect, useState } from "react";
import Axios from "../api/Axios";
import { formatDate } from "../utils/date";
import { convertToFlag } from "../utils/flag";
import styles from "./AdminCityList.module.css";

// eslint-disable-next-line react/prop-types
export default function AdminCityList({ token }) {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    Axios.get("/admin/cities", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => setCities(response.data.cities))
      .catch((error) => console.error(error));
  }, [token]);

  function handleClick(cityId) {
    Axios.delete(`/admin/cities/${cityId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(() => {
        setCities(cities.filter((city) => city._id !== cityId));
      })
      .catch((error) => console.error(error));
  }

  return (
    <div className={styles.container}>
      <ul className={styles.cityList}>
        {cities.map((city) => (
          <li key={city._id} className={styles.cityListItem}>
            <span className={styles.flag}>
              {convertToFlag(city.country.flag)}
            </span>
            <h3 className={styles.name}>{city.cityName}</h3>
            <span>user: {city._id}</span>
            <time className={styles.date}>{formatDate(city.date)}</time>
            <button
              className={styles.deleteBtn}
              onClick={() => handleClick(city._id)}
            >
              &times;
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
