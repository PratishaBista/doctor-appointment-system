import { createContext } from "react";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {

    const calculateAge = (dob) => {
        if (!dob) return "—";
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    const formatDate = (dateString) => {
        if (!dateString) return "—";

        const [day, month, year] = dateString.split("-");

        const date = new Date(`${year}-${month}-${day}`);

        if (isNaN(date)) return "—";

        return date.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    };

    const getStatus = (appt) => {
        if (appt.cancelled) return "Cancelled";
        if (appt.isApproved) return "Approved";
        return "Pending";
    };

    const value = {
        calculateAge, formatDate, getStatus
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}


export default AppContextProvider;