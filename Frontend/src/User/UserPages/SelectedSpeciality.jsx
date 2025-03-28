import { motion } from "framer-motion";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
const SelectedSpeciality = () => {
  const { selectedSpecialty,AllDoctors } = useContext(AppContext);

  // Prevent rendering if no specialty is selected
  if (!selectedSpecialty) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl font-semibold text-gray-600">
          No specialty selected. Please go back and choose one.
        </h1>
      </div>
    );
  }
  const filteredDoctors = AllDoctors.filter(
    (doctor) => doctor.Speciality === selectedSpecialty.name
  );
  console.log(filteredDoctors)
  const navigate=useNavigate()

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      {/* Card Section */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden w-full flex items-center p-4">
        {/* Back Button */}
        <button onClick={() =>{ window.history.back()
            scrollTo(0,0)
        }} className="mr-4">
          <img
            className="h-10 w-10  rounded-full p-1 hover:shadow-md transition"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRz_Za2B3Wx4i28VoxCXNFt2fE0trwLSifnbg&s"
            alt="Go Back"
          />
        </button>

        {/* Specialty Image */}
        <div className="w-20 h-20 flex-shrink-0 ">
          <img
            src={selectedSpecialty.img}
            alt={selectedSpecialty.name}
            className="w-full h-full object-cover rounded-full border-2 border-gray-300"
          />
        </div>

        {/* Specialty Details */}
        <div className="ml-4 flex-1">
          <h1 className="text-xl font-bold text-gray-800">
            {selectedSpecialty.name}
          </h1>
          <p className="text-gray-600 text-sm mt-1">
            {selectedSpecialty.description}
          </p>
        </div>
      </div>
      <div className="container mx-auto">

      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 mt-12">
        {filteredDoctors.map((item, index) => (
          <motion.div
          onClick={() => navigate(`/my-appointment/${item.id}`)}
            key={index}
            className="border border-gray-300 shadow-lg rounded-xl p-6 bg-white transition-all duration-300 hover:bg-[#146A5D] hover:text-white"
            whileHover={{ scale: 1.05 }}
          >
            <img
              className="w-full h-48 object-cover rounded-lg mb-4"
              src={item.image}
              alt={item.Name}
            />

            <h2 className="text-xl font-bold text-center">{item.Name}</h2>
            <p className="text-center text-gray-600 transition-all duration-300 hover:text-white">
              {item.Speciality}
            </p>
            <p className="text-sm mt-2">Degree: {item.Degree}</p>
            <p className="text-sm">Description: {item.Description}</p>
            <p className="text-sm font-semibold mt-2">Fees: {item.Fees}</p>

            <div className="flex items-center justify-center mt-4">
              <label className="flex items-center cursor-pointer">
                <input type="checkbox" className="hidden peer" />
                <div className="w-14 h-7 bg-gray-300 rounded-full peer-checked:bg-green-500 relative">
                  <div className="absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform peer-checked:translate-x-7"></div>
                </div>
                <span className="ml-2 font-bold">Available</span>
              </label>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default SelectedSpeciality;
