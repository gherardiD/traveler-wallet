// import { Link } from "react-router-dom";
import { useState } from "react";
import Axios from "../api/Axios";

import Header from "../components/general/Header";
import DeletePopUp from "../components/account/DeletePopUp";
import UpdatePasswordForm from "../components/account/UpdatePasswordForm";
import AccountOptions from "../components/account/AccountOptions";
import Footer from "../components/general/Footer";

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
      const accessToken = getAccessToken();
      checkIfUserIsLoggedIn(accessToken);

      const response = await deleteUser(accessToken);

      if (response.status === 204) {
        handleSuccessfulDelete();
      }
    } catch (error) {
      handleFailedDelete(error);
    }
  };

  function getAccessToken() {
    // TODO do it using cookies
    return localStorage.getItem("accessToken");
  }

  function checkIfUserIsLoggedIn(accessToken) {
    if (!accessToken) {
      window.location.href = "/login";
    }
  }

  function deleteUser(accessToken) {
    return axios.delete("/users/delete-me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
  }

  function handleSuccessfulDelete() {
    localStorage.removeItem("accessToken");
    window.location.href = "/login";
    console.log("Account deleted");
  }

  function handleFailedDelete(error) {
    console.error("Error deleting account:", error);
  }

  return (
    <div className="w-full h-screen flex flex-col">
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
      {showOtherOptions && <AccountOptions toggleShowOtherOptions={toggleOtherOptions} />}
      
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
            <button
              onClick={toggleUpdatePasswordForm}
              className="bg-blue-500 text-white py-2 px-4 rounded-full font-semibold hover:bg-blue-600 transition duration-300"
            >
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
            <button
              onClick={toggleOtherOptions}
              className="bg-gray-500 text-white py-2 px-4 rounded-full font-semibold hover:bg-gray-600 transition duration-300"
            >
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
      <Footer />
    </div>
  );
};

export default Account;
