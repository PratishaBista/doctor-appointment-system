import axios from "axios";
import { createContext, useEffect, useState } from "react";
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
    const [notifications, setNotifications] = useState([{
        header:"head 1 is the head until head",
        body:"lorem sdnckasnf sfonvskld lskadmlad asldkmalda, d'laskmas alakssca'l see more",
        
    },{
        header:"head 2",
        body:"body2 Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio dolore quae obcaecati cumque id dicta natus, quidem exercitationem, cum itaque, quisquam assumenda adipisci dignissimos tempore sed voluptas ullam nostrum nobis."
    }])
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
        userData, setUserData,
        loadUserProfileData,
        doctors, getDoctorsData,
        selectedSpecialty, setSelectedSpecialty, account, setAccount,
        slotTime, setSlotTime,
        slotIndex, setSlotIndex,
        daysOfWeek,
        selectedDate, setSelectedDate,
        selectedMonth, setSelectedMonth,
        shortMonths, months,
        notifications, setNotifications

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