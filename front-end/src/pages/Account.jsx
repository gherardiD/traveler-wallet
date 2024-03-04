import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "../api/Axios";

import Header from "../components/Header";
import DeletePopUp from "../components/DeletePopUp";
import UpdatePasswordForm from "../components/UpdatePasswordForm";
import AccountOptions from "../components/AccountOptions";

const Account = () => {
  const [showUpdatePasswordForm, setShowUpdatePasswordForm] = useState(false);
  const [showDeleteUserPopUp, setShowDeleteUserPopUp] = useState(false);
  const [showOtherOptions, setShowOtherOptions] = useState(false);

  const toggleUpdatePasswordForm = () => {
    setShowUpdatePasswordForm(!showUpdatePasswordForm);
  };

  const toggleDeletePopUp = () => {
    setShowDeleteUserPopUp(!showDeleteUserPopUp);
  };

  const toggleOtherOptions = () => {
    setShowOtherOptions(!showOtherOptions);
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
      {showOtherOptions && <AccountOptions />}
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
              <button onClick={toggleOtherOptions} className="bg-gray-500 text-white py-2 px-4 rounded-full font-semibold hover:bg-gray-600 transition duration-300">
                Other Options
              </button>
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
