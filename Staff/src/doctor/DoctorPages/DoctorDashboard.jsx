import { motion } from "framer-motion";
import React, { use, useState, useEffect } from "react";
import { useContext } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";

const DoctorDashboard = () => {
  const { doctor_token, getDashboardData, dashboardData, setDashboardData } = useContext(DoctorContext);
  const { formatDate } = useContext(AppContext);

  useEffect(() => {
    if (doctor_token) {
      getDashboardData();
    }
  }, [doctor_token]);

  return (
    <motion.div
      className="p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Experience Card */}
        <motion.div
          whileHover={{ scale: 1.05, boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}
          className="bg-white rounded-lg shadow-md p-6 flex items-center gap-4"
        >
          <div className="w-16 h-16 flex items-center justify-center bg-[#146A5D] bg-opacity-10 rounded-full">
            <img
              className="w-10 h-10 object-contain"
              src="https://static.vecteezy.com/system/resources/previews/026/220/984/non_2x/experience-icon-symbol-design-illustration-vector.jpg"
              alt="Experience"
            />
          </div>
          <div>
            <p className="text-2xl font-bold text-[#146A5D]">5 years</p>
            <p className="text-gray-600">Experience</p>
          </div>
        </motion.div>

        {/* Appointments Card */}
        <motion.div
          whileHover={{ scale: 1.05, boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}
          className="bg-white rounded-lg shadow-md p-6 flex items-center gap-4"
        >
          <div className="w-16 h-16 flex items-center justify-center bg-[#146A5D] bg-opacity-10 rounded-full">
            <img
              className="w-10 h-10 object-contain"
              src="https://static.vecteezy.com/system/resources/thumbnails/024/150/216/small_2x/calendar-icon-vector.jpg"
              alt="Appointments"
            />
          </div>
          <div>
            <p className="text-2xl font-bold text-[#146A5D]">{dashboardData.appointments || 0}</p>
            <p className="text-gray-600">Appointments</p>
          </div>
        </motion.div>

        {/* Patients Card */}
        <motion.div
          whileHover={{ scale: 1.05, boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}
          className="bg-white rounded-lg shadow-md p-6 flex items-center gap-4"
        >
          <div className="w-16 h-16 flex items-center justify-center bg-[#146A5D] bg-opacity-10 rounded-full">
            <img
              className="w-10 h-10 object-contain"
              src="https://cdn-icons-png.flaticon.com/512/2784/2784487.png"
              alt="Patients"
            />
          </div>
          <div>
            <p className="text-2xl font-bold text-[#146A5D]">{dashboardData.patients || 0}</p>
            <p className="text-gray-600">Patients</p>
          </div>
        </motion.div>

        {/* Earnings Card */}
        <motion.div
          whileHover={{ scale: 1.05, boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}
          className="bg-white rounded-lg shadow-md p-6 flex items-center gap-4"
        >
          <div className="w-16 h-16 flex items-center justify-center bg-[#146A5D] bg-opacity-10 rounded-full">
            <img
              className="w-10 h-10 object-contain"
              src="https://cdn-icons-png.flaticon.com/512/3132/3132693.png"
              alt="Earnings"
            />
          </div>
          <div>
            <p className="text-2xl font-bold text-[#146A5D]">
              {dashboardData.earnings ? `Rs. ${dashboardData.earnings}` : 'Rs. 0'}
            </p>
            <p className="text-gray-600">Earnings</p>
          </div>
        </motion.div>
      </div>

      {/* Recent Appointments */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-[#146A5D] mb-6">Recent Appointments</h2>

        {dashboardData.latestAppointments?.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {dashboardData.latestAppointments.map((appt, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img
                            className="h-10 w-10 rounded-full object-cover"
                            src={appt.userData?.image || "https://via.placeholder.com/40"}
                            alt="Patient"
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {appt.userData?.name || "Unknown"}
                          </div>
                          <div className="text-sm text-gray-500">
                            {appt.userData?.phone || "-"}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{formatDate(appt.slotDate)}</div>
                      <div className="text-sm text-gray-500">{appt.slotTime}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      Rs. {appt.amount || 0}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${appt.cancelled
                          ? "bg-red-100 text-red-800"
                          : appt.isCompleted
                            ? "bg-green-100 text-green-800"
                            : "bg-blue-100 text-blue-800"
                        }`}>
                        {appt.cancelled ? "Cancelled" : appt.isCompleted ? "Completed" : "Upcoming"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No recent appointments found
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default DoctorDashboard;