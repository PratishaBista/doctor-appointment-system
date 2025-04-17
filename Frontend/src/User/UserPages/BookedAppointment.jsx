import { motion } from "framer-motion";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const BookedAppointment = () => {
  const { backendUrl, token, daysOfWeek, months, getDoctorsData } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    if (!token) {
      toast.warn("Please login to view your appointments.");
      return;
    }

    try {
      const { data } = await axios.get(`${backendUrl}/api/user/appointments`, {
        headers: { token },
      });

      if (data.success) {
        setAppointments(data.appointments.reverse() || []);
        console.log("Appointments data:", data.appointments);
      } else {
        toast.error(data.message || "Failed to fetch appointments");
      }
    } catch (error) {
      toast.error("Error fetching appointments");
      console.log(error);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/cancel-appointment`, {
        appointmentId
      }, {
        headers: { token }
      })
      console.log("Cancelling appointment with ID:", appointmentId);
      if (data.success) {
        toast.success("Appointment cancelled successfully");
        fetchAppointments();
        getDoctorsData();
        console.log("Appointment cancelled:", data.message);
      } else {
        toast.error(data.message)
      }


    } catch (error) {
      toast.error("Error cancelling appointment");
      console.log(error);
    }

  }

  useEffect(() => {
    if (token) {
      fetchAppointments();
    }
  }, [token]);

  return (
    <div className="min-h-screen flex flex-col items-center p-6 bg-gray-100">
      <motion.h1
        className="text-3xl font-bold text-gray-800 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Your Booked Appointments
      </motion.h1>

      {appointments.length === 0 ? (
        <motion.p
          className="text-gray-500 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          No appointments booked yet.
        </motion.p>
      ) : (
        <div className="mt-6 w-full max-w-4xl space-y-6">
          {appointments.map((doctor) => {
            const slotDate = doctor.slotDate;
            const dateParts = slotDate.split("-");
            const day = parseInt(dateParts[0]);
            const month = parseInt(dateParts[1]) - 1;

            return (
              <motion.div
                key={doctor._id}
                className="bg-white p-8 rounded-2xl shadow-lg flex flex-col md:flex-row gap-8 w-full"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                {/* Doctor Image */}
                <img
                  src={doctor.doctorData.image}
                  alt={doctor.doctorData.name}
                  className="w-28 h-28 rounded-lg shadow-md object-cover"
                />

                {/* Doctor Info Section */}
                <div className="flex-1 flex flex-col gap-2">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {doctor.doctorData.name}
                  </h2>
                  <p className="text-gray-600 text-sm">
                    {doctor.doctorData.speciality}
                  </p>
                  <p className="text-gray-600 text-sm font-medium">
                    Fee: Rs {doctor.doctorData.fees}
                  </p>
                  <div className="mt-2 space-y-1">
                    <h3 className="text-gray-800 font-semibold text-sm">Address</h3>
                    <p className="text-gray-600 text-sm">
                      {doctor.doctorData.address?.line1}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {doctor.doctorData.address?.line2}
                    </p>
                  </div>
                </div>

                {/* Appointment Time Section */}
                <div className="text-left min-w-[180px] space-y-2">
                  <h3 className="text-gray-800 font-semibold">Appointment</h3>
                  <p className="text-lg font-bold text-[#146A5D]">
                    {doctor.slotDate}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {
                      daysOfWeek[
                      new Date(`${slotDate.split("-").reverse().join("-")}`).getDay()
                      ]
                    }, {months[month]}
                  </p>
                  <p className="text-gray-700 text-sm">
                    Time: {doctor.slotTime}
                  </p>
                </div>




                {/* Action Buttons Section */}
                <div className="flex flex-col items-center gap-10 min-w-[200px]">
                  {doctor.cancelled ? (
                    <motion.button
                      className="bg-transparent border-2 border-[#ba3737] text-[#ba3737] py-2 px-4 rounded-md text-sm"
                    >
                      Appointment Cancelled
                    </motion.button>
                  ) : (
                    <>
                      <div className="text-center">
                        <h4 className="text-gray-800 font-semibold mb-2 text-sm">
                          Choose Payment
                        </h4>
                        <div className="flex gap-4">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            className="bg-transparent border-2 border-[#146A5D] text-[#146A5D] transition-transform py-2 px-4 rounded-md cursor-pointer text-sm"
                          >
                            Cash
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            className="bg-transparent border-2 border-[#146A5D] text-[#146A5D] transition-transform py-2 px-4 rounded-md cursor-pointer text-sm"
                          >
                            Online
                          </motion.button>
                        </div>
                      </div>

                      <motion.button
                        className="bg-transparent border-2 border-[#ba3737] text-[#ba3737] transition-transform py-2 px-4 rounded-md cursor-pointer text-sm"
                        onClick={() => cancelAppointment(doctor._id)}
                        whileHover={{ scale: 1.05 }}
                      >
                        Cancel Appointment
                      </motion.button>
                    </>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>

  )
};

export default BookedAppointment;
