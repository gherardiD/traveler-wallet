/* eslint-disable no-unused-vars */

import { useState } from "react";
import axios from "axios";
import FormField from "./FormField";

// eslint-disable-next-line react/prop-types
const SignUp = ({ showLogin }) => {
  // State to manage form data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
    phone: "",
    dateOfBirth: "",
  });

  // State to manage submission status
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Function to handle form input changes
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Set submitting to true
    setSubmitting(true);

    try {
      // Make a POST request to the back-end endpoint
      const response = await axios.post(
        "http://127.0.0.1:3001/api/users/signup",
        formData
      );

      // Handle successful submission
      console.log("Success:", response.data);
      // Reset form data
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirm: "",
        phone: "",
        dateOfBirth: "",
      });

      // Set submitting to false
      setSubmitting(false);
    } catch (error) {
      // Handle submission error
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );

      // Set error state
      setError(
        error.response ? error.response.data.message : "An error occurred"
      );

      // Set submitting to false
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded shadow-md w-96 h-auto m-auto ">
      <h2 className="text-2xl mb-6">Registration Form</h2>
      <form onSubmit={handleSubmit} method="post">
        <FormField
          label="First Name"
          type="text"
          id="firstName"
          name="firstName"
          onChange={handleInputChange}
          key="firstName"
        />

        <FormField
          label="Last Name"
          type="text"
          id="lastName"
          name="lastName"
          onChange={handleInputChange}
          key="lastName"
        />

        <FormField
          label="Email"
          type="email"
          id="email"
          name="email"
          onChange={handleInputChange}
          key="email"
        />

        <FormField
          label="Password"
          type="password"
          id="password"
          name="password"
          onChange={handleInputChange}
          key="password"
        />

        <FormField
          label="Confirm Password"
          type="password"
          id="passwordConfirm"
          name="passwordConfirm"
          onChange={handleInputChange}
          key="passwordConfirm"
        />

        <FormField
          label="Phone"
          type="tel"
          id="phone"
          name="phone"
          onChange={handleInputChange}
          key="phone"
        />

        <FormField
          label="date of birth"
          type="date"
          id="dateOfBirth"
          name="dateOfBirth"
          onChange={handleInputChange}
          key="dateOfBirth"
        />

        <div className="flex items-center">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded focus:outline-none hover:bg-blue-700"
          >
            {submitting ? "Submitting..." : "Register"}
          </button>
          <button onClick={showLogin} className="ml-4 text-gray-700">
            Login
          </button>
        </div>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default SignUp;
