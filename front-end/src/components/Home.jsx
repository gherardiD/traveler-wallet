import { useEffect } from "react";
import { Link } from "react-router-dom";

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
    console.log(document.cookie);
    const getTokenFromCookies = () => {
      const cookies = document.cookie.split("; ");

      for (const cookie of cookies) {
        const [name, value] = cookie.split("=");

        if (name === "userToken") {
          return value;
        }
      }

      return null;
    };

    const token = getTokenFromCookies();
    if (!token) {
      // Redirect the user to the login page
      // window.location.href = "/login";
    }

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
      <header className="bg-blue-700 text-white py-4">
        <div className="container mx-auto px-10 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Financial Hub</h1>
          <nav>
            <Link
              to="/app/movements"
              className="text-white hover:underline mx-2"
            >
              Movements
            </Link>
            <Link
              to="/app/currencies"
              className="text-white hover:underline mx-2"
            >
              Currencies
            </Link>
            <Link to="account" className="text-white hover:underline mx-2">
              Account
            </Link>
            <Link to="/logout" className="text-white hover:underline mx-2">
              Logout
            </Link>
          </nav>
        </div>
      </header>

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
      <footer className="bg-blue-700 text-white py-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Financial Hub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
