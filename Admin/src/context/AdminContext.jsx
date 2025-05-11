import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {
  const [admin_token, setAdminToken] = useState(localStorage.getItem("admin_token") || '');
  const [doctors, setDoctors] = useState([]);
  const [pathologists, setPathologists] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [dashData, setDashData] = useState(false);

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

  const getAllPathologists = async () => {
    try {
        const { data } = await axios.get(backendUrl + "/api/admin/pathologists", { headers: { admin_token } });

        if (data.success) {
            setPathologists(data.data);  
            console.log("Pathologists data:", data.data);  
        } else {
            toast.error(data.message);
        }

    } catch (error) {
        toast.error(error.message);
    }
}


  const changeAvailability = async (docId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/change-availability",
        { docId },
        {
          headers: {
            admin_token,
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        getAllDoctors();
      } else {
        toast.error(data.message);
      }

    } catch (error) {
      toast.error(error.message);
    }
  }

  const getAllAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/admin/appointments", { headers: { admin_token } })

      if (data.success) {
        setAppointments(data.appointments);
        console.log("Appointments data:", data.appointments);
      }
      else {
        toast.error(data.message);
      }

    } catch (error) {
      toast.error(error.message);
    }
  }

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/cancel-appointment",
        { appointmentId },
        {
          headers: {
            admin_token,
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        getAllAppointments();
      } else {
        toast.error(data.message);
      }

    } catch (error) {
      toast.error(error.message);
    }
  }

  const getDashboardData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/admin/dashboard", { headers: { admin_token } });

      if (data.success) {
        setDashData(data.dashData);
        console.log("Dashboard data:", data.dashData);
      }

    } catch (error) {
      toast.error(error.message);
    }
  }

  const value = {
    admin_token,
    dashData,
    setAdminToken,
    getAllPathologists,
    pathologists,
    setPathologists,
    backendUrl,
    doctors, getAllDoctors, changeAvailability,
    appointments, setAppointments, getAllAppointments, cancelAppointment, getDashboardData,
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
