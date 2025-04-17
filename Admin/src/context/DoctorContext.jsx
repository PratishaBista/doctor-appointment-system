import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [doctor_token, setDoctorToken] = useState(localStorage.getItem("doctor_token") || null);

    const [appointments, setAppointments] = useState([]);
    const [dashboardData, setDashboardData] = useState(false);
    const [doctorData, setDoctorData] = useState(false);

    const getAppointments = async () => {
        try {
            const { data } = await axios.get(
                backendUrl + "/api/doctor/appointments", {
                headers: {
                    doctor_token
                },
            });
            if (data.success) {
                setAppointments(data.appointments);
                console.log("Appointments data:", data.appointments);

            } else {
                toast.error(data.message);
            }

        } catch (error) {
            console.log("Error fetching appointments:", error);
            toast.error(error.message);
        }
    }

    const completeAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendUrl + "/api/doctor/appointment-complete", { appointmentId }, { headers: { doctor_token } });
            if (data.success) {
                toast.success(data.message);
                getAppointments();
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            toast.error(error.message);
        }
    }


    const getDashboardData = async () => {

        try {
            const { data } = await axios.get(backendUrl + "/api/doctor/dashboard", { headers: { doctor_token } });

            if (data.success) {
                setDashboardData(data.dashboardData);
                console.log("Dashboard data:", data.dashboardData);

            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log("Error fetching dashboard data:", error);
            toast.error(error.message);
        }

    }

    const getDoctorData = async () => {
        try {

            const { data } = await axios.get(backendUrl + "/api/doctor/profile", { headers: { doctor_token } });

            if (data.success) {
                setDoctorData(data.doctorData);
                console.log("Profile data:", data.doctorData);
            }
        } catch (error) {
            console.log("Error fetching profile data:", error);
            toast.error(error.message);
        }

    }
    const value = {
        doctor_token, setDoctorToken, getDoctorData, doctorData, setDoctorData,
        backendUrl, getAppointments, setAppointments, appointments, completeAppointment, getDashboardData, dashboardData, setDashboardData,
    };

    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    );
}

export default DoctorContextProvider;