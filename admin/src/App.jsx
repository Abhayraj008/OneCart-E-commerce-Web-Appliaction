import React, { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Add from "./pages/Add";
import Lists from "./pages/Lists";
import Orders from "./pages/Orders";
import Login from "./pages/Login";
import EditProduct from "./pages/EditProduct"; // ✅ NEW

import { adminDataContext } from "./context/AdminContext";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {

  const { adminData } = useContext(adminDataContext);

  // 🔒 Protected Route Wrapper
  const ProtectedRoute = ({ children }) => {
    return adminData ? children : <Navigate to="/login" replace />;
  };

  return (
    <>
      {/* 🔔 Toast Notifications */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        theme="dark"
      />

      <Routes>

        {/* 🔓 PUBLIC ROUTE */}
        <Route
          path="/login"
          element={!adminData ? <Login /> : <Navigate to="/" replace />}
        />

        {/* 🔒 PROTECTED ROUTES */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add"
          element={
            <ProtectedRoute>
              <Add />
            </ProtectedRoute>
          }
        />

        <Route
          path="/lists"
          element={
            <ProtectedRoute>
              <Lists />
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />

        {/* ✏️ EDIT PRODUCT (NEW) */}
        <Route
          path="/edit/:id"
          element={
            <ProtectedRoute>
              <EditProduct />
            </ProtectedRoute>
          }
        />

        {/* ❌ UNKNOWN ROUTE */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </>
  );
}

export default App;