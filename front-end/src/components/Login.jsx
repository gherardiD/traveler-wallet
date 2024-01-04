/* eslint-disable no-unused-vars */

import { useState } from "react";
import axios from "axios";
import FormField from "./FormField";

// eslint-disable-next-line react/prop-types
function Login({ showSignup }) {
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

    try {
      const response = await axios.post(
        "http://127.0.0.1:3001/api/users/login",
        formData
      );

      console.log("Success:", response.data);

      setFormData({
        email: "",
        password: "",
      });

      setSubmitting(false);
    } catch (err) {
      console.error(err.response.data);
      setError(err.response.data.message);
      setSubmitting(false);
    }
  };

  return (
    <div className="container bg-white p-8 rounded shadow-md w-96 text-center m-auto">
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

        <div className="form-group animated">
          <button
            type="submit"
            className="btn-animated bg-blue-500 text-white px-4 py-2 rounded focus:outline-none hover:bg-blue-700"
          >
            {submitting ? "Submitting..." : "Log in"}
          </button>
          <button onClick={showSignup} className="ml-4 text-blue-500">
            Sign up
          </button>
        </div>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}

export default Login;
