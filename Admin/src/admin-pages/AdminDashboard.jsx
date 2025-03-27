import { motion } from "framer-motion";
import React, { useState } from "react";

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([
    { id: 1, doctor: "Dr. Aadash Khadka", date: "23 March 2025", status: "Booked" },
    { id: 2, doctor: "Dr. John Doe", date: "24 March 2025", status: "Booked" },
    { id: 3, doctor: "Dr. Jane Smith", date: "25 March 2025", status: "Booked" },
    { id: 4, doctor: "Dr. Emily Johnson", date: "26 March 2025", status: "Booked" },
  ]);

  const handleCancel = (id) => {
    setBookings((prevBookings) =>
      prevBookings.map((booking) =>
        booking.id === id ? { ...booking, status: "Cancelled" } : booking
      )
    );
  };

  return (
    <div className="h-[90vh] w-[80vw] p-6 bg-gray-100">
      {/* Dashboard Summary Cards */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6 }}
        className="grid grid-cols-3 gap-6"
      >
        {/* Doctors Card */}
        <motion.div 
          whileHover={{ scale: 1.05 }} 
          className="flex items-center bg-white shadow-lg rounded-lg p-4 transition flex-col justify-center items-center md:flex-row"
        >
          <img className="w-16 h-16" src="https://cdn-icons-png.flaticon.com/512/9193/9193824.png" alt="Doctors" />
          <div className="ml-3 hidden md:block">
            <h1 className="text-2xl font-bold text-[#146A5D]">20</h1>
            <p className="text-gray-500">Doctors</p>
          </div>
          <h1 className="text-2xl font-bold text-[#146A5D] mt-4 md:hidden">20</h1>
        </motion.div>

        {/* Appointments Card */}
        <motion.div 
          whileHover={{ scale: 1.05 }} 
          className="flex items-center bg-white shadow-lg rounded-lg p-4 transition flex-col justify-center  md:flex-row"
        >
          <img className="w-16 h-16" src="https://static.vecteezy.com/system/resources/thumbnails/024/150/216/small_2x/calendar-icon-vector.jpg" alt="Appointments" />
          <div className="ml-3 hidden md:block">
            <h1 className="text-2xl font-bold text-[#146A5D]">8</h1>
            <p className="text-gray-500">Appointments</p>
          </div>
          <h1 className="text-2xl font-bold text-[#146A5D] mt-4 md:hidden">8</h1>
        </motion.div>

        {/* Patients Card */}
        <motion.div 
          whileHover={{ scale: 1.05 }} 
          className="flex items-center bg-white shadow-lg rounded-lg p-4 transition flex-col justify-center  md:flex-row"
        >
          <img className="w-16 h-16" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQx4WPMRwUZHH4CIYhmmhdmOPjBP03sSfRshQ&s" alt="Patients" />
          <div className="ml-3 hidden md:block">
            <h1 className="text-2xl font-bold text-[#146A5D]">5</h1>
            <p className="text-gray-500">Patients</p>
          </div>
          <h1 className="text-2xl font-bold text-[#146A5D] mt-4 md:hidden">5</h1>
        </motion.div>
      </motion.div>

      {/* Latest Bookings Section */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
        className="h-[120px] flex items-center bg-white shadow-2xl p-4 mt-10 rounded-lg"
      >
        <img className="h-[70px]" src="https://static.vecteezy.com/system/resources/thumbnails/046/720/280/small_2x/booking-icon-line-icon-for-your-website-mobile-presentation-and-logo-design-vector.jpg" alt="Bookings" />
        <h1 className="text-3xl font-bold ml-4">Latest Bookings</h1>
      </motion.div>

      {/* Booking List */}
      <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-6 w-[95%] mx-auto"
      >
        {bookings.map((booking) => (
          <div key={booking.id} className="mt-4 flex items-center bg-white shadow-md p-4 rounded-lg">
            <img className="h-[70px] rounded-full" src="https://media.istockphoto.com/id/177373093/photo/indian-male-doctor.jpg?s=612x612&w=0&k=20&c=5FkfKdCYERkAg65cQtdqeO_D0JMv6vrEdPw3mX1Lkfg=" alt="Doctor" />
            <div className="ml-4">
              <h1 className="text-lg font-semibold">{booking.doctor}</h1>
              <p className="text-gray-500">Booking on {booking.date}</p>
              <p className={`text-sm font-bold ${booking.status === "Cancelled" ? "text-red-500" : "text-green-600"}`}>
                {booking.status}
              </p>
            </div>
            {booking.status !== "Cancelled" && (
              <button onClick={() => handleCancel(booking.id)} className="ml-auto">
                <img className="h-[50px]" src="https://media.istockphoto.com/id/1198849693/vector/cancel-icon-flat-illustration-of-cancel-vector-icon-cancel-sign-symbol-on-white-background.jpg?s=612x612&w=0&k=20&c=6vGokNVvNFp_sudDF_tWWDAtFr1L3lh9JtspLxfwh6Q=" alt="Cancel" />
              </button>
            )}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
