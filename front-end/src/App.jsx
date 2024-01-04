// import Login from "./components/Login";
// import Footer from "./components/Footer";

import { useState } from "react";
import SignUp from "./components/Signup";
import Login from "./components/Login";

function App() {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignUpForm, setShowSignUpForm] = useState(true);

  const handleShowLoginForm = () => {
    setShowLoginForm(true);
    setShowSignUpForm(false);
  };

  const handleShowSignUpForm = () => {
    setShowLoginForm(false);
    setShowSignUpForm(true);
  };
  return (
    <div className="bg-neutral-400 w-full overflow-hidden flex h-screen ">
      {showSignUpForm && <SignUp showLogin={handleShowLoginForm} />}
      {showLoginForm && <Login showSignup={handleShowSignUpForm} />}
    </div>
  );
}

export default App;
