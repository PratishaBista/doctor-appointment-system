import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { FiUser, FiBriefcase, FiAward, FiDollarSign, FiCheckCircle, FiXCircle, FiEdit, FiTrash2 } from "react-icons/fi";
import { motion } from "framer-motion";

const AdminDoctorsList = () => {
  const { doctors, admin_token, getAllDoctors, changeAvailability } = useContext(AdminContext);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (admin_token) {
      getAllDoctors().finally(() => setLoading(false));
    }
  }, [admin_token]);

  const filteredDoctors = doctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.speciality.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAvailabilityChange = async (id, currentStatus) => {
    try {
      await changeAvailability(id);
      const updatedDoctors = doctors.map(doctor =>
        doctor._id === id ? { ...doctor, available: !currentStatus } : doctor
      );
    } catch (error) {
      console.error("Failed to update availability:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0288D1]"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Search and Filter Section */}
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl font-bold text-[#0288D1]">Manage Doctors</h1>
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Search doctors..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0288D1]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FiUser className="absolute left-3 top-3 text-gray-400" />
        </div>
      </div>

      {/* Doctors List */}
      {filteredDoctors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doctor, index) => (
            <motion.div
              key={doctor._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow"
            >
              {/* Doctor Image */}
              <div className="relative">
                <img
                  className="w-full h-48 object-cover"
                  src={doctor.image}
                  alt={doctor.name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/300";
                  }}
                />
                <div className="absolute top-2 right-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${doctor.available
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                    }`}>
                    {doctor.available ? "Available" : "Unavailable"}
                  </span>
                </div>
              </div>

              {/* Doctor Info */}
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-xl font-bold text-gray-800">{doctor.name}</h2>
                </div>

                <p className="text-[#4CAF50] font-semibold mb-3">{doctor.speciality}</p>

                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <FiAward className="mr-2 text-[#0288D1]" />
                    <span>{doctor.degree}</span>
                  </div>
                  <div className="flex items-center">
                    <FiBriefcase className="mr-2 text-[#0288D1]" />
                    <span>{doctor.experience} {doctor.experience === 1 ? 'year' : 'years'} experience</span>
                  </div>
                  <div className="flex items-center">
                    <FiDollarSign className="mr-2 text-[#0288D1]" />
                    <span>Rs. {doctor.fees}</span>
                  </div>
                </div>

                {/* Availability Toggle */}
                <div className="mt-4 flex items-center justify-between">
                  <button
                    onClick={() => handleAvailabilityChange(doctor._id, doctor.available)}
                    className={`flex items-center px-3 py-1 rounded-full text-sm font-medium ${doctor.available
                      ? "bg-green-100 text-green-800 hover:bg-green-200"
                      : "bg-red-100 text-red-800 hover:bg-red-200"
                      } transition-colors`}
                  >
                    {doctor.available ? (
                      <>
                        <FiCheckCircle className="mr-1" />
                        Mark Unavailable
                      </>
                    ) : (
                      <>
                        <FiXCircle className="mr-1" />
                        Mark Available
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-gray-500 text-lg">
            {searchTerm ? "No doctors match your search." : "No doctors found."}
          </p>
        </div>
      )}
    </div>
  );
};

export default AdminDoctorsList;