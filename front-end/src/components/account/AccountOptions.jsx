/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../../api/Axios";

const AccountOptions = ({ toggleShowOtherOptions }) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const accessToken = sessionStorage.getItem("accessToken");
    if (!accessToken) {
      navigate("/login");
    }
    
    const getUserData = async function fetchData() {
      try {
        const response = await axios.get("/users/me", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });
        setUserData(response.data.user);
        setLoading(false)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getUserData();
    
  }, []);

  return (
    // shows firstName lastName email dateOfBirth phone

    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-blue-600">Account Options</h2>
          <button
            onClick={toggleShowOtherOptions}
            className="text-gray-600 hover:text-gray-800"
          >
            X
          </button>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4">User Information</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold ">First Name</h4>
              <p className="text-lg text-gray-800">{userData.firstName}</p>
            </div>
            <div>
              <h4 className="font-semibold ">Last Name</h4>
              <p className="text-lg text-gray-800">{userData.lastName}</p>
            </div>
            <div>
              <h4 className="font-semibold ">Email</h4>
              <p className="text-lg text-gray-800">{userData.email}</p>
            </div>
            <div>
              <h4 className="font-semibold ">Date of Birth</h4>
              <p className="text-lg text-gray-800">{userData.dateOfBirth}</p>
            </div>
            <div>
              <h4 className="font-semibold ">Phone</h4>
              <p className="text-lg text-gray-800">{userData.phone}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountOptions;
