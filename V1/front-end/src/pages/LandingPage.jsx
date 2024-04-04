import { Link } from "react-router-dom";
import Footer from "../components/general/Footer";

function Header() {
  return (
    <header className="bg-blue-700 text-white py-4">
      <div className="container mx-auto px-10 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Traveler Wallet</h1>
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
  );
}

function Hero() {
  return (
    <div className="bg-blue-800 text-white py-16 h-screen flex flex-col justify-center items-center">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">
          Take control of your finances
        </h1>
        <p className="text-lg mb-8">
          Traveler Wallet is a digital platform that allows you to manage your
          finances in a simple and efficient way.
        </p>
        <Link
          to="/signup"
          className="bg-blue-700 text-white py-2 px-8 rounded-full font-semibold hover:bg-blue-600 transition duration-300"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}

function Features() {
  return (
    <div className=" h-screen flex flex-col justify-center items-center">
      <div className="container mx-auto mt-12 ">
        <h2 className="text-2xl font-bold text-center mb-8">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 3 }).map(
            (_, index) => (
              console.log(index), (<Service key={index} index={index} />)
            )
          )}
        </div>
      </div>
    </div>
  );
}

// eslint-disable-next-line react/prop-types
function Service({ index }) {
  return (
    <div
      className={`bg-blue-700 text-white p-6 rounded-md shadow-md animate__animated animate__fadeIn animate__delay-${
        index + 1
      }s`}
    >
      <h3 className="text-xl font-semibold mb-4">Service {index + 1}</h3>
      <p>Description for Service {index + 1}</p>
    </div>
  );
}

function CallToAction() {
  return (
    <div className="bg-gray-300 py-16 text-center h-screen flex flex-col justify-center items-center">
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
  );
}

function LandingPage() {
  return (
    <div className="w-full h-auto">

      <Header />

      <Hero />

      <Features />

      <CallToAction />

      <Footer />
    {/* <div className="w-full h-screen flex items-center justify-center bg-white">
       <div className="max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="relative isolate overflow-hidden bg-gray-900 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
          <svg
            viewBox="0 0 1024 1024"
            className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
            aria-hidden="true"
          >
            <circle cx={512} cy={512} r={512} fill="url(#759c1415-0410-454c-8f7c-9a820de03641)" fillOpacity="0.7" />
            <defs>
              <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                <stop stopColor="#7775D6" />
                <stop offset={1} stopColor="#E935C1" />
              </radialGradient>
            </defs>
          </svg>
          <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Boost your productivity.
              <br />
              Start using our app today.
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Ac euismod vel sit maecenas id pellentesque eu sed consectetur. Malesuada adipiscing sagittis vel nulla.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
              <a
                href="#"
                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Get started
              </a>
              <a href="#" className="text-sm font-semibold leading-6 text-white">
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div> */}
    </div> 
  );
}

export default LandingPage;
