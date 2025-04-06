import { createContext, useState } from "react";

export const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {
  const [admin_token, setAdminToken] = useState(localStorage.getItem("admin_token") || '');
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  console.log("Initial token from localStorage:", localStorage.getItem("admin_token"));
  console.log("Initial token from state:", admin_token);

  const value = {
    admin_token,
    setAdminToken,
    backendUrl,
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
