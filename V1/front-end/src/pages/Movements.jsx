import { useEffect, useState } from "react";
import Movement from "../components/movements/Movement";
import Header from "../components/general/Header";
import Footer from "../components/general/Footer";
import axios from "../api/Axios";

function Movements() {
  const [movements, setMovements] = useState([]);

  useEffect(() => { 
    // TODO use cookies instead of sessionStorage
    const accessToken = sessionStorage.getItem("accessToken");

    // TODO using useNavigate hook
    if (!accessToken) {
      window.location.href = "/login";
    }

    const fetchMovements = async function fetchData() {
      try {
        const response = await axios.get("/movements", {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Include the token in the Authorization header
            "Content-Type": "application/json",
          },
        });
        // console.log(response.data.movements)
        if(response.data.movements){
          setMovements(response.data.movements);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchMovements();
  }, []);

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
