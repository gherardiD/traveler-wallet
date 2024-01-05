import { useState } from "react";
import axios from "axios";
import FormField from "./FormField";

// eslint-disable-next-line react/prop-types
function ForgotPassword({ showResetPassword, showLogin }) {
  const [formData, setFormData] = useState({
    email: "",
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
        "http://127.0.0.1:3001/api/users/forgotpassword",
        formData
      );

      console.log("Success:", response.data);

      showResetPassword();

      setFormData({
        email: "",
      });

      setSubmitting(false);
    } catch (err) {
      console.error(err.response.data);
      setError(err.response.data.message);
      setSubmitting(false);
    }
  };
  return (
    <div className="container bg-white p-8 rounded shadow-md w-1/3 h-auto text-center m-auto">
      <h2 className="animated text-2xl mb-6">Forgot password</h2>
      <form onSubmit={handleSubmit}>
        <FormField
          label="Email"
          type="email"
          id="email"
          name="email"
          onChange={handleInputChange}
        />
        <div className="form-group animated flex justify-between">
          <button
            type="submit"
            className="btn-animated bg-blue-500 text-white px-4 py-2 rounded focus:outline-none hover:bg-blue-700"
          >
            {submitting ? "Submitting..." : "Change password"}
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              showLogin();
            }}
            className="btn-animated py-2 text-blue-500 hover:text-blue-700"
          >
            Annul
          </button>
        </div>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}

export default ForgotPassword;
