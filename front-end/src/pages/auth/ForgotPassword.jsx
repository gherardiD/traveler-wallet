import { useState } from "react";
import axios from "../../api/Axios";
import FormField from "../../components/form/FormField";
import { Link } from "react-router-dom";
import SubmitButton from "../../components/form/SubmitButton";
import SubmittingError from "../../components/form/SubmittingError";

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
      handleSuccessfulSubmit(response);
    } catch (err) {
      handleFailedSubmit(err);
    }
  };

  function handleSuccessfulSubmit(response) {
    console.log("Success:", response.data);
    setSubmitting(false);
    resetFormData();
  }

  function resetFormData() {
    setFormData({
      email: "",
    });
  }
  
  function handleFailedSubmit(err) {
    console.error("Error:", err);
    setError(err.response.data.message);
    setSubmitting(false);
  }

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
          <SubmitButton text={submitting ? "Loading..." : "Change Password"} />
          <Link to="/login" className="mt-2 text-blue-500">
            Annul
          </Link>
        </div>
      </form>
      <SubmittingError error={error} />
      
    </div>
  );
}

export default ForgotPassword;
