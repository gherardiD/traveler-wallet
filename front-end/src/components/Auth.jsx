// import Login from "./components/Login";
// import Footer from "./components/Footer";

import { useState } from "react";
import SignUp from "./auth/Signup";
import Login from "./auth/Login";
import ForgotPassword from "./auth/ForgotPassword";
import ResetPassword from "./auth/ResetPassword";

function Auth() {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignUpForm, setShowSignUpForm] = useState(true);
  const [showForgotPasswordForm, setShowForgotPasswordForm] = useState(false);
  const [showResetPasswordForm, setShowResetPasswordForm] = useState(false);

  const handleShowLoginForm = () => {
    setShowLoginForm(true);
    setShowSignUpForm(false);
    setShowForgotPasswordForm(false);
    setShowResetPasswordForm(false);
  };

  const handleShowSignUpForm = () => {
    setShowLoginForm(false);
    setShowSignUpForm(true);
    // setShowResetPasswordForm(false);
  };

  const handleShowForgotPasswordForm = () => {
    setShowForgotPasswordForm(true);
    setShowLoginForm(false);
    // setShowSignUpForm(false);
  };

  const handleShowResetPasswordForm = () => {
    setShowResetPasswordForm(true);
    setShowForgotPasswordForm(false);
    // setShowSignUpForm(false);
  };

  return (
    <div className="bg-neutral-400 w-full overflow-hidden flex h-screen ">
      {showSignUpForm && <SignUp showLogin={handleShowLoginForm} />}
      {showLoginForm && (
        <Login
          showSignup={handleShowSignUpForm}
          showForgotPassword={handleShowForgotPasswordForm}
        />
      )}
      {showForgotPasswordForm && (
        <ForgotPassword
          showResetPassword={handleShowResetPasswordForm}
          showLogin={handleShowLoginForm}
        />
      )}
      {showResetPasswordForm && (
        <ResetPassword showLogin={handleShowLoginForm} />
      )}
    </div>
  );
}

export default Auth;
