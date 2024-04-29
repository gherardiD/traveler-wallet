/* eslint-disable react/prop-types */
import {useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";


function ConfirmEmail() {
  const { ConfirmEmail, isAuthenticated } = useAuth();
  const params = useParams();
  const token = params.emailToken;

  // ! FIND A WAY TO RUN USEEFFECT JUST ONCE
  useEffect(() => {
    ConfirmEmail(token);
  }, [token]);

  return (
    <div className="container bg-white p-8 rounded shadow-md w-1/3 h-auto text-center m-auto">
      {isAuthenticated ? "Email confirmed" : "Email not confirmed"}
    </div>
  );
}

export default ConfirmEmail;
