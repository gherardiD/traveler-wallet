import React, { useEffect, useState } from 'react';
import Axios from '../api/Axios';

export default function AdminCityList({token}) {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    Axios.get("/admin/cities", { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => setCities(response.data.cities))
      .catch((error) => console.error(error));
  }, []);

  return (
    <ul>
      {cities.map((city) => (
        <li key={city._id}>
          {city.cityName} - {city.country.name} - {city.date}
        </li>
      ))}
    </ul>
  )
}
