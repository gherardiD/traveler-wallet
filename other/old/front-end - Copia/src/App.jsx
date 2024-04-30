import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
import Movements from "./pages/Movements";
import Currencies from "./pages/Currencies";
import Account from "./pages/Account";
import ConfirmEmail from "./pages/auth/ConfirmEmail";
import AccountOptions from "./components/account/AccountOptions";
import DeletePopUp from "./components/account/DeletePopUp";
import UpdatePasswordForm from "./components/account/UpdatePasswordForm";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div className=" w-full flex h-screen ">
      <Router>
        <Routes>
          {/* AUTH */}
          <Route index element={<LandingPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/confirm-email/:token" element={<ConfirmEmail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          {/* APP */}
          <Route path="/app/home" element={<Home />} />
          <Route path="/app/movements" element={<Movements />} />
          <Route path="/app/currencies" element={<Currencies />} />
          <Route path="/app/account" element={<Account />}>
            <Route path="options" element={<AccountOptions />} />
            <Route path="delete" element={<DeletePopUp />} />
            <Route path="update-password" element={<UpdatePasswordForm />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;