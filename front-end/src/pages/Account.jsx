import { Link } from 'react-router-dom';
import Header from '../components/Header';

const Account = () => {
  return (
    <div className="w-full h-screen flex flex-col">
      {/* Header */}
      <Header />

      <div className="container mx-auto flex-grow flex">
      {/* Account Section */}
      <div className="w-full bg-white p-8 rounded-lg shadow-md animate__animated animate__fadeIn animate__delay-1s">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Account Settings</h2>

        {/* Change Password */}
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-2 text-gray-700">Change Password</h3>
          {/* Replace text with a button/link */}
          <Link to="/change-password" className="text-blue-700 hover:underline">
            <button className="bg-blue-500 text-white py-2 px-4 rounded-full font-semibold hover:bg-blue-600 transition duration-300">
              Change Password
            </button>
          </Link>
        </div>

        {/* Delete Account */}
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-2 text-red-600">Delete Account</h3>
          {/* Replace text with a button/link */}
          <button className="bg-red-500 text-white py-2 px-4 rounded-full font-semibold hover:bg-red-600 transition duration-300">
            Delete Account
          </button>
        </div>

        {/* Other Account Options */}
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-2 text-gray-700">Other Account Options</h3>
          {/* Replace text with a button/link */}
          <Link to="/other-options" className="text-blue-700 hover:underline">
            <button className="bg-gray-500 text-white py-2 px-4 rounded-full font-semibold hover:bg-gray-600 transition duration-300">
              Other Options
            </button>
          </Link>
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
