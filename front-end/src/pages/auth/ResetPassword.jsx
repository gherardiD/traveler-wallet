import { useState } from "react";
import axios from "../../api/Axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import FormField from "../../components/FormField";

// eslint-disable-next-line react/prop-types
function ResetPassword() {
  const [formData, setFormData] = useState({
    password: "",
    passwordConfirm: "",
  });

  const params = useParams();
  const token = params.token;

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
    console.log(token);

    try {
      const response = await axios.patch(
        `/users/reset-password/${token}`,
        formData
      );

      console.log("Success:", response.data);

      setFormData({
        password: "",
        passwordConfirm: "",
      });

      setSubmitting(false);

      return (window.location.href = "/login");
    } catch (err) {
      console.error(err.response.data);
      setError(err.response.data.message);
      setSubmitting(false);
    }
  };

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
          <button
            type="submit"
            className="btn-animated bg-blue-500 text-white px-4 py-2 rounded focus:outline-none hover:bg-blue-700"
          >
            {submitting ? "Submitting..." : "Reset password"}
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

export default ResetPassword;
