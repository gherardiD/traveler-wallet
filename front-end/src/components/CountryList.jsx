/* eslint-disable react/prop-types */
import styles from "./CountryList.module.css";
import CountryItem from "./CountryItem";
import Spinner from "./Spinner";
import Message from "./Message";
import { useCities } from "../contexts/CitiesContext";

function CountryList() {
  const { cities, isLoading } = useCities();
  
  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message message={"Add your first country by clicking on the map"} />
    );

  const countries = cities.reduce((arr, city) => {
    // if array do not already include the current country
    if (!arr.map((el) => el.country).includes(city.country)) {
      return [...arr, { country: city.country, emoji: city.emoji }];
    } else {
      return arr;
    }
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country, index) => (
        <CountryItem country={country} key={index} />
      ))}
    </ul>
  );
}

export default CountryList;
