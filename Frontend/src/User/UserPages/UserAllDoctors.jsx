import { motion } from "framer-motion";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

const UserAllDoctors = () => {
    const {AllDoctors} =useContext(AppContext)
    console.log(AllDoctors)
    const navigate=useNavigate()

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-5xl font-bold mt-20 text-center text-gray-800">
        All Doctors
      </h1>

      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 mt-12">
        {AllDoctors.map((item, index) => (
          <motion.div
          onClick={() => navigate(`/my-appointment/${item.id}`)}
            key={index}
            className="border border-gray-300 shadow-lg rounded-xl p-6 bg-white transition-all duration-300 hover:bg-slate-50 hover:text-black m-2"
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
  );
};

export default UserAllDoctors;
