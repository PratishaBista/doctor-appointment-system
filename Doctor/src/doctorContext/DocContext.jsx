import { createContext, useState } from "react";

// Create a Context
export const DocContext = createContext();

const DocContextProvider = (props) => {
  // Define the state inside the provider component
  const [appointments, setAppointments] = useState([
    { id: 1, patient: "Siddhant Shrestha", img: "https://static.vecteezy.com/system/resources/thumbnails/004/607/791/small_2x/man-face-emotive-icon-smiling-male-character-in-blue-shirt-flat-illustration-isolated-on-white-happy-human-psychological-portrait-positive-emotions-user-avatar-for-app-web-design-vector.jpg", age: 30, dateTime: "2025-03-22 10:00 AM", payment: "cash", fees: "$100", status: "Pending" },
    { id: 2, patient: "Ram Bahadur", img: "https://static.vecteezy.com/system/resources/thumbnails/004/607/791/small_2x/man-face-emotive-icon-smiling-male-character-in-blue-shirt-flat-illustration-isolated-on-white-happy-human-psychological-portrait-positive-emotions-user-avatar-for-app-web-design-vector.jpg", age: 28, dateTime: "2025-03-22 11:00 AM", payment: "cash", fees: "$120", status: "Pending" },
  ]);
  
  const [docData, setDocData] = useState({
    name: "Siddhant Shrestha",
    img: "https://cdn-icons-png.flaticon.com/512/9193/9193824.png",
    speciality: "pshycology",
    email: "siddhantshrestha54@gmail.com",
    degree: "MBBS",
    experience:"8 years",
    fee: "120",
    about: "lorem as asn alskdnal alkdsma",
  });

  // Value to pass into the context provider
  const value = {
    appointments,
    setAppointments,
    docData,
    setDocData,
  };

  return (
    // Provide context to children components
    <DocContext.Provider value={value}>
      {props.children}
    </DocContext.Provider>
  );
}

export default DocContextProvider;
