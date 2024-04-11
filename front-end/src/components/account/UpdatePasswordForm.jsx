import FormField from "../form/FormField";
import { useState } from "react";
import axios from "../../api/Axios";
import SubmittingError from "../form/SubmittingError";

const UpdatePasswordForm = ({ toggleUpdatePasswordForm }) => {
  const [formData, setFormData] = useState({
    passwordCurrent: "",
    password: "",
    passwordConfirm: "",
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

    setError(null);
    setSubmitting(true);

    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.patch("/users/update-password", formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      handleSuccessfulLogin(response);

      return toggleUpdatePasswordForm();
    } catch (err) {
      handleFailedLogin(err);
    }
  };

  function handleSuccessfulLogin(response) {
    setSubmitting(false);
    console.log("Success:", response.data);

    setFormData({
      passwordCurrent: "",
      password: "",
      passwordConfirm: "",
    });
  }

  function handleFailedLogin(error) {
    console.error("Error:", error);
    setError(error.response.data.message);
    setSubmitting(false);
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg">
        <p>Change your password</p>
        <form onSubmit={handleSubmit} method="post">
          <FormField
            label="Current Password"
            type="password"
            id="passwordCurrent"
            name="passwordCurrent"
            onChange={handleInputChange}
          />

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
              {submitting ? "Submitting..." : "Changing Password"}
            </button>
            <button
              onClick={toggleUpdatePasswordForm}
              className="bg-red-500 text-white px-4 py-2 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </form>
        <SubmittingError error={error} />
      </div>
    </div>
  );
};

export default UpdatePasswordForm;
