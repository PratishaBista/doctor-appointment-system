import { motion } from "framer-motion";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

const BookedAppointment = () => {
  const { docId } = useParams();
  const location = useLocation();
  const receivedDocId = location.state?.docId || docId;

  const [docInfo, setDocInfo] = useState(null);
  const { AllDoctors, slotTime, slotIndex, daysOfWeek, selectedDate, selectedMonth, months } = useContext(AppContext);
  const [allBookedDoctors, setAllBookedDoctors] = useState([]);

  useEffect(() => {
    const foundDoc = AllDoctors.find((doc) => doc.id.toString() === receivedDocId);
    setDocInfo(foundDoc || null);
  }, [receivedDocId, AllDoctors]);

  useEffect(() => {
    const storedBookings = JSON.parse(localStorage.getItem("bookedDoctors")) || [];
    setAllBookedDoctors(storedBookings);
  }, []);

  return (
    <div className="min-h-[76vh] max-h-[77vh] flex flex-col items-center p-6 bg-gray-100 overflow-scroll">
      <motion.h1 
        className="text-3xl font-bold text-gray-800 mb-6" 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
      >
        Your Booked Appointments
      </motion.h1>

      {allBookedDoctors.length === 0 ? (
        <motion.p 
          className="text-gray-500 mt-4" 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 0.5 }}
        >
          No appointments booked yet.
        </motion.p>
      ) : (
        <div className="mt-6 w-full max-w-2xl space-y-6">
          {allBookedDoctors.map((doctor) => (
            <motion.div 
              key={doctor.id} 
              className="bg-white p-6 rounded-2xl shadow-lg flex flex-col md:flex-row items-center gap-6" 
              initial={{ opacity: 0, scale: 0.9 }} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ duration: 0.4 }}
            >
              <img src={doctor.image} alt={doctor.Name} className="w-24 h-24 rounded-full shadow-md" />
              <div className="flex-1">
                <h2 className="text-xl w-[160px] font-semibold text-gray-900">{doctor.Name}</h2>
                <p className="text-gray-600 text-sm">{doctor.Speciality}</p>
                <p className="text-gray-600 text-sm font-medium">Fee: ${doctor.Fees}</p>
                <div className="mt-3">
                  <h3 className="text-gray-800 font-semibold">Address</h3>
                  <p className="text-gray-600 text-sm">{doctor.address.line1}</p>
                  <p className="text-gray-600 text-sm">{doctor.address.line2}</p>
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-gray-800 font-semibold">Appointment Date & Time</h3>
                <p className="text-lg font-bold text-[#146A5D]">{selectedDate}</p>
                <p className="text-gray-600 text-sm">{daysOfWeek[slotIndex]}, {months[selectedMonth]}</p>
                <p className="text-gray-700 text-sm">Time: {slotTime}</p>
              </div>
              <div className="flex gap-4 mt-4 md:mt-0">
                <motion.button 
                  className="bg-[#146A5D] hover:bg-green-900 text-white py-2 px-6 rounded-full shadow-md transition duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Cash
                </motion.button>
                <motion.button 
                  className="bg-[#146A5D] hover:bg-green-900 text-white py-2 px-6 rounded-full shadow-md transition duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Online
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookedAppointment;
