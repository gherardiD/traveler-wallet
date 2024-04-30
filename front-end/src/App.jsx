import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { CitiesProvider } from "./contexts/CitiesContext";
import { ExpensesProvider } from "./contexts/ExpensesContext";
import { AuthProvider } from "./contexts/AuthContext";

// import HomePage from "./pages/HomePage";
// import Product from "./pages/Product";
// import Pricing from "./pages/Pricing";
// import AppLayout from "./pages/AppLayout";
// import PageNotFound from "./pages/PageNotFound";
// import Login from "./pages/Login";
// import SignUp from "./pages/SignUp";

const HomePage = lazy(() => import("./pages/HomePage"));
const Product = lazy(() => import("./pages/Product"));
const Pricing = lazy(() => import("./pages/Pricing"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const Login = lazy(() => import("./pages/Login"));
const SignUp = lazy(() => import("./pages/SignUp"));

import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import ConfirmEmail from "./pages/ConfirmEmail";
import SpinnerFullPage from "./components/SpinnerFullPage";
import ProtectedRoute from "./pages/ProtectedRoute";
import ExpenseList from "./components/ExpenseList";
import CityLayout from "./components/CityLayout";
import EditCity from "./components/EditCity";
import ExpenseForm from "./components/ExpenseForm";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Suspense fallback={<SpinnerFullPage />}>
          <Routes>
            <Route index element={<HomePage />} />
            <Route path="/product" element={<Product />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/confirm-email/:emailToken"
              element={<ConfirmEmail />}
            />
            <Route
              path="/app"
              element={
                <ProtectedRoute>
                  <CitiesProvider>
                    <AppLayout />
                  </CitiesProvider>
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate replace to={"cities"} />} />
              <Route path="cities" element={<CityList />} />
              <Route
                path="cities/:id"
                element={
                  <ExpensesProvider>
                    <CityLayout />
                  </ExpensesProvider>
                }
              >
                <Route index element={<Navigate replace to={"info"} />} />
                <Route path="info" element={<City />} />
                <Route path="edit" element={<EditCity />} />
                <Route path="expenses" element={<ExpenseList />} />
                <Route path="expenses/form" element={<ExpenseForm />} />
                {/* <Route path="expenses/:id" element={<Expense />} /> */}
                {/* <Route path="expenses/:id/modifica" element={<ExpenseForm />} /> */}
              </Route>
              <Route path="countries" element={<CountryList />} />
              <Route path="form" element={<Form />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Suspense>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
