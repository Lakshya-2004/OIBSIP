import {
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/layout/Navbar";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import CustomPizza from "../pages/CustomPizza";
import Cart from "../pages/Cart";
import Orders from "../pages/Orders";
import AdminDashboard from "../pages/AdminDashboard";
import Inventory from "../pages/Inventory";
import ForgotPassword from "../pages/ForgotPassword";
import VerifyEmail from "../pages/VerifyEmail";
import NotFound from "../pages/NotFound";
import Menu from "../pages/Menu";
import AdminOffers from "../pages/AdminOffers";
import FeatureAdmin from "../pages/FeatureAdmin";
import ResetPassword from "../pages/ResetPassword";
import RawStockPage from "../pages/RawStockPage"
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";

function AppRoutes() {
  const location =
    useLocation();

  const hideRoutes = [
    "/reset-password",
    "/login",
    "/register",
  ];

  const shouldHide =
    hideRoutes.some(
      (route) =>
        location.pathname.startsWith(
          route
        )
    );

  return (
    <>
      {!shouldHide && (
        <Navbar />
      )}

      <Routes>
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/forgot-password"
          element={
            <ForgotPassword />
          }
        />

        <Route
          path="/verify-email"
          element={<VerifyEmail />}
        />

        <Route
          path="/reset-password/:token"
          element={
            <ResetPassword />
          }
        />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/custom-pizza"
          element={
            <PrivateRoute>
              <CustomPizza />
            </PrivateRoute>
          }
        />

        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <PrivateRoute>
              <Orders />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/raw-products"
          element={
            <AdminRoute>
              <RawStockPage />
            </AdminRoute>
          }
        />

        <Route
          path="/admin-offers"
          element={
            <AdminRoute>
              <AdminOffers />
            </AdminRoute>
          }
        />

        <Route
          path="/trend"
          element={
            <AdminRoute>
              <FeatureAdmin />
            </AdminRoute>
          }
        />

        <Route
          path="/inventory"
          element={
            <AdminRoute>
              <Inventory />
            </AdminRoute>
          }
        />

        <Route
          path="/menu"
          element={<Menu />}
        />

        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default AppRoutes;