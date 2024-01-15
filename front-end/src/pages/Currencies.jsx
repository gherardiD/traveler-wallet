import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Currency from "../components/Currency";
import Header from "../components/Header";

// const currencies = [
//   {
//     id: 1,
//     name: 'Euro',
//     cod: 'EUR',
//   },
//   {
//     id: 2,
//     name: 'Dollaro',
//     cod: 'USD',
//   },
//   {
//     id: 3,
//     name: 'Sterlina',
//     cod: 'GBP',
//   },
//   {
//     id: 4,
//     name: 'Yen',
//     cod: 'JPY',
//   },
//   {
//     id: 5,
//     name: 'Rublo',
//     cod: 'RUB',
//   },
// ];

function Currencies() {
  const [currencies, setCurrencies] = useState([]);

  useEffect(
    () =>
      async function fetchCurrencies() {
        const res = await axios.get("http://127.0.0.1:3001/api/currencies");

        const data = res.data;
        if (data.results) {
          setCurrencies(data.data.currencies);
        }
        console.log(data);
        // setCurrencies(res.data.currencies);
      },
    []
  );

  return (
    <div className="w-full h-screen bg-gray-100">
      {/* Header */}
      <Header />

      {/* Main */}
      <div className="container mx-auto flex justify-between items-center">
        <div className="w-1/3">
          <h2 className="text-2xl font-bold my-4">Currencies</h2>
          <ul className="list-group">
            {currencies.map((currency) => {
              return <Currency key={currency.code} currency={currency} />;
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Currencies;
