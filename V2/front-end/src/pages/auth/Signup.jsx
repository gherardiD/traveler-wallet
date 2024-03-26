/* eslint-disable no-unused-vars */

import { useState, useEffect } from "react";
import axios from "../../api/Axios";
import { Link } from "react-router-dom";
import FormField from "../../components/form/FormField";
import SubmitButton from "../../components/form/SubmitButton";
import SubmittingError from "../../components/form/SubmittingError";
import { useParams } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const SignUp = () => {
  const params = useParams();
  const bankName = params.bankName;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
    phone: "",
    dateOfBirth: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const getBank = async function fetchData() {
        const response = await axios.get(`/banks/${bankName}`);
        setFormData({
          ...formData,
          bank: response.data.data.bank._id,
        });
      };
      getBank();
    } catch (error) {
      // TODO redirect to error page
    }
  }, [bankName]);

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
      const response = await axios.post(`/users/signup`, formData);

      handleSuccessfulSubmit(response);
    } catch (error) {
      handleFailedSubmit(error);
    }
  };

  function handleSuccessfulSubmit(response) {
    console.log("Success:", response.data);
    resetFormData();
    setSubmitting(false);
  }

  function resetFormData() {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirm: "",
      phone: "",
      dateOfBirth: "",
    });
  }

  function handleFailedSubmit(error) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );

    setError(
      error.response ? error.response.data.message : "An error occurred"
    );

    setSubmitting(false);
  }

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
          <SubmitButton text={submitting ? "submitting" : "Register"} />
          <Link to="/login" className="ml-4 text-gray-700">
            Login
          </Link>
        </div>
      </form>
      <SubmittingError error={error} />
    </div>
  );
};

export default SignUp;
