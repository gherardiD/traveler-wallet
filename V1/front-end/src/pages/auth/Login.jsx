/* eslint-disable no-unused-vars */

import { useState } from "react";
import axios from "../../api/Axios";
import FormField from "../../components/form/FormField";
import { Link, useNavigate } from "react-router-dom";
import SubmitButton from "../../components/form/SubmitButton";
import SubmittingError from "../../components/form/SubmittingError";

// eslint-disable-next-line react/prop-types
function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitting(true);
    setError(null);

    try {
      const response = await axios.post("/users/login", formData);

      handleSuccessfulLogin(response);
    } catch (err) {
      handleFailedLogin(err);
    }
  };

  function handleSuccessfulLogin(response) {
    storeUserToken(response);
    setSubmitting(false);
    navigate("/app/home");
    // window.location.href = "/app/home";
  }

  function storeUserToken(response) {
    // TODO store the token in document.cookie
    const token = response.data.token;
    sessionStorage.setItem("accessToken", token);
  }

  function handleFailedLogin(error) {
    console.error("Error:", error);
    setError(error.response.data.message);
    setSubmitting(false);
  }

  return (
    <div className="container bg-white p-8 rounded shadow-md w-1/3 h-auto text-center m-auto">
      <h2 className="animated text-2xl mb-6">Log In</h2>
      <form onSubmit={handleSubmit} method="post">
        <FormField
          label="Email"
          type="email"
          id="email"
          name="email"
          onChange={handleInputChange}
        />

        <FormField
          label="Password"
          type="password"
          id="password"
          name="password"
          onChange={handleInputChange}
        />

        <div className="form-group animated flex justify-between content-center">
          <div>
            <SubmitButton text={submitting ? "Submitting..." : "Log In"} />
            <Link to="/signup" className="ml-4 text-blue-500">
              Sign up
            </Link>
          </div>
          <Link to="/forgot-password" className="mt-2 text-blue-500">
            Forgot password?
          </Link>
        </div>
      </form>
      <SubmittingError error={error} />
    </div>
  );
}

export default Login;
