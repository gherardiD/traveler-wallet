import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "../api/Axios";

import Header from "../components/Header";
import DeletePopUp from "../components/DeletePopUp";
import FormField from "../components/FormField";

// eslint-disable-next-line react/prop-types
const UpdatePasswordForm = ({toggleUpdatePasswordForm}) => {
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

    setSubmitting(true);

    try {
      const accessToken = sessionStorage.getItem("accessToken");
      const response = await axios.patch(
        "/users/update-password",
        formData,
        {headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Success:", response.data);

      setFormData({
        passwordCurrent: "",
        password: "",
        passwordConfirm: "",
      });

      setSubmitting(false);

      return toggleUpdatePasswordForm();
    } catch (err) {
      // console.error(err.response);
      setError(err.response);
      setSubmitting(false);
    }
  }
 
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-4 rounded-lg">
          <p>Change your password</p>
          <form onSubmit={handleSubmit} method="post">
            <FormField
              label="Old Password"
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
              >Cancel
              </button>
            </div>
          </form>
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
      </div>
    
  )
}


const Account = () => {
  const [showUpdatePasswordForm, setShowUpdatePasswordForm] = useState(false);
  const [showDeleteUserPopUp, setShowDeleteUserPopUp] = useState(false);

  const toggleUpdatePasswordForm = () => {
    setShowUpdatePasswordForm(!showUpdatePasswordForm);
  };

  const toggleDeletePopUp = () => {
    setShowDeleteUserPopUp(!showDeleteUserPopUp);
  };

  const handleDelete = async () => {
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      // TODO use cookies instead of sessionStorage
      if (!accessToken) {
        window.location.href = "/login";
      }
      const res = await axios.delete("/users/delete-me", {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Include the token in the Authorization header
          "Content-Type": "application/json",
        },
      });

      if (res.status === 204) {
        window.location.href = "/login";
        console.log("Account deleted");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col">
      {/* Header */}
      <Header />
      {showUpdatePasswordForm && (
        <UpdatePasswordForm
          toggleUpdatePasswordForm={toggleUpdatePasswordForm}
        />
      )}
      {showDeleteUserPopUp && (
        <DeletePopUp
          toggleDeletePopUp={toggleDeletePopUp}
          handleDelete={handleDelete}
        />
      )}
      {/* Main */}
      <div className="container mx-auto flex-grow flex ">
        {/* Account Section */}
        <div className="w-1/3 bg-white p-8 rounded-lg shadow-md animate__animated animate__fadeIn animate__delay-1s">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            Account Settings
          </h2>

          {/* Change Password */}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-2 text-gray-700">
              Change Password
            </h3>
            <button onClick={toggleUpdatePasswordForm} className="bg-blue-500 text-white py-2 px-4 rounded-full font-semibold hover:bg-blue-600 transition duration-300">
              Change Password
            </button>
          </div>

          {/* Delete Account */}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-2 text-red-600">
              Delete Account
            </h3>
            <button
              onClick={toggleDeletePopUp}
              className="bg-red-500 text-white py-2 px-4 rounded-full font-semibold hover:bg-red-600 transition duration-300"
            >
              Delete Account
            </button>
          </div>

          {/* Other Account Options */}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-2 text-gray-700">
              Other Account Options
            </h3>
            <Link to="/other-options" className="text-blue-700 hover:underline">
              <button className="bg-gray-500 text-white py-2 px-4 rounded-full font-semibold hover:bg-gray-600 transition duration-300">
                Other Options
              </button>
            </Link>
          </div>
        </div>
        <div className="w-full bg-white p-8 text-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">User Stats</h2>
            {/* Add your main content here */}
            <p className="text-lg mb-5">different graphics</p>
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer className="bg-blue-700 text-white py-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Financial Hub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Account;
