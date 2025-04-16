import { motion } from "framer-motion";
import React, { useContext, useEffect } from "react";
import { AdminContext } from "../context/adminContext";
import { AppContext } from "../context/AppContext";

const AdminDashboard = () => {
  const {
    admin_token,
    getDashboardData,
    cancelAppointment,
    dashData,
  } = useContext(AdminContext);

  const { formatDate } = useContext(AppContext);

  // const dashData = {
  //   doctors: 5,
  //   appointments: 20,
  //   patients: 50,
  // };

  useEffect(() => {
    if (admin_token) {
      getDashboardData();
    }
  }, [admin_token]);

  return (
    dashData && (
      <div className="min-h-[90vh] w-[80vw] p-6 bg-gray-100 overflow-y-auto">
        {/* Dashboard Summary Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {/* Doctors */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center bg-white shadow-lg rounded-lg p-4 transition flex-col justify-center md:flex-row"
          >
            <img
              className="w-16 h-16"
              src="https://cdn-icons-png.flaticon.com/512/9193/9193824.png"
              alt="Doctors"
            />
            <div className="ml-3 text-center md:text-left">
              <h1 className="text-2xl font-bold text-[#146A5D]">{dashData.doctors}</h1>
              <p className="text-gray-500">Doctors</p>
            </div>
          </motion.div>

          {/* Appointments */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center bg-white shadow-lg rounded-lg p-4 transition flex-col justify-center md:flex-row"
          >
            <img
              className="w-16 h-16"
              src="https://static.vecteezy.com/system/resources/thumbnails/024/150/216/small_2x/calendar-icon-vector.jpg"
              alt="Appointments"
            />
            <div className="ml-3 text-center md:text-left">
              <h1 className="text-2xl font-bold text-[#146A5D]">{dashData.appointments}</h1>
              <p className="text-gray-500">Appointments</p>
            </div>
          </motion.div>

          {/* Patients */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center bg-white shadow-lg rounded-lg p-4 transition flex-col justify-center md:flex-row"
          >
            <img
              className="w-16 h-16"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQx4WPMRwUZHH4CIYhmmhdmOPjBP03sSfRshQ&s"
              alt="Patients"
            />
            <div className="ml-3 text-center md:text-left">
              <h1 className="text-2xl font-bold text-[#146A5D]">{dashData.patients}</h1>
              <p className="text-gray-500">Patients</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Latest Bookings Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex items-center bg-white shadow-2xl p-4 mt-10 rounded-lg"
        >
          <img
            className="h-[70px]"
            src="https://static.vecteezy.com/system/resources/thumbnails/046/720/280/small_2x/booking-icon-line-icon-for-your-website-mobile-presentation-and-logo-design-vector.jpg"
            alt="Bookings"
          />
          <h1 className="text-3xl font-bold ml-4">Latest Bookings</h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-6 w-[95%] mx-auto"
        >
          {dashData.latestAppointments?.length === 0 && (
            <p className="text-gray-600 italic">No recent bookings found.</p>
          )}

          {dashData.latestAppointments?.map((item, index) => (
            <div
              key={index}
              className="mt-4 flex items-center bg-white shadow-md p-4 rounded-lg"
            >
              <img
                className="h-[70px] w-[70px] rounded-full object-cover"
                src={item.doctorData?.image || "https://via.placeholder.com/70"}
                alt="Doctor"
              />
              <div className="ml-4">
                <h1 className="text-lg font-semibold">{item.doctorData?.name}</h1>
                <p className="text-gray-500">
                  Booking on <strong>{formatDate(item.slotDate)}</strong> at{" "}
                  <strong>{item.slotTime}</strong>
                </p>
                <p
                  className={`text-sm font-bold ${item.cancelled ? "text-red-500" : "text-green-600"
                    }`}
                >
                  {item.cancelled ? "Cancelled" : "Booked"}
                </p>
              </div>

              {/* {!item.cancelled && (
                <button
                  onClick={() => cancelAppointment(item._id)}
                  className="ml-auto"
                >
                  <img
                    className="h-[50px]"
                    src="https://media.istockphoto.com/id/1198849693/vector/cancel-icon-flat-illustration-of-cancel-vector-icon-cancel-sign-symbol-on-white-background.jpg?s=612x612&w=0&k=20&c=6vGokNVvNFp_sudDF_tWWDAtFr1L3lh9JtspLxfwh6Q="
                    alt="Cancel"
                  />
                </button>
              )} */}
            </div>
          ))}

        </motion.div>

      </div>
    )
  );
};

export default AdminDashboard;
