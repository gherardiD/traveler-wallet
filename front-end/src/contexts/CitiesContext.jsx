/* eslint-disable react/prop-types */
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";

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
        cities: state.cities.filter((city) => city.id !== action.payload),
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

  useEffect(() => {
    async function fetchCities() {
      dispatch({ type: "LOADING" });
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        dispatch({ type: "CITIES/LOADED", payload: data });
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
    if (id == currentCity.id) return;
    dispatch({ type: "LOADING" });
    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      dispatch({ type: "CITY/LOADED", payload: data });
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
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCity),
      });
      const data = await res.json();
      dispatch({ type: "CITY/CREATED", payload: data });
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
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
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
