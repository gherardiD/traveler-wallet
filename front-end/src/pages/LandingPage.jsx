import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="w-full h-auto">
      {/* Header */}
      <header className="bg-blue-700 text-white py-4">
        <div className="container mx-auto px-10 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Financial Hub</h1>
          <nav>
            <Link to="/login" className="text-white hover:underline mx-2">
              Login
            </Link>
            <Link to="/signup" className="text-white hover:underline mx-2">
              Sign up
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-blue-800 text-white py-16 h-screen flex flex-col justify-center items-center">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4 animate__animated animate__fadeIn">
            Your Financial Freedom Starts Here
          </h1>
          <p className="text-lg mb-8 animate__animated animate__fadeIn">
            Experience secure and convenient financial services tailored for
            you.
          </p>
          <Link
            to="/signup"
            className="bg-white text-blue-700 py-2 px-6 rounded-full font-semibold hover:bg-gray-200 transition duration-300 animate__animated animate__fadeIn"
          >
            Get Started
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="h-screen flex flex-col justify-center items-center">
        <div className="container mx-auto mt-12 ">
          <h2 className="text-2xl font-bold text-center mb-8">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className={`bg-blue-700 text-white p-6 rounded-md shadow-md animate__animated animate__fadeIn animate__delay-${
                  index + 1
                }s`}
              >
                <h3 className="text-xl font-semibold mb-4">
                  Service {index + 1}
                </h3>
                <p>Description for Service {index + 1}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gray-200 py-16 text-center h-screen flex flex-col justify-center items-center">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-4">
            Ready to take control of your finances?
          </h2>
          <p className="text-lg mb-8">
            Join thousands of users who have already experienced the benefits of
            our financial services.
          </p>
          <Link
            to="/signup"
            className="bg-blue-700 text-white py-2 px-8 rounded-full font-semibold hover:bg-blue-600 transition duration-300 animate__animated animate__fadeIn"
          >
            Sign Up Now
          </Link>
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
}

export default LandingPage;
