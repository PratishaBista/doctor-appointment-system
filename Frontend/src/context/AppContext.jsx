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
        status:false
        
    },{
        header:"head 2",
        body:"body2 Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio dolore quae obcaecati cumque id dicta natus, quidem exercitationem, cum itaque, quisquam assumenda adipisci dignissimos tempore sed voluptas ullam nostrum nobis.",
        status:false
    }])
    const [slotTime, setSlotTime] = useState(null);
    const [slotIndex, setSlotIndex] = useState(0);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState(null);
    const shortMonths = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    const [esewaId, setEsewaId]=useState('')
    const [esewaPassword, setEsewaPassword]=useState('')

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];


    const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    const [checked, setChecked] = useState(false);
    const [loading, setLoading] = useState(false);
    const [verified, setVerified] = useState(false);
     const defaultImage = "data:image/png;base64,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";

    const value = {
        token, setToken,
        backendUrl,
        loadUserProfileData,
        doctors, getDoctorsData,
        selectedSpecialty, setSelectedSpecialty, account, setAccount,
        slotTime, setSlotTime,
        slotIndex, setSlotIndex,
        daysOfWeek,
        selectedDate, setSelectedDate,
        selectedMonth, setSelectedMonth,
        shortMonths, months,
        notifications, setNotifications,
        verified, setVerified ,loading, setLoading,checked, setChecked,
        defaultImage,esewaId, setEsewaId, esewaPassword, setEsewaPassword,

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