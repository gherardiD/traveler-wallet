/* eslint-disable react/prop-types */
import styles from "./CityList.module.css";
import CityItem from "./CityItem";
import Spinner from "./Spinner";
import Message from "./Message";
import { useCities } from "../contexts/CitiesContext";
import { useParams } from "react-router-dom";
import BackButton from "./BackButton";

function CityList() {
  const { cities, isLoading } = useCities();
  const { countryName } = useParams();

  if (isLoading) return <Spinner />;

  // LIST OF CITIES FOR A SPECIFIC COUNTRY
  if (countryName) {
    const filteredCities = cities.filter(
      (city) => city.country.name === countryName
    );
    if (!filteredCities.length)
      return <Message message={`No cities found for ${countryName}`} />;
    return (
      <>
        <ul className={styles.cityList}>
          {filteredCities.map((city) => (
            <CityItem city={city} key={city._id} />
          ))}
        </ul>
        <BackButton />
      </>
    );
  }

  if (!cities.length)
    return <Message message={"Add your first city by clicking on the map"} />;

  // LIST OF ALL CITIES
  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city._id} />
      ))}
    </ul>
  );
}

export default CityList;
