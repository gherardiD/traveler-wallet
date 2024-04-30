import {
    createContext,
    useContext,
    useEffect,
    useReducer,
  } from "react";
  import Axios from "../api/Axios";

const ExpensesContext = createContext();

const initialState = {
    expenses: [],
    isLoading: false,
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
            };
        case "EXPENSE/DELETED":
            return {
                ...state,
                expenses: state.expenses.filter((expense) => expense._id !== action.payload),
                isLoading: false,
            };
        case "REJECTED":
            return { ...state, error: action.payload, isLoading: false };
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}

function ExpensesProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { expenses, isLoading, error } = state;

    const token = localStorage.getItem("token");

    useEffect(() => {
        async function fetchExpenses() {
            if (!token) return;
            dispatch({ type: "LOADING" });
            try {
                const response = await Axios.get("/expenses", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                dispatch({ type: "EXPENSES/LOADED", payload: response.data });
            } catch (error) {
                dispatch({ type: "REJECTED", payload: error });
            }
        }

        fetchExpenses();
    }, [token]);

    async function createExpense(expense) {
        dispatch({ type: "LOADING" });
        try {
            const response = await Axios.post("/expenses", expense, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            dispatch({ type: "EXPENSE/CREATED", payload: response.data });
        } catch (error) {
            dispatch({ type: "REJECTED", payload: error });
        }
    }

    async function deleteExpense(id) {
        dispatch({ type: "LOADING" });
        try {
            await Axios.delete(`/expenses/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            dispatch({ type: "EXPENSE/DELETED", payload: id });
        } catch (error) {
            dispatch({ type: "REJECTED", payload: error });
        }
    }

    return (
        <ExpensesContext.Provider value={{ expenses, isLoading, error, createExpense, deleteExpense }}>
            {children}
        </ExpensesContext.Provider>
    );
}