import { motion } from "framer-motion";
import React, { useContext, useEffect } from "react";
import { AdminContext } from "../context/AdminContext";
import { AppContext } from "../context/AppContext";
import { FiUsers, FiCalendar, FiUserPlus, FiClock } from "react-icons/fi";
import { BarChart, PieChart } from "../components/charts";

const AdminDashboard = () => {
  const {
    admin_token,
    getDashboardData,
    cancelAppointment,
    dashData,
  } = useContext(AdminContext);

  const { formatDate } = useContext(AppContext);

  useEffect(() => {
    if (admin_token) {
      getDashboardData();
    }
  }, [admin_token]);

  // Process actual data for charts
  const processChartData = () => {
    if (!dashData) return { appointmentsData: null, doctorsSpecializationData: null };

    // Process appointments data for bar chart
    const appointmentsData = {
      labels: dashData.appointmentsTrend?.map(item => item.month) || [],
      datasets: [
        {
          label: 'Appointments',
          data: dashData.appointmentsTrend?.map(item => item.count) || [],
          backgroundColor: '#0288D1',
        },
      ],
    };

    // Process doctors by specialization for pie chart
    const doctorsSpecializationData = {
      labels: dashData.doctorsBySpecialization?.map(item => item.speciality) || [],
      datasets: [
        {
          data: dashData.doctorsBySpecialization?.map(item => item.count) || [],
          backgroundColor: [
            '#0288D1',
            '#4CAF50',
            '#FFC107',
            '#FF5722',
            '#9C27B0',
          ],
        },
      ],
    };

    return { appointmentsData, doctorsSpecializationData };
  };

  const { appointmentsData, doctorsSpecializationData } = processChartData();

  return (
    dashData && (
      <div className="min-h-[90vh] w-full p-6 bg-[#F5F6FA] overflow-y-auto">
        {/* Dashboard Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Doctors Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl shadow-sm p-6 flex items-center"
          >
            <div className="p-3 rounded-lg bg-[#0288D1]/10 text-[#0288D1]">
              <FiUserPlus size={24} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Doctors</p>
              <h3 className="text-2xl font-bold text-gray-800">{dashData.doctors}</h3>
            </div>
          </motion.div>

          {/* Appointments Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl shadow-sm p-6 flex items-center"
          >
            <div className="p-3 rounded-lg bg-[#4CAF50]/10 text-[#4CAF50]">
              <FiCalendar size={24} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Appointments</p>
              <h3 className="text-2xl font-bold text-gray-800">{dashData.appointments}</h3>
            </div>
          </motion.div>

          {/* Patients Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl shadow-sm p-6 flex items-center"
          >
            <div className="p-3 rounded-lg bg-[#FFC107]/10 text-[#FFC107]">
              <FiUsers size={24} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Patients</p>
              <h3 className="text-2xl font-bold text-gray-800">{dashData.patients}</h3>
            </div>
          </motion.div>

          {/* Pending Appointments Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl shadow-sm p-6 flex items-center"
          >
            <div className="p-3 rounded-lg bg-[#FF5722]/10 text-[#FF5722]">
              <FiClock size={24} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Pending</p>
              <h3 className="text-2xl font-bold text-gray-800">{dashData.pendingAppointments || 0}</h3>
            </div>
          </motion.div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Appointments Chart - Only show if data exists */}
          {appointmentsData && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Appointments Overview</h3>
                <select className="text-sm border rounded-lg px-3 py-1 bg-gray-50">
                  <option>Last 6 Months</option>
                  <option>Last Year</option>
                  <option>Last 3 Years</option>
                </select>
              </div>
              <div className="h-64">
                <BarChart data={appointmentsData} />
              </div>
            </motion.div>
          )}

          {/* Doctors Specialization Chart - Only show if data exists */}
          {doctorsSpecializationData && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Doctors by Specialization</h3>
              <div className="h-64">
                <PieChart data={doctorsSpecializationData} />
              </div>
            </motion.div>
          )}
        </div>

        {/* Recent Appointments Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-xl shadow-sm overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800">Recent Appointments</h3>
          </div>

          <div className="divide-y divide-gray-100">
            {dashData.latestAppointments?.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                No recent appointments found
              </div>
            ) : (
              dashData.latestAppointments?.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="p-4 flex items-center hover:bg-gray-50 transition-colors"
                >
                  <img
                    className="h-10 w-10 rounded-full object-cover"
                    src={item.doctorData?.image || "https://via.placeholder.com/40"}
                    alt="Doctor"
                  />
                  <div className="ml-4 flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-gray-800">{item.doctorData?.name}</h4>
                      <span className={`text-xs px-2 py-1 rounded-full ${item.cancelled
                          ? "bg-red-100 text-red-800"
                          : item.payment?.status === 'completed'
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}>
                        {item.cancelled
                          ? "Cancelled"
                          : item.payment?.status === 'completed'
                            ? "Confirmed"
                            : "Pending Payment"}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">
                      {formatDate(item.slotDate)} at {item.slotTime}
                    </p>
                    {item.payment?.status === 'completed' && (
                      <p className="text-xs text-gray-400 mt-1">
                        Paid: ${item.amount} via {item.payment?.gateway}
                      </p>
                    )}
                  </div>
                  {!item.cancelled && (
                    <button
                      onClick={() => cancelAppointment(item._id)}
                      className="ml-4 text-red-500 hover:text-red-700 transition-colors text-sm"
                    >
                      Cancel
                    </button>
                  )}
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    )
  );
};

export default AdminDashboard;