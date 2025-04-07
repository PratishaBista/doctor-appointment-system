import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {
  const [admin_token, setAdminToken] = useState(localStorage.getItem("admin_token") || '');
  const [doctors, setDoctors] = useState([]);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const getAllDoctors = async () => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/all-doctors",
        {}, 
        {
          headers: {
            admin_token,
          },
        }
      );

      if (data.success) {
        setDoctors(data.doctors);
        console.log("Doctors data:", data.doctors);
      } else {
        toast.error(data.message);
      }

    } catch (error) {
      toast.error(error.message);
    }
  }

  console.log("Initial token from localStorage:", localStorage.getItem("admin_token"));
  console.log("Initial token from state:", admin_token);

  const value = {
    admin_token,
    setAdminToken,
    backendUrl,
    doctors, getAllDoctors
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
