import { Route, Routes, Navigate } from "react-router-dom";
import AdminHome from "./AdminMain/AdminHome";
import Login from "./AdminMain/Login";
import ForgotPassword from "./AdminMain/ForgotPassword";
import ResetPassword from "./AdminMain/ResetPassword";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import React, { useContext } from "react";
import { AdminContext } from "./context/AdminContext";
import { DoctorContext } from "./context/DoctorContext";
import DoctorHome from "./doctor/DoctorHome";

const App = () => {
  const { admin_token } = useContext(AdminContext);
  const { doctor_token } = useContext(DoctorContext);

  return (
    <>
      <ToastContainer />
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Admin Protected Routes */}
        <Route
          path="/admin/*"
          element={admin_token ? <AdminHome /> : <Navigate to="/login" replace />}
        />

        {/* Doctor Protected Routes */}
        <Route
          path="/doctor/*"
          element={doctor_token ? <DoctorHome /> : <Navigate to="/login" replace />}
        />

        {/* Default Redirect */}
        <Route
          path="*"
          element={
            admin_token ? <Navigate to="/admin/dashboard" replace /> :
              doctor_token ? <Navigate to="/doctor/dashboard" replace /> :
                <Navigate to="/login" replace />
          }
        />
      </Routes>
    </>
  );
};

export default App;
