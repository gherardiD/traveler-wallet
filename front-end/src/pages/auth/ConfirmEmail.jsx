import { useState, useEffect } from "react";
import axios from "../../api/Axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

function ConfirmEmail() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const params = useParams();
  const token = params.token;

  useEffect(() => {
    const confirmEmail = async () => {
      try {
        const response = await axios.get(`/users/confirm-email/${token}`);
        console.log("Success:", response.data);
        sessionStorage.setItem("accessToken", response.data.token);
        setIsLoading(false);
        // ! FIND A WAY TO RUN USEEFFECT JUST ONCE
        return (window.location.href = "/app/home");
      } catch (err) {
        console.error(err.response.data);
        setError(err.response.data.message);
        setIsLoading(false);
      }
    };
    confirmEmail();
  }, [token]);

  return (
    <div className="container bg-white p-8 rounded shadow-md w-1/3 h-auto text-center m-auto">
      {isLoading && <p className="text-blue-500">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!isLoading && !error && (
        <div>
          <p className="text-green-500">Email confirmed successfully!</p>
          <Link to="/app/home" className="text-blue-500 underline">
            clicca qui
          </Link>
        </div>
      )}
    </div>
  );
}

export default ConfirmEmail;
