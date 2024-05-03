import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";

import styles from "./City.module.css";
import { useCities } from "../contexts/CitiesContext";
import Spinner from "./Spinner";
import BackButton from "./BackButton";
import Button from "./Button";
import { formatDate } from "../utils/date";

function City() {
  const { id } = useParams();
  const { currentCity, isLoading, getCityById } = useCities();

  useEffect(() => {
    getCityById(id);
  }, [id]);

  // if () return <Message message="City not found" />;
  const { cityName, country, date, notes } = currentCity;
  const flag = country?.flag;

  if (isLoading) return <Spinner />;

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{flag}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div className={styles.buttons}>
        <Button type={"primary"}>
          <Link to={`/app/cities/${id}/edit`}>Edit</Link>
        </Button>
        <BackButton />
      </div>
    </div>
  );
}

export default City;
