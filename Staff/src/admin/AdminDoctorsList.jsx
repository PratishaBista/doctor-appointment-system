import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { FiBriefcase, FiCheckCircle, FiXCircle, FiTrash2, FiSearch, FiFilter, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { motion } from "framer-motion";

const AdminDoctorsList = () => {
  const { doctors, admin_token, getAllDoctors, changeAvailability, deleteDoctor } = useContext(AdminContext);
  const [loading, setLoading] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [doctorToDelete, setDoctorToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    speciality: "",
    availability: "all",
    experience: "",
    sortBy: "name"
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (admin_token) {
      getAllDoctors().finally(() => setLoading(false));
    }
  }, [admin_token]);

  const handleDeleteClick = (doctorId) => {
    setDoctorToDelete(doctorId);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    if (doctorToDelete) {
      await deleteDoctor(doctorToDelete);
      setShowDeleteConfirm(false);
      setDoctorToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setDoctorToDelete(null);
  };

  const filteredDoctors = doctors
    .filter(doctor =>
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.speciality.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(doctor =>
      filters.speciality ? doctor.speciality === filters.speciality : true
    )
    .filter(doctor =>
      filters.availability === "available" ? doctor.available :
        filters.availability === "unavailable" ? !doctor.available : true
    )
    .filter(doctor =>
      filters.experience ? parseInt(doctor.experience) >= parseInt(filters.experience) : true
    )
    .sort((a, b) => {
      const getExperience = (doc) => {
        const match = doc.experience.match(/\d+/);
        return match ? parseInt(match[0]) : 0;
      };
      if (filters.sortBy === "name") return a.name.localeCompare(b.name);
      if (filters.sortBy === "experience") {
        const expA = getExperience(a);
        const expB = getExperience(b);
        return expB - expA;
      }
      if (filters.sortBy === "fees") return b.fees - a.fees;
      return 0;
    });

  const specialities = [...new Set(doctors.map(doctor => doctor.speciality))];

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
    <div className="p-6 bg-[#F5F6FA] min-h-screen">
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#F5F6FA] rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Confirm Deletion</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this doctor? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#0288D1] mb-2">Doctors Management</h1>
        <p className="text-gray-600">Manage and monitor all registered doctors</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="relative w-full md:w-96">
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or speciality..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0288D1]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex gap-3 w-full md:w-auto">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <FiFilter className="text-[#0288D1]" />
              <span>Filters</span>
              {showFilters ? <FiChevronUp /> : <FiChevronDown />}
            </button>
          </div>
        </div>

        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.2 }}
            className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t border-gray-100"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Speciality</label>
              <select
                className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0288D1]"
                value={filters.speciality}
                onChange={(e) => setFilters({ ...filters, speciality: e.target.value })}
              >
                <option value="">All Specialities</option>
                {specialities.map(spec => (
                  <option key={spec} value={spec}>{spec}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Availability</label>
              <select
                className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0288D1]"
                value={filters.availability}
                onChange={(e) => setFilters({ ...filters, availability: e.target.value })}
              >
                <option value="all">All Statuses</option>
                <option value="available">Available</option>
                <option value="unavailable">Unavailable</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Min Experience</label>
              <select
                className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0288D1]"
                value={filters.experience}
                onChange={(e) => setFilters({ ...filters, experience: e.target.value })}
              >
                <option value="">Any</option>
                <option value="5">5+ years</option>
                <option value="10">10+ years</option>
                <option value="15">15+ years</option>
                <option value="20">20+ years</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
              <select
                className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0288D1]"
                value={filters.sortBy}
                onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
              >
                <option value="name">Name (A-Z)</option>
                <option value="experience">Experience (High-Low)</option>
                <option value="fees">Fees (High-Low)</option>
              </select>
            </div>
          </motion.div>
        )}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-[#0288D1]">
          <h3 className="text-gray-500 text-sm font-medium">Total Doctors</h3>
          <p className="text-2xl font-bold text-gray-800">{doctors.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-[#4CAF50]">
          <h3 className="text-gray-500 text-sm font-medium">Available</h3>
          <p className="text-2xl font-bold text-gray-800">{doctors.filter(d => d.available).length}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-[#FF9800]">
          <h3 className="text-gray-500 text-sm font-medium">Unavailable</h3>
          <p className="text-2xl font-bold text-gray-800">{doctors.filter(d => !d.available).length}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-[#9C27B0]">
          <h3 className="text-gray-500 text-sm font-medium">Specialities</h3>
          <p className="text-2xl font-bold text-gray-800">{specialities.length}</p>
        </div>
      </div>

      {/* Doctors List */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b border-gray-100 text-sm font-medium text-gray-500 uppercase tracking-wider">
          <div className="col-span-3 md:col-span-2">Doctor</div>
          <div className="col-span-3 md:col-span-2">Speciality</div>
          <div className="hidden md:block md:col-span-2">Experience</div>
          <div className="hidden md:block md:col-span-2">Fees</div>
          <div className="col-span-3 md:col-span-2">Status</div>
          <div className="col-span-3 md:col-span-2 text-right">Mark Available/Delete</div>
        </div>

        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doctor, index) => (
            <motion.div
              key={doctor._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
              className="grid grid-cols-12 gap-4 p-4 items-center border-b border-gray-100 hover:bg-gray-50 transition-colors"
            >
              {/* Doctor Info */}
              <div className="col-span-3 md:col-span-2 flex items-center">
                <img
                  className="w-10 h-10 rounded-full mr-3 object-cover"
                  src={doctor.image}
                  alt={doctor.name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/150";
                  }}
                />
                <div>
                  <p className="font-medium text-gray-800">{doctor.name}</p>
                  <p className="text-sm text-gray-500">{doctor.degree}</p>
                </div>
              </div>

              {/* Speciality */}
              <div className="col-span-3 md:col-span-2">
                <span className="px-2 py-1 bg-[#4CAF50]/10 text-[#4CAF50] text-xs font-medium rounded-full">
                  {doctor.speciality}
                </span>
              </div>

              {/* Experience */}
              <div className="hidden md:block md:col-span-2">
                <div className="flex items-center">
                  <FiBriefcase className="mr-2 text-[#0288D1]" />
                  <span>{doctor.experience}</span>
                </div>
              </div>

              {/* Fees */}
              <div className="hidden md:block md:col-span-2">
                <div className="flex items-center mr-2 text-[#0288D1]">
                  <span>रु {doctor.fees}</span>
                </div>
              </div>

              {/* Status */}
              <div className="col-span-3 md:col-span-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${doctor.available
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
                  }`}>
                  {doctor.available ? "Available" : "Unavailable"}
                </span>
              </div>

              <div className="col-span-3 md:col-span-2 flex justify-end gap-2">
                <button
                  onClick={() => handleAvailabilityChange(doctor._id, doctor.available)}
                  className={`p-2 rounded-lg ${doctor.available
                    ? "text-green-600 hover:bg-green-50"
                    : "text-red-600 hover:bg-red-50"
                    } transition-colors`}
                  title={doctor.available ? "Mark Unavailable" : "Mark Available"}
                >
                  {doctor.available ? <FiCheckCircle /> : <FiXCircle />}
                </button>
                <button onClick={() => handleDeleteClick(doctor._id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                  <FiTrash2 />
                </button>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="p-8 text-center">
            <p className="text-gray-500">
              {searchTerm || Object.values(filters).some(f => f)
                ? "No doctors match your search criteria."
                : "No doctors found in the system."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDoctorsList;