import { motion } from "framer-motion";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

const FindDoctors = () => {
  const { doctors, getDoctorsData } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpeciality, setSelectedSpeciality] = useState("");
  const [feesRange, setFeesRange] = useState([0, 10000]);
  const [currentPage, setCurrentPage] = useState(1);
  const [availability, setAvailability] = useState([]);
  const doctorsPerPage = 6;

  const navigate = useNavigate();

  useEffect(() => {
    getDoctorsData();
  }, [getDoctorsData]);

  const uniqueSpecialities = [...new Set(doctors?.map(doc => doc.speciality) || [])];

  // filters that include search term, speciality, fees range and availability
  // this is the main filter function that filters the doctors based on the search term, speciality, fees range and availability
  // it is used in the filteredDoctors variable to filter the doctors
  const filteredDoctors = doctors?.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpeciality = selectedSpeciality ? doc.speciality === selectedSpeciality : true;
    const matchesFees = doc.fees >= feesRange[0] && doc.fees <= feesRange[1];
    const matchesAvailability = availability.length === 0 ||
      (availability.includes("Available") && doc.available) ||
      (availability.includes("Unavailable") && !doc.available);

    return matchesSearch && matchesSpeciality && matchesFees && matchesAvailability;
  }) || [];

  // Pagination
  // this is the main pagination function that calculates the current doctors based on the current page and doctors per page
  // it is used in the currentDoctors variable to get the current doctors to be displayed on the page
  // it is also used in the totalPages variable to get the total number of pages
  // it is used in the handlePageChange function to change the page when the user clicks on the pagination buttons
  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = filteredDoctors.slice(indexOfFirstDoctor, indexOfLastDoctor);
  const totalPages = Math.ceil(filteredDoctors.length / doctorsPerPage);

  const handleAvailabilityChange = (status) => {
    setAvailability(prev =>
      prev.includes(status)
        ? prev.filter(item => item !== status)
        : [...prev, status]
    );
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // this function resets all the filters to their default values
  const resetFilters = () => {
    setSearchTerm("");
    setSelectedSpeciality("");
    setFeesRange([0, 10000]);
    setAvailability([]);
    setCurrentPage(1);
  };

  return (
    <div className="w-full bg-[#F5F6FA] py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-[#1e1e1f] mb-8 text-center">Find and Book</h1>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="md:w-1/4 bg-white rounded-xl shadow-md p-6 h-fit sticky top-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Filters</h2>
              <button
                onClick={resetFilters}
                className="text-sm text-[#0288D1] hover:underline"
              >
                Reset All
              </button>
            </div>

            {/* Search */}
            <div className="mb-6">
              <label className="block text-gray-700 mb-2 font-medium">Search Doctors</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Enter doctor's name..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0288D1] focus:border-transparent"
              />
            </div>

            {/* Speciality */}
            <div className="mb-6">
              <label className="block text-gray-700 mb-2 font-medium">Speciality</label>
              <select
                value={selectedSpeciality}
                onChange={(e) => {
                  setSelectedSpeciality(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0288D1] focus:border-transparent"
              >
                <option value="">All Specialities</option>
                {uniqueSpecialities.map((spec, idx) => (
                  <option key={idx} value={spec}>
                    {spec}
                  </option>
                ))}
              </select>
            </div>

            {/* Availability */}
            <div className="mb-6">
              <label className="block text-gray-700 mb-2 font-medium">Availability</label>
              <div className="space-y-2">
                {["Available", "Unavailable"].map((status, index) => (
                  <div key={index} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`avail-${index}`}
                      checked={availability.includes(status)}
                      onChange={() => handleAvailabilityChange(status)}
                      className="h-4 w-4 text-[#0288D1] focus:ring-[#0288D1] border-gray-300 rounded"
                    />
                    <label htmlFor={`avail-${index}`} className="ml-2 text-gray-700">
                      {status}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Fees Range */}
            <div className="mb-6">
              <label className="block text-gray-700 mb-2 font-medium">Consultation Fees</label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min="0"
                  value={feesRange[0]}
                  onChange={(e) => {
                    setFeesRange([Number(e.target.value), feesRange[1]]);
                    setCurrentPage(1);
                  }}
                  placeholder="Min"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0288D1] focus:border-transparent"
                />
                <span className="text-gray-400">-</span>
                <input
                  type="number"
                  min="0"
                  value={feesRange[1]}
                  onChange={(e) => {
                    setFeesRange([feesRange[0], Number(e.target.value)]);
                    setCurrentPage(1);
                  }}
                  placeholder="Max"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0288D1] focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Doctors List */}
          <div className="md:w-3/4">
            {/* Results Header */}
            <div className="bg-white rounded-xl shadow-sm p-4 mb-6 flex justify-between items-center">
              <h2 className="text-small font-regular text-gray-600">
                {filteredDoctors.length} {filteredDoctors.length === 1 ? "Doctor" : "Doctors"} Found
              </h2>
              <div className="text-sm text-gray-500">
                Page {currentPage} of {totalPages}
              </div>
            </div>

            {/* Doctors Grid */}
            {currentDoctors.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                <h3 className="text-lg font-medium text-gray-700 mb-2">No doctors match your search criteria</h3>
                <p className="text-gray-500">Try adjusting your filters</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentDoctors.map((doctor, index) => (
                  <motion.div
                    key={index}
                    onClick={() => navigate(`/book-appointment/${doctor._id}`)}
                    className="cursor-pointer bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col h-full"
                    whileHover={{ y: -5 }}
                  >
                    <div className="p-5 flex flex-col items-center">
                      <img
                        src={doctor.image}
                        alt={doctor.name}
                        className="w-32 h-32 object-cover rounded-full mb-4 border-4 border-[#0288D1]/10"
                      />
                      <div className="text-center flex-grow">
                        <h2 className="text-lg font-semibold text-gray-800 mb-1">{doctor.name}</h2>
                        <p className="text-[#0288D1] font-medium mb-2">{doctor.speciality}</p>
                        <p className="text-gray-500 text-sm mb-3">{doctor.degree}</p>
                      </div>
                      <div className="w-full mt-auto">
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-gray-700 font-medium">Rs. {doctor.fees}</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${doctor.available ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                            }`}>
                            {doctor.available ? "Available" : "Unavailable"}
                          </span>
                        </div>
                        <button
                          className="w-full py-2 bg-[#0288D1] text-white rounded-lg hover:bg-[#0277BD] transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/book-appointment/${doctor._id}`);
                          }}
                        >
                          Book Appointment
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-8">
                <nav className="inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-l-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>

                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handlePageChange(index + 1)}
                      className={`px-4 py-2 border-t border-b border-gray-300 ${currentPage === index + 1
                        ? "bg-[#0288D1] text-white border-[#0288D1]"
                        : "bg-white text-gray-700 hover:bg-gray-100"
                        }`}
                    >
                      {index + 1}
                    </button>
                  ))}

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded-r-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindDoctors;