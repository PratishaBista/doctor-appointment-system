import { motion } from "framer-motion";
import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { FiCalendar, FiUser, FiDollarSign, FiActivity } from "react-icons/fi";


const DoctorDashboard = () => {
  const { doctor_token, getDashboardData, dashboardData, getDoctorData, doctorData  } = useContext(DoctorContext);
  const { formatDate } = useContext(AppContext);

  useEffect(() => {
    if (doctor_token) {
      getDashboardData();
      getDoctorData();
    }
  }, [doctor_token]);

  const processChartData = () => {
    if (!dashboardData) return { appointmentsData: null, patientsData: null };

    // Process appointments data for bar chart
    const appointmentsData = {
      labels: dashboardData.appointmentsTrend?.map(item => item.month) || [],
      datasets: [
        {
          label: 'Appointments',
          data: dashboardData.appointmentsTrend?.map(item => item.count) || [],
          backgroundColor: '#146A5D',
        },
      ],
    };

    // Process patients by gender for pie chart
    const patientsData = {
      labels: dashboardData.patientsByGender?.map(item => item.gender) || [],
      datasets: [
        {
          data: dashboardData.patientsByGender?.map(item => item.count) || [],
          backgroundColor: ['#146A5D', '#4CAF50', '#FFC107'],
        },
      ],
    };

    return { appointmentsData, patientsData };
  };

  const { appointmentsData, patientsData } = processChartData();

  // Filter to show only upcoming appointments
  const upcomingAppointments = dashboardData?.latestAppointments?.filter(
    appt => !appt.cancelled && !appt.isCompleted
  ) || [];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Appointments Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ y: -5 }}
          className="bg-white rounded-xl shadow-sm p-6 flex items-center"
        >
          <div className="p-3 rounded-lg bg-[#146A5D]/10 text-[#146A5D]">
            <FiCalendar className="w-6 h-6" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Appointments</p>
            <h3 className="text-2xl font-bold text-gray-800">{dashboardData?.appointments || 0}</h3>
          </div>
        </motion.div>

        {/* Patients Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          whileHover={{ y: -5 }}
          className="bg-white rounded-xl shadow-sm p-6 flex items-center"
        >
          <div className="p-3 rounded-lg bg-[#4CAF50]/10 text-[#4CAF50]">
            <FiUser className="w-6 h-6" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Patients</p>
            <h3 className="text-2xl font-bold text-gray-800">
              {dashboardData?.patients ||
                (dashboardData?.latestAppointments
                  ? new Set(dashboardData.latestAppointments.map(appt => appt.userId)).size
                  : 0)}
            </h3>
          </div>
        </motion.div>

        {/* Availability Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          whileHover={{ y: -5 }}
          className="bg-white rounded-xl shadow-sm p-6 flex items-center"
        >
          <div className="p-3 rounded-lg bg-[#0288D1]/10 text-[#0288D1]">
            <FiActivity className="w-6 h-6" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Status</p>
            <h3 className="text-2xl font-bold text-gray-800">
              {doctorData?.available ? "Available" : "Not Available"}
            </h3>
          </div>
        </motion.div>
      </div>

      {/* Upcoming Appointments */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-sm overflow-hidden"
      >
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-800">Upcoming Appointments</h3>
        </div>

        <div className="divide-y divide-gray-100">
          {upcomingAppointments.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              No upcoming appointments
            </div>
          ) : (
            upcomingAppointments.map((appt, index) => (
              <motion.div
                key={appt._id || index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="p-4 flex items-center hover:bg-gray-50 transition-colors"
              >
                <img
                  className="h-10 w-10 rounded-full object-cover"
                  src={appt.userData?.image || "https://via.placeholder.com/40"}
                  alt="Patient"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/40";
                  }}
                />
                <div className="ml-4 flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-gray-800">
                      {appt.userData?.name || "Unknown Patient"}
                    </h4>
                    <span className="text-sm font-medium text-[#146A5D]">
                      Rs. {appt.amount || appt.doctorData?.fees || 0}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">
                    {formatDate(appt.slotDate || appt.date)} at {appt.slotTime}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {appt.payment ? (appt.payment.method || "Cash") : "Cash"} • {appt.userData?.gender || "Gender not specified"}
                  </p>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default DoctorDashboard;