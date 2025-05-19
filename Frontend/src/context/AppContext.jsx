import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";


export const AppContext = createContext()

const AppContextProvider = (props) => {

    const [doctors, setDoctors] = useState([])

    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [userData, setUserData] = useState(null);


    const getDoctorsData = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/doctor/list`)

            if (data.success) {
                setDoctors(data.doctors)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.error("Error fetching doctors data:", error);
            toast.error(error.message)
        }
    }

    const loadUserProfileData = async () => {
        try {

            const { data } = await axios.get(`${backendUrl}/api/user/get-profile`, {
                headers: { token }
            })
            console.log("User token:", token);
            console.log("Response data:", data);

            if (data.success) {
                setUserData(data.userDetails);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
            console.error("Error response:", error.response);
            toast.error(error.response?.data?.message || error.message);
        }
    }

    const [account, setAccount] = useState(false)

    const [selectedSpecialty, setSelectedSpecialty] = useState({})
    const [slotTime, setSlotTime] = useState(null);
    const [slotIndex, setSlotIndex] = useState(0);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState(null);
    const shortMonths = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];


    const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

    const value = {
        token, setToken,
        backendUrl,
        loadUserProfileData,
        doctors, getDoctorsData,
        selectedSpecialty, setSelectedSpecialty, account, setAccount,
        userData, setUserData,
        slotTime, setSlotTime,
        slotIndex, setSlotIndex,
        daysOfWeek,
        selectedDate, setSelectedDate,
        selectedMonth, setSelectedMonth,
        shortMonths, months,

    }

    useEffect(() => {
        getDoctorsData()
    }, [])


    useEffect(() => {
        if (token) {
            loadUserProfileData()
        } else {
            setUserData(false)
        }
    }, [token])


    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
export default AppContextProvider