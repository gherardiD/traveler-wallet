/* eslint-disable react/prop-types */
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";
import Axios from "../api/Axios";

const BASE_URL = "http://localhost:3000";

const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "LOADING":
      return { ...state, isLoading: true };
    case "CITIES/LOADED":
      return { ...state, cities: action.payload, isLoading: false };
    case "CITY/LOADED":
      return { ...state, currentCity: action.payload, isLoading: false };
    case "CITY/CREATED":
      return {
        ...state,
        cities: [...state.cities, action.payload],
        isLoading: false,
        currentCity: action.payload,
      };
    case "CITY/DELETED":
      return {
        ...state,
        cities: state.cities.filter((city) => city._id !== action.payload),
        isLoading: false,
        currentCity: {},
      };
    case "REJECTED":
      return { ...state, error: action.payload, isLoading: false };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

function CitiesProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { cities, isLoading, currentCity, error } = state;
  // const [cities, setCities] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [currentCity, setCurrentCity] = useState({});
  const token = localStorage.getItem("token");


  useEffect(() => {
    async function fetchCities() {
      dispatch({ type: "LOADING" });
      try {
        // const res = await fetch(`${BASE_URL}/cities`);
        const response = await Axios.get("/cities", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("response", response);
        dispatch({ type: "CITIES/LOADED", payload: response.data.cities });
      } catch {
        dispatch({
          type: "REJECTED",
          payload: "There was an error loading data...",
        });
      }
    }

    fetchCities();
  }, []);

  async function getCityById(id) {
    if (id == currentCity._id) return;
    dispatch({ type: "LOADING" });
    try {
      const response = await Axios.get(`/cities/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: "CITY/LOADED", payload: response.data.city });
    } catch {
      dispatch({
        type: "REJECTED",
        payload: "There was an error loading data...",
      });
    }
  }

  async function createCity(newCity) {
    dispatch({ type: "LOADING" });
    try {
      const response = await Axios.post("/cities", newCity, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: "CITY/CREATED", payload: response.data.newCity });
    } catch {
      dispatch({
        type: "REJECTED",
        payload: "There was an error creating data...",
      });
    }
  }

  async function deleteCity(id) {
    dispatch({ type: "LOADING" });
    try {
      await Axios.delete(`/cities/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: "CITY/DELETED", payload: id });
    } catch {
      dispatch({
        type: "REJECTED",
        payload: "There was an error deleting data...",
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCityById,
        createCity,
        deleteCity,
        error,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (!context) {
    throw new Error("useCities must be used within a CitiesProvider");
  }
  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { CitiesProvider, useCities };
