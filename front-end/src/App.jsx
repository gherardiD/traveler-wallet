import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./components/auth/Signup";
import Login from "./components/auth/Login";
import ForgotPassword from "./components/auth/ForgotPassword";
import ResetPassword from "./components/auth/ResetPassword";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import Movements from "./components/Movements";
import Currencies from "./components/Currencies";

function App() {
  return (
    <div className="bg-gray-200 w-full flex h-screen ">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route
            path="api/users/resetpassword/:token"
            element={<ResetPassword />}
          />
          <Route path="/app/home" element={<Home />} />
          <Route path="/app/movements" element={<Movements />} />
          <Route path="/app/currencies" element={<Currencies />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
