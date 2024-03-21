import { useState, useEffect } from "react";
import axios from "../../api/Axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

function Loading({isLoading}) {
  return <>{isLoading && <p className="text-blue-500">Loading...</p>}</>;
}

function Error({error}) {
  return <>{error && <p className="text-red-500">{error}</p>}</>;
}

function Success({isLoading, error}) {
  return (
    <>
      {!isLoading && !error && (
        <div>
          <p className="text-green-500">Email confirmed successfully!</p>
          <Link to="/app/home" className="text-blue-500 underline">
            clicca qui
          </Link>
        </div>
      )}
    </>
  );
}

function ConfirmEmail() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const params = useParams();
  const token = params.token;

  // ! FIND A WAY TO RUN USEEFFECT JUST ONCE
  useEffect(() => {
    async function sendTokenToConfirmEmail() {
      try {
        const response = await axios.get(`/users/confirm-email/${token}`);
        handleSuccessfulEmailConfirmed(response);
      } catch (err) {
        handleFailedEmailConfirmed(err);
      }
    }

    sendTokenToConfirmEmail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  function handleSuccessfulEmailConfirmed(response) {
    console.log("Success:", response.data);
    setIsLoading(false);
    storeUserToken(response);
    return (window.location.href = "/app/home");
  }

  function storeUserToken(response) {
    // TODO store the token in document.cookie
    const token = response.data.token;
    sessionStorage.setItem("accessToken", token);
  }

  function handleFailedEmailConfirmed(error) {
    console.error("Error:", error);
    setError(error.response.data.message);
    setIsLoading(false);
  }

  return (
    <div className="container bg-white p-8 rounded shadow-md w-1/3 h-auto text-center m-auto">
      <Loading isLoading={isLoading} />
      <Error error={error} />
      <Success isLoading={isLoading} error={error} />
    </div>
  );
}

export default ConfirmEmail;
