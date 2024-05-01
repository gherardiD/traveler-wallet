import { createContext, useContext, useEffect, useReducer } from "react";
import Axios from "../api/Axios";
import { useParams } from "react-router-dom";

const ExpensesContext = createContext();

const initialState = {
  expenses: [],
  isLoading: false,
  currentExpense: {},
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "LOADING":
      return { ...state, isLoading: true };
    case "EXPENSES/LOADED":
      return { ...state, expenses: action.payload, isLoading: false };
    case "EXPENSE/CREATED":
      return {
        ...state,
        expenses: [...state.expenses, action.payload],
        isLoading: false,
        currentExpense: action.payload,
      };
    case "EXPENSE/UPDATED":
      return {
        ...state,
        expenses: state.expenses.map((expense) =>
          expense._id === action.payload._id ? action.payload : expense
        ),
        isLoading: false,
        currentExpense: action.payload,
      };
    case "EXPENSE/DELETED":
      return {
        ...state,
        expenses: state.expenses.filter(
          (expense) => expense._id !== action.payload
        ),
        isLoading: false,
        currentExpense: {},
      };
    case "EXPENSE/SET_CURRENT":
      return { ...state, currentExpense: action.payload };
    case "REJECTED":
      return { ...state, error: action.payload, isLoading: false };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

// eslint-disable-next-line react/prop-types
function ExpensesProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { expenses, isLoading, error, currentExpense } = state;
  const { id } = useParams();

  const token = localStorage.getItem("token");

  useEffect(() => {
    async function fetchExpenses() {
      if (!token) return;
      dispatch({ type: "LOADING" });
      try {
        const response = await Axios.get(`/cities/${id}/expenses`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch({ type: "EXPENSES/LOADED", payload: response.data.expenses });
      } catch (error) {
        dispatch({ type: "REJECTED", payload: error });
      }
    }

    fetchExpenses();
  }, [id, token]);

  async function createExpense(expense) {
    dispatch({ type: "LOADING" });
    try {
      const response = await Axios.post(`/cities/${id}/expenses`, expense, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: "EXPENSE/CREATED", payload: response.data.newExpense });
    } catch (error) {
      dispatch({ type: "REJECTED", payload: error });
    }
  }

  async function updateExpense(expense) {
    dispatch({ type: "LOADING" });
    try {
      const response = await Axios.patch(
        `/cities/${id}/expenses/${currentExpense._id}`,
        expense,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({
        type: "EXPENSE/UPDATED",
        payload: response.data.updatedExpense,
      });
    } catch (error) {
      dispatch({ type: "REJECTED", payload: error });
    }
  }

  async function deleteExpense(expenseId) {
    dispatch({ type: "LOADING" });
    try {
      await Axios.delete(`/cities/${id}/expenses/${expenseId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: "EXPENSE/DELETED", payload: expenseId });
    } catch (error) {
      dispatch({ type: "REJECTED", payload: error });
    }
  }

  function setCurrentExpense(id) {
    const currentExpense = expenses.find((expense) => expense._id === id);
    dispatch({ type: "EXPENSE/SET_CURRENT", payload: currentExpense });
  }

  return (
    <ExpensesContext.Provider
      value={{
        expenses,
        isLoading,
        error,
        currentExpense,
        setCurrentExpense,
        createExpense,
        updateExpense,
        deleteExpense,
      }}
    >
      {children}
    </ExpensesContext.Provider>
  );
}

function useExpenses() {
  const context = useContext(ExpensesContext);
  if (!context) {
    throw new Error("useExpenses must be used within a ExpensesProvider");
  }
  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { ExpensesProvider, useExpenses };
