import { useEffect, useState } from "react";
import { useCities } from "../contexts/CitiesContext";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./EditCityForm.module.css";
import DatePicker from "react-datepicker";
import Button from "./Button";
import BackButton from "./BackButton";
import Message from "./Message";

function EditCityForm() {
  const navigate = useNavigate();
  const { updateCity, isLoading, error, currentCity } = useCities();
  const [date, setDate] = useState();
  const [notes, setNotes] = useState();
  const { cityName } = currentCity;

  useEffect(() => {
    setDate(new Date(currentCity.date));
    setNotes(currentCity.notes);
  }, [currentCity]);

  async function handleUpdate(e) {
    e.preventDefault();
    updateCity({ date, notes });
    navigate(-1, { replace: true });
  }

  if (error) return <Message message={error} />;

  return (
    <form className={`${styles.form} ${isLoading ? "loading" : ""}`}>
      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          onChange={(date) => setDate(date)}
          selected={date}
          dateFormat="dd/MM/yyyy"
        />
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
        <Button onClick={(e) => handleUpdate(e)} type={"primary"}>
          {isLoading ? "Updating..." : "Update"}
        </Button>
        <BackButton />
      </div>
    </form>
  );
}

export default EditCityForm;
