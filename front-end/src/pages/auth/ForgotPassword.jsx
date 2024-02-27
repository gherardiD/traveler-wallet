import { useState } from "react";
import axios from "../../api/Axios";
import FormField from "../../components/FormField";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function ForgotPassword() {
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
    setError(null);

    try {
      const response = await axios.post("/users/forgot-password", formData);

      console.log("Success:", response.data);

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
          <Link to="/login" className="mt-2 text-blue-500">
            Annul
          </Link>
        </div>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}

export default ForgotPassword;
