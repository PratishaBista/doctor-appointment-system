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
    const getPatientDetails = async (appointmentId) => {
        try {
            const { data } = await axios.post(
                `${backendUrl}/api/doctor/get-appointment-details`,
                { appointmentId },
                { headers: { doctor_token } }
            );
            if (data.success) {
                return {
                    appointment: data.appointment,
                    patient: data.patient
                };
            } else {
                toast.error(data.message);
                return null;
            }
        } catch (error) {
            console.error("Error fetching patient details:", error);
            toast.error(error.message);
            return null;
        }
    };

    const requestLabTest = async (appointmentId, tests) => {
        try {
            const { data } = await axios.post(
                `${backendUrl}/api/doctor/request-lab-test`,
                { appointmentId, tests },
                { headers: { doctor_token } }
            );

            if (data.success) {
                toast.success(data.message);
                return data.appointment;
            } else {
                toast.error(data.message);
                throw new Error(data.message);
            }
        } catch (error) {
            console.error("Error requesting lab tests:", error);
            toast.error(error.response?.data?.message || "Failed to request lab tests");
            throw error;
        }
    };

    const addDoctorNotes = async (appointmentId, notes) => {
        try {
            const { data } = await axios.post(
                `${backendUrl}/api/doctor/add-notes`,
                { appointmentId, notes },
                { headers: { doctor_token } }
            );

            if (data.success) {
                toast.success(data.message);
                return data.appointment; 
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            console.error("Error adding doctor notes:", error);
            toast.error(error.response?.data?.message || "Failed to save notes");
            throw error;
        }
    };

    const markFollowUp = async (appointmentId) => {
        try {
            const { data } = await axios.post(
                `${backendUrl}/api/doctor/mark-followup`,
                { appointmentId },
                { headers: { doctor_token } }
            );

            if (data.success) {
                toast.success(data.message);
                return data.data;
            } else {
                throw new Error(data.message);
            }

        } catch (error) {
            console.error("API Error Details:", {
                error: error.message,
                response: error.response?.data
            });

            throw new Error(
                error.response?.data?.message ||
                error.response?.data?.systemMessage ||
                "Failed to update follow-up status"
            );
        }
    };

    const getPatientLabReports = async (patientId) => {
        try {
            const { data } = await axios.get(
                `${backendUrl}/api/doctor/patient-lab-reports/${patientId}`,
                { headers: { doctor_token } }
            );

            if (data.success) {
                return data.reports;
            } else {
                toast.error(data.message);
                return [];
            }
        } catch (error) {
            console.error("Error fetching lab reports:", error);
            toast.error("Failed to load lab reports");
            return [];
        }
    };

    const updatePrescription = async (appointmentId, prescription) => {
        try {
            const { data } = await axios.post(
                `${backendUrl}/api/doctor/update-prescription`,
                { appointmentId, prescription },
                { headers: { doctor_token } }
            );

            if (data.success) {
                toast.success("Prescription updated successfully");
                return data.appointment;
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            console.error("Error updating prescription:", error);
            toast.error(error.response?.data?.message || "Failed to update prescription");
            throw error;
        }
    };


    const value = {
        doctor_token, setDoctorToken, getDoctorData, doctorData, setDoctorData, updatePrescription,
        backendUrl, getAppointments, setAppointments, appointments, completeAppointment, getDashboardData, dashboardData, setDashboardData, getPatientDetails, requestLabTest, addDoctorNotes, markFollowUp, getPatientLabReports
    };

    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    );
}

export default DoctorContextProvider;