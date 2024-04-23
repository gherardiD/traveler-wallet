import { Link } from "react-router-dom";

function Header() {
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    window.location.href = "/login";
  };

  return (
    <header className="bg-blue-700 text-white py-4">
        <div className="container mx-auto px-10 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Financial Hub</h1>
          <nav>
            <Link to="/app/home" className="text-white hover:underline mx-2">
              Home
            </Link>
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
            <Link to="/app/account" className="text-white hover:underline mx-2">
              Account
            </Link>
            <Link onClick={() => handleLogout()} className="text-white hover:underline mx-2">
              Logout
            </Link>
          </nav>
        </div>
      </header>
  );
}

export default Header;