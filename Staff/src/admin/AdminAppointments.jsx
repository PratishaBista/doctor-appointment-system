import React, { useEffect, useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext";
import { AppContext } from "../context/AppContext";

const AdminAppointments = () => {
  const { admin_token, appointments, getAllAppointments, updateStatus, cancelAppointment } = useContext(AdminContext);
  const { calculateAge, formatDate } = useContext(AppContext);
  
  const [filters, setFilters] = useState({
    status: 'all',
    doctor: 'all',
    date: ''
  });
  
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (admin_token) {
      getAllAppointments();
    }
  }, [admin_token]);

  // Get unique doctors for filter dropdown
  const uniqueDoctors = [...new Set(appointments.map(appt => appt.doctorData?.name))].filter(Boolean);

  // Filter appointments based on filters and search
  const filteredAppointments = appointments.filter(appt => {
    const matchesStatus = filters.status === 'all' || 
                         (filters.status === 'cancelled' && appt.cancelled) || 
                         (filters.status === 'active' && !appt.cancelled);
    
    const matchesDoctor = filters.doctor === 'all' || 
                         appt.doctorData?.name === filters.doctor;
    
    const matchesDate = !filters.date || 
                       new Date(appt.slotDate).toDateString() === new Date(filters.date).toDateString();
    
    const matchesSearch = searchTerm === '' || 
                         appt.userData?.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         appt.doctorData?.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesStatus && matchesDoctor && matchesDate && matchesSearch;
  });

  return (
    <div className="p-6 w-full min-h-screen bg-[#F5F6FA]">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <h1 className="text-2xl font-bold text-[#0288D1] mb-4 md:mb-0">Appointment Management</h1>
          
          <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:space-x-3">
            <input
              type="text"
              placeholder="Search patients or doctors..."
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0288D1]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0288D1]"
              value={filters.status}
              onChange={(e) => setFilters({...filters, status: e.target.value})}
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Doctor</label>
            <select
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0288D1]"
              value={filters.doctor}
              onChange={(e) => setFilters({...filters, doctor: e.target.value})}
            >
              <option value="all">All Doctors</option>
              {uniqueDoctors.map(doctor => (
                <option key={doctor} value={doctor}>{doctor}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="date"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0288D1]"
              value={filters.date}
              onChange={(e) => setFilters({...filters, date: e.target.value})}
            />
          </div>
          
          <div className="flex items-end">
            <button
              className="w-full bg-[#0288D1] text-white px-4 py-2 rounded-lg hover:bg-[#0277BD] transition"
              onClick={() => setFilters({status: 'all', doctor: 'all', date: ''})}
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Appointments Table */}
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-[#0288D1] text-white text-sm uppercase tracking-wider">
                <th className="p-4 text-left rounded-tl-lg">#</th>
                <th className="p-4 text-left">Patient</th>
                <th className="p-4 text-left">Age</th>
                <th className="p-4 text-left">Date & Time</th>
                <th className="p-4 text-left">Doctor</th>
                <th className="p-4 text-left">Fees</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 text-right rounded-tr-lg">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {filteredAppointments.length > 0 ? (
                filteredAppointments.map((appt, index) => (
                  <tr key={appt._id} className="border-b hover:bg-gray-50 transition duration-150">
                    <td className="p-4">{index + 1}</td>

                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <img
                          className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
                          src={appt.userData?.image || "https://via.placeholder.com/40"}
                          alt="User"
                        />
                        <div>
                          <p className="font-medium">{appt.userData?.name || "Unknown"}</p>
                          <p className="text-xs text-gray-500">{appt.userData?.email || ""}</p>
                        </div>
                      </div>
                    </td>

                    <td className="p-4">{calculateAge(appt.userData?.dob)}</td>

                    <td className="p-4">
                      <p className="font-medium">{formatDate(appt.slotDate)}</p>
                      <p className="text-sm text-gray-500">{appt.slotTime}</p>
                    </td>

                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <img
                          className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
                          src={appt.doctorData?.image || "https://via.placeholder.com/40"}
                          alt="Doctor"
                        />
                        <div>
                          <p className="font-medium">{appt.doctorData?.name || "Doctor"}</p>
                          <p className="text-xs text-gray-500">{appt.doctorData?.specialization || ""}</p>
                        </div>
                      </div>
                    </td>

                    <td className="p-4">Rs. {appt.doctorData?.fees || 0}</td>

                    <td className="p-4 text-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        appt.cancelled 
                          ? "bg-red-100 text-red-800" 
                          : "bg-green-100 text-green-800"
                      }`}>
                        {appt.cancelled ? "Cancelled" : "Confirmed"}
                      </span>
                    </td>

                    <td className="p-4 text-right">
                      {!appt.cancelled && (
                        <button
                          onClick={() => cancelAppointment(appt._id, "Cancelled")}
                          className="text-red-500 hover:text-red-700 font-medium text-sm px-3 py-1 rounded hover:bg-red-50 transition"
                        >
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="p-8 text-center text-gray-500">
                    No appointments found matching your criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Summary Stats */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <h3 className="text-sm font-medium text-blue-800">Total Appointments</h3>
            <p className="text-2xl font-bold text-blue-600">{appointments.length}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg border border-green-100">
            <h3 className="text-sm font-medium text-green-800">Confirmed</h3>
            <p className="text-2xl font-bold text-green-600">
              {appointments.filter(a => !a.cancelled).length}
            </p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg border border-red-100">
            <h3 className="text-sm font-medium text-red-800">Cancelled</h3>
            <p className="text-2xl font-bold text-red-600">
              {appointments.filter(a => a.cancelled).length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAppointments;