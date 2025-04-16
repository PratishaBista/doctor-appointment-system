import { createContext, useState } from "react";

// Create a Context
export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const { doctor_token, setDoctorToken } = useState(localStorage.getItem("doctor_token") || null);

  const value = {
    doctor_token, setDoctorToken,
    backendUrl,
  };

  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
}

export default DoctorContextProvider;