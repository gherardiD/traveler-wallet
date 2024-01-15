import { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "../api/Axios";

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

function Home() {
  // const [movements, setMovements] = useState(movements);

  useEffect(() => {
    // Check if the user is logged in
    const accessToken = sessionStorage.getItem("accessToken");
    console.log(accessToken);
    if (!accessToken) {
      // Redirect the user to the login page
      window.location.href = "/login";
    }

    const getMovements = async function fetchData() {
      const response = await axios.get("/#", {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Include the token in the Authorization header
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);
    };
    getMovements();

    // const getMovements = async function fetchData() {
    //   const response = await fetch("/api/user-data", {
    //     method: "GET",
    //     headers: {
    //       Authorization: `Bearer ${token}`, // Include the token in the Authorization header
    //       "Content-Type": "application/json",
    //     },
    //   });
    // };
    // getMovements();
  }, []);

  const totalIncome = movements.reduce((acc, movement) => {
    if (movement.sign === "+") {
      return acc + movement.amount;
    } else {
      return acc;
    }
  }, 0);

  const totalExpenses = movements.reduce((acc, movement) => {
    if (movement.sign === "-") {
      return acc + movement.amount;
    } else {
      return acc;
    }
  }, 0);

  return (
    <div className="w-full h-screen flex flex-col">
      {/* Header */}
      <Header />

      {/* Content */}
      <div className="container mx-auto flex-grow flex">
        {/* Wallet Summary */}
        <div className="w-1/3 bg-gray-100 py-8 text-center">
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
        <div className="w-2/3 bg-white p-8">
          <h2 className="text-3xl font-bold mb-4">Main Content</h2>
          {/* Add your main content here */}
          <p className="text-lg">Your main content goes here...</p>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Home;
