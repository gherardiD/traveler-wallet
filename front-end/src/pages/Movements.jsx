// import { useEffect, useState } from "react";
import Movement from "../components/Movement";
import Header from "../components/Header";
import Footer from "../components/Footer";

const movements = [
  {
    id: 1,
    amount: 1000,
    sign: "+",
    date: "2021-07-01",
    type: "deposit",
  },
  {
    id: 2,
    amount: 500,
    sign: "+",
    date: "2021-07-02",
    type: "deposit",
  },
  {
    id: 3,
    amount: 200,
    sign: "-",
    date: "2021-07-03",
    type: "withdrawal",
  },
];

function Movements() {
  // const [movements, setMovements] = useState(movements);

  // useEffect(() => {
  //   const getMovements = async function fetchData() {
  //     const response = await axios.get("http://127.0.0.1:3001/user/movements");
  //     const data = await response.json();
  //     setMovements(data);
  //     console.log(data);
  //   };
  //   getMovements();
  // }, []);

  const totalMoney = movements.reduce((acc, movement) => {
    if (movement.sign === "+") {
      return acc + movement.amount;
    } else {
      return acc - movement.amount;
    }
  }, 0);

  return (
    <div className="w-full h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <Header />

      <div className="flex-grow flex justify-around mt-8">
        {/* Total Money */}
        <div className="text-center">
          <h1 className="text-2xl font-bold">Total Money</h1>
          <h1 className="text-3xl font-bold text-green-500">${totalMoney}</h1>
        </div>

        {/* Movements */}
        <div>
          <h1 className="text-2xl font-bold mb-4">Movements</h1>
          <ul>
            {movements.map((movement) => (
              <Movement key={movement.id} movement={movement} />
            ))}
          </ul>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Movements;
