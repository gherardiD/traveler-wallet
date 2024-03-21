import { useEffect, useState } from "react";
import Movement from "../components/Movement";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "../api/Axios";

// const mov = [
//   {
//     id: 1,
//     amount: 1000,
//     sign: "+",
//     date: "2021-07-01",
//     type: "deposit",
//   },
//   {
//     id: 2,
//     amount: 500,
//     sign: "+",
//     date: "2021-07-02",
//     type: "deposit",
//   },
//   {
//     id: 3,
//     amount: 200,
//     sign: "-",
//     date: "2021-07-03",
//     type: "withdrawal",
//   },
// ];

function Movements() {
  const [movements, setMovements] = useState([]);

  useEffect(() => {
    // Check if the user is logged in
    const accessToken = sessionStorage.getItem("accessToken");
    // TODO use cookies instead of sessionStorage
    if (!accessToken) {
      window.location.href = "/login";
    }

    try {
      // fetch the movements
      const getMovements = async function fetchData() {
        const response = await axios.get("/movements", {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Include the token in the Authorization header
            "Content-Type": "application/json",
          },
        });
        // const data = await response.json();
        console.log(response.data.data);
        const movements = response.data.data.document;
        setMovements(movements);
      };
      
      getMovements();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
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

  const totalMoney = getTotalMoney();
  
  function getTotalMoney() {
    return movements.reduce((acc, movement) => {
      if (movement.sign === "+") {
        return acc + movement.amount;
      } else {
        return acc - movement.amount;
      }
    }, 0);
  }

  return (
    <div className="w-full h-screen flex flex-col bg-gray-100">
      <Header />

      <div className="flex-grow flex justify-around mt-8">
        {/* Total Money */}
        <div className="text-center w-1/2 p-8">
          <h1 className="text-2xl font-bold">Total Money</h1>
          <h1 className="text-3xl font-bold text-green-500">${totalMoney}</h1>
        </div>

        {/* Movements */}
        <div className="w-full p-8">
          <h1 className="text-2xl font-bold mb-4">Movements</h1>
          <ul>
            {movements.map((movement) => (
              <Movement
                key={movement._id}
                movement={movement}
                setMovements={setMovements}
              />
            ))}
          </ul>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Movements;
