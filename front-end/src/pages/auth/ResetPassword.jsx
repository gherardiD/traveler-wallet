import { useState } from "react";
import Axios from "../../api/Axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import FormField from "../../components/form/FormField";
import SubmittingError from "../../components/form/SubmittingError";
import SubmitButton from "../../components/form/SubmitButton";

// eslint-disable-next-line react/prop-types
function ResetPassword() {
  const [formData, setFormData] = useState({
    password: "",
    passwordConfirm: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const params = useParams();
  const token = params.token;

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
      const response = await sendData();

      handleSuccessfulSubmit(response);
      return relocateToLogin();
    } catch (err) {
      handleFailedSubmit(err);
    }
  };

  function sendData() {
    return axios.patch(`/users/reset-password/${token}`, formData);
  }

  function handleSuccessfulSubmit(response) {
    console.log("Success:", response.data);
    setSubmitting(false);
    resetFormData();
  }

  function resetFormData() {
    setFormData({
      password: "",
      passwordConfirm: "",
    });
  }

  function relocateToLogin() {
    return (window.location.href = "/login");
  }

  function handleFailedSubmit(err) {
    console.error(err.response.data);
    setError(err.response.data.message);
    setSubmitting(false);
  }

  return (
    <div className="container bg-white p-8 rounded shadow-md w-1/3 h-auto text-center m-auto">
      <h2 className="animated text-2xl mb-6">Reset password</h2>
      <form onSubmit={handleSubmit} method="post">
        <FormField
          label="Password"
          type="password"
          id="password"
          name="password"
          onChange={handleInputChange}
        />

        <FormField
          label="Confirm Password"
          type="password"
          id="passwordConfirm"
          name="passwordConfirm"
          onChange={handleInputChange}
        />

        <div className="form-group animated flex justify-between">
          <SubmitButton text={submitting ? "Loading..." : "Reset Password"} />
          <Link to="/login" className="mt-2 text-blue-500">
            Annul
          </Link>
        </div>
      </form>
      <SubmittingError error={error} />
    </div>
  );
}

export default ResetPassword;
