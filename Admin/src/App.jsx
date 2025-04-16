import { Route, Routes, useLocation } from "react-router-dom";
import AdminHome from "./AdminMain/AdminHome";
import AdminLogin from "./AdminMain/AdminLogin";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, useContext } from "react";
import { AdminContext } from "./context/adminContext";


const App = () => {
  const { admin_token } = useContext(AdminContext);

  useEffect(() => {
  }, [admin_token]);

  return admin_token ? (
    <>
      <div>
        <ToastContainer />
        <AdminHome />
      </div>
    </>
  ) : (
    <>
      <AdminLogin />
      <ToastContainer />
    </>
  );
};

export default App;
