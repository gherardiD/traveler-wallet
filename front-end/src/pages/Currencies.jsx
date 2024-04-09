import { useState, useEffect } from "react";
import axios from "../api/Axios";
import Currency from "../components/currencies/Currency";
import Header from "../components/general/Header";
import Footer from "../components/general/Footer";

function Currencies() {
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
      const fetchCurrencies = async function fetchData() {
        try {
          // TODO separate all currencies from the user's currencies
          const response = await axios.get("/currencies");
          if (response.data.currencies) {
            setCurrencies(response.data.currencies);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
      fetchCurrencies();
  }, []);
  

  return (
    <div className="w-full h-screen flex flex-col bg-gray-100">
      <Header />

      {/* Main */}
      <div className="container mx-auto flex-grow flex">
        <div className="w-1/3 p-8">
          <h2 className="text-2xl font-bold my-4">Currencies</h2>
          <ul className="list-group">
            {currencies.map((currency) => {
              return <Currency key={currency.code} currency={currency} />;
            })}
          </ul>
        </div>

        <div className="w-full bg-white p-8">
          <div>
            <h2 className="text-3xl font-bold mb-4">Change Currency</h2>
            {/* Add main content here */}
            <p className="text-lg mb-5">Your main content goes here...</p>
            {
              // TODO implement the Currency component in the right way
            }
            {/* <ul>
              {currencies.map((currency) => (
                <span className="flex">
                  <Currency key={currency._id} currency={currency} />
                  -
                  <Currency key={currency._id * 10} currency={currency} />
                </span>
              ))}
            </ul> */}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Currencies;
