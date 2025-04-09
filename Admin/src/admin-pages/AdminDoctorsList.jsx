import { motion } from "framer-motion";
import React from "react";

const AdminDoctorsList = () => {
  return (
    <div className="md:flex ">

   <div className="">
   <motion.div
      className="flex m-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      
      <motion.div
        className="border h-[400px] border-[#146A5D] shadow-lg rounded-xl p-4 w-80 bg-white transition-all duration-300 hover:bg-[#146A5D] hover:text-white"
        whileHover={{ scale: 1.05 }}
      >
        {/* Doctor Image */}
        <img
          className="w-full h-56 object-cover rounded-lg transition-all duration-300"
          src="https://static.vecteezy.com/system/resources/thumbnails/026/375/249/small_2x/ai-generative-portrait-of-confident-male-doctor-in-white-coat-and-stethoscope-standing-with-arms-crossed-and-looking-at-camera-photo.jpg"
          alt="Doctor"
        />

        {/* Doctor Name & Specialty */}
        <h1 className="text-xl font-bold text-black  mt-3 text-center transition-all duration-300 hover:text-white">
          Dr. Aadesh Khadka
        </h1>
        <p className="text-black font-semibold text-sm text-center transition-all duration-300 hover:text-white">
          General Physician
        </p>

        {/* Availability Toggle */}
        <div className="flex items-center justify-center mt-4">
          <input type="checkbox" id="availability" className="" />
          <motion.label
            htmlFor="availability"
            className="flex items-center text-black font-bold px-3 py-1 rounded-full cursor-pointer transition-all duration-300 peer-checked:bg-gray-300 peer-checked:text-gray-700 hover:bg-white hover:text-[#146A5D]"
            whileTap={{ scale: 0.9 }}
          >
            <span>Available</span>
          </motion.label>
        </div>
      </motion.div>
    </motion.div>
   </div>
   <div className="">
   <motion.div
      className="flex m-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      
      <motion.div
        className="border h-[400px] border-[#146A5D] shadow-lg rounded-xl p-4 w-80 bg-white transition-all duration-300 hover:bg-slate-50 hover:text-black"
        whileHover={{ scale: 1.05 }}
      >
        {/* Doctor Image */}
        <img
          className="w-full h-56 object-cover rounded-lg transition-all duration-300"
          src="https://static.vecteezy.com/system/resources/thumbnails/026/375/249/small_2x/ai-generative-portrait-of-confident-male-doctor-in-white-coat-and-stethoscope-standing-with-arms-crossed-and-looking-at-camera-photo.jpg"
          alt="Doctor"
        />

        {/* Doctor Name & Specialty */}
        <h1 className="text-xl font-bold text-black  mt-3 text-center transition-all duration-300 hover:text-white">
          Dr. Aadesh Khadka
        </h1>
        <p className="text-black font-semibold text-sm text-center transition-all duration-300 hover:text-white">
          General Physician
        </p>

        {/* Availability Toggle */}
        <div className="flex items-center justify-center mt-4">
          <input type="checkbox" id="availability" className="" />
          <motion.label
            htmlFor="availability"
            className="flex items-center text-black font-bold px-3 py-1 rounded-full cursor-pointer transition-all duration-300 peer-checked:bg-gray-300 peer-checked:text-gray-700 hover:bg-white hover:text-[#146A5D]"
            whileTap={{ scale: 0.9 }}
          >
            <span>Available</span>
          </motion.label>
        </div>
      </motion.div>
    </motion.div>
   </div>
   <div className="">
   <motion.div
      className="flex m-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      
      <motion.div
        className="border h-[400px] border-[#146A5D] shadow-lg rounded-xl p-4 w-80 bg-white transition-all duration-300 hover:bg-[#146A5D] hover:text-white"
        whileHover={{ scale: 1.05 }}
      >
        {/* Doctor Image */}
        <img
          className="w-full h-56 object-cover rounded-lg transition-all duration-300"
          src="https://static.vecteezy.com/system/resources/thumbnails/026/375/249/small_2x/ai-generative-portrait-of-confident-male-doctor-in-white-coat-and-stethoscope-standing-with-arms-crossed-and-looking-at-camera-photo.jpg"
          alt="Doctor"
        />

        {/* Doctor Name & Specialty */}
        <h1 className="text-xl font-bold text-black  mt-3 text-center transition-all duration-300 hover:text-white">
          Dr. Aadesh Khadka
        </h1>
        <p className="text-black font-semibold text-sm text-center transition-all duration-300 hover:text-white">
          General Physician
        </p>

        {/* Availability Toggle */}
        <div className="flex items-center justify-center mt-4">
          <input type="checkbox" id="availability" className="" />
          <motion.label
            htmlFor="availability"
            className="flex items-center text-black font-bold px-3 py-1 rounded-full cursor-pointer transition-all duration-300 peer-checked:bg-gray-300 peer-checked:text-gray-700 hover:bg-white hover:text-[#146A5D]"
            whileTap={{ scale: 0.9 }}
          >
            <span>Available</span>
          </motion.label>
        </div>
      </motion.div>
    </motion.div>
   </div>
    </div>
  );
};

export default AdminDoctorsList;
