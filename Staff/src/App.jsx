import { Route, Routes, Navigate } from "react-router-dom";
import AdminHome from "./main/AdminHome";
import Login from "./main/Login";
import ForgotPassword from "./main/ForgotPassword";
import ResetPassword from "./main/ResetPassword";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import React, { useContext } from "react";
import { AdminContext } from "./context/AdminContext";
import { DoctorContext } from "./context/DoctorContext";
import { PathologistContext } from "./context/PathologistContext";
import DoctorHome from "./doctor/DoctorHome";
import PathologistHome from "./pathologist/PathologistHome";

const App = () => {
  const { admin_token } = useContext(AdminContext);
  const { doctor_token } = useContext(DoctorContext);
  const { pathologist_token } = useContext(PathologistContext);

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

        {/* Pathologist Protected Routes */}
        <Route
          path="/pathologist/*"
          element={pathologist_token ? <PathologistHome /> : <Navigate to="/login" replace />}
        />

        {/* Default Redirect */}
        <Route
          path="*"
          element={
            admin_token ? <Navigate to="/admin/dashboard" replace /> :
              doctor_token ? <Navigate to="/doctor/dashboard" replace /> :
                pathologist_token ? <Navigate to="/pathologist/pending-requests" replace /> :
                  <Navigate to="/login" replace />
          }
        />
      </Routes>
    </>
  );
};

export default App;