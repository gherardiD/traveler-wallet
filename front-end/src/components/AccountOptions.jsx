import { useState, useEffect } from "react";
import axios from "../api/Axios";

const AccountOptions = () => {
  const [userData, setUserData] = useState({})
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const accessToken = sessionStorage.getItem("accessToken");
    if (!accessToken) {
      window.location.href = "/login";
    }

    const getUserData = async function fetchData() {
      setLoading(true);
      const response = await axios.get("/users/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
      if (response.data.status === "success") {
        setUserData(response.data.data.document);
        setLoading(false);
      }
    };
    getUserData();
  }, []);

  return (
    // shows firstName lastName email dateOfBirth phone
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg">
        <h2 className="text-3xl font-bold mb-4">Account Options</h2>
        <div className="w-1/3 flex flex-col items-center justify-center">
          <div className="w-full flex flex-col items-center justify-center">
            <h3 className="text-2xl font-bold mb-4">User Information</h3>
            <div className="w-full flex flex-col items-center justify-center">
              <div className="w-full flex flex-col items-center justify-center">
                <h4 className="text-xl font-bold mb-4">First Name</h4>
                <p className="text-lg mb-4">{userData.firstName}</p>
              </div>
              <div className="w-full flex flex-col items-center justify-center">
                <h4 className="text-xl font-bold mb-4">Last Name</h4>
                <p className="text-lg mb-4">{userData.lastName}</p>
              </div>
              <div className="w-full flex flex-col items-center justify-center">
                <h4 className="text-xl font-bold mb-4">Email</h4>
                <p className="text-lg mb-4">{userData.email}</p>
              </div>
              <div className="w-full flex flex-col items-center justify-center">
                <h4 className="text-xl font-bold mb-4">Date of Birth</h4>
                <p className="text-lg mb-4">{userData.dateOfBirth}</p>
              </div>
              <div className="w-full flex flex-col items-center justify-center">
                <h4 className="text-xl font-bold mb-4">Phone</h4>
                <p className="text-lg mb-4">{userData.phone}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountOptions;