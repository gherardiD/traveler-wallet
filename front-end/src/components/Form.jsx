// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUrlPosition } from "../hooks/useUrlPosition";

import styles from "./Form.module.css";
import Button from "./Button";
import BackButton from "./BackButton";
import Message from "./Message";
import Spinner from "./Spinner";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCities } from "../contexts/CitiesContext";

// eslint-disable-next-line react-refresh/only-export-components
export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
  const navigate = useNavigate();
  const [lat, lng] = useUrlPosition();
  const {createCity, isLoading} = useCities();
  
  const [geocodeIsLoading, setGeocodeIsLoading] = useState(false);
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCityData() {
      setError(null);
      if (!lat || !lng) {
        return;
      }

      try {
        setGeocodeIsLoading(true);
        if (lat && lng) {
          const response = await fetch(
            `${BASE_URL}?latitude=${lat}&longitude=${lng}`
          );
          const data = await response.json();
          console.log(data);
          if (!data.countryCode) {
            throw new Error("This is not a city, please click on a city.");
          }
          setCityName(data.city || data.locality || "unknown city");
          setCountry(data.countryName);
          setEmoji(convertToEmoji(data.countryCode));
        }
      } catch (error) {
        setError(error.message);
        console.error(error);
      } finally {
        setGeocodeIsLoading(false);
      }
    }

    fetchCityData();
  }, [lat, lng]);

  async function handleAddClick(e) {
    e.preventDefault();
    if (!cityName || !date) {
      return;
    }
    
    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng }
    };
    
    console.log(newCity);
    await createCity(newCity);
    navigate("/app");
  }

  if (geocodeIsLoading) {
    return <Spinner />;
  }

  if (!lat || !lng) {
    return <Message message="Please click on a city to add a new trip." />;
  }

  if (error) {
    return <Message message={error} />;
  }

  return (
    <form className={`${styles.form} ${isLoading ? "loading" : ""}`}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
        <DatePicker onChange={(date) => setDate(date)} selected={date} dateFormat='dd/MM/yyyy' />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button onClick={(e) => handleAddClick(e)} type={"primary"}>
          Add
        </Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
