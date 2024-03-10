import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Movement from "../components/Movement";
import axios from "../api/Axios";

function Home() {
  const [movements, setMovements] = useState([]);

  useEffect(() => {
    function fetchMovements() {
      async function fetchData(accessToken) {
        try {
          const response = await sendData(accessToken);
          handleSuccessfulMovementsFetch(response);
        } catch (error) {
          handleFailedMovementsFetch(error);
        }
      }

      const accessToken = getAccessToken();
      checkIfUserIsLoggedIn(accessToken);
      fetchData(accessToken);
    }

    fetchMovements();
  }, []);

  function getAccessToken() {
    // TODO do it using cookies
    return localStorage.getItem("accessToken");
  }

  function checkIfUserIsLoggedIn(accessToken) {
    if (!accessToken) {
      window.location.href = "/login";
    }
  }

  function sendData(accessToken) {
    return axios.get("/movements", {
      headers: {
        Authorization: `Bearer ${accessToken}`, // Include the token in the Authorization header
        "Content-Type": "application/json",
      },
    });
  }

  function handleSuccessfulMovementsFetch(response) {
    setMovements(response.data.data.document);
  }

  function handleFailedMovementsFetch(error) {
    console.error("Error fetching data:", error);
  }

  const totalIncome = getTotalIncome();
  
  function getTotalIncome() {
    return movements.reduce((acc, movement) => {
      if (movement.sign === "+") {
        return acc + movement.amount;
      } else {
        return acc;
      }
    }, 0);
  }

  const totalExpenses = getTotalExpenses();
  
  function getTotalExpenses() {
    return movements.reduce((acc, movement) => {
      if (movement.sign === "-") {
        return acc + movement.amount;
      } else {
        return acc;
      }
    }, 0);
  }

  return (
    <div className="w-full h-screen flex flex-col">
      <Header />

      {/* Content */}
      <div className="container mx-auto flex-grow flex">
        {/* Wallet Summary */}
        <div className="w-1/2 bg-gray-100 py-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Wallet Summary</h2>
          <div className="flex justify-center items-center space-x-8">
            <div>
              <p className="text-lg font-semibold mb-2">Total Income</p>
              <p className="text-2xl text-green-600">${totalIncome}</p>
            </div>
            <div>
              <p className="text-lg font-semibold mb-2">Total Expenses</p>
              <p className="text-2xl text-red-600">${totalExpenses}</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full bg-white p-8">
          <div>
            <h2 className="text-3xl font-bold mb-4">Last Movements</h2>
            {/* Add your main content here */}
            <p className="text-lg">Your main content goes here...</p>
          </div>
          <div className="mt-10">
            <ul>
              {/* TODO: Limit the number of movements to 5 */}
              {movements.map((movement) => (
                <Movement key={movement._id} movement={movement} />
              ))}
            </ul>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Home;
