/* eslint-disable react/prop-types */
import { createContext, useContext, useReducer } from "react";
import Axios from "../api/Axios";

const AuthContext = createContext();

const initialState = {
  // todo add error state
  isAuthenticated: sessionStorage.getItem("isAuthenticated") || false,
  user: {},
  isLoading: false,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "LOADING":
      return { ...state, isLoading: true, error: null };
    case "LOGIN":
      sessionStorage.setItem("isAuthenticated", true);
      sessionStorage.setItem("firstName", action.payload.user.firstName);

      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload.user,
        error: null,
      };
    case "SIGNUP":
      return { ...state, isLoading: false };
    case "LOGOUT":
      sessionStorage.removeItem("isAuthenticated");
      localStorage.removeItem("token");
      return { ...state, isAuthenticated: false, user: null, error: null };
    case "REJECTED":
      return { ...state, error: action.payload, isLoading: false };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { isAuthenticated, user, isLoading, error } = state;

  // useEffect(() => {
  //   if (!isAuthenticated) dispatch({ type: "LOGOUT" });
    
  //   const token = localStorage.getItem("token");
  //   if (!token) dispatch({ type: "LOGOUT" });
    
  //   if(user) return;

  //   dispatch({ type: "LOADING" });
  //   Axios.get("/users/me", {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   })
  //     .then((response) => {
  //       dispatch({ type: "LOGIN", payload: { token, user: response.data.user } });
  //     })
  //     .catch((error) => {
  //       dispatch({ type: "REJECTED", payload: error.message });
  //     });
  // }, []);

  async function login(formData) {
    dispatch({ type: "LOADING" });
    try {
      const response = await Axios.post("/users/login", formData);
      console.log("response", response);
      const payload = { token: response.data.token, user: response.data.user };
      dispatch({ type: "LOGIN", payload: payload });
    } catch (error) {
      dispatch({ type: "REJECTED", payload: error.message });
    }
  }

  function logout() {
    dispatch({ type: "LOGOUT" });
  }

  async function signUp(formData) {
    dispatch({ type: "LOADING" });
    try {
      const response = await Axios.post("/users/signup", formData);
      console.log("response", response);
      dispatch({ type: "SIGNUP" });
    } catch (error) {
      dispatch({ type: "REJECTED", payload: error.message });
    }
  }

  async function confirmEmail(token) {
    dispatch({ type: "LOADING" });
    try {
      const response = await Axios.get(`/users/confirm-email/${token}`);
      console.log("response", response);
      const payload = { token: response.data.token, user: response.data.user };
      dispatch({ type: "LOGIN", payload: payload });
    } catch (error) {
      dispatch({ type: "REJECTED", payload: error.message });
    }
  }

  return (
    // <AuthContext.Provider value={{ isAuthenticated, user, dispatch }}>
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        isLoading,
        error,
        login,
        logout,
        signUp,
        confirmEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { AuthProvider, useAuth };
