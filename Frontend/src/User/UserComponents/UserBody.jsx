import { motion } from "framer-motion";
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import banner from "../../assets/Banner.jpg";
import { AppContext } from '../../context/AppContext';

const UserBody = () => {
  const navigate = useNavigate()
  const doctorSpecialties = [
    {
      name: "Cardiology",
      description: "Specializes in heart conditions such as heart attacks, arrhythmias, and cardiovascular diseases.",
      img: "https://www.shutterstock.com/image-vector/heart-icon-flat-style-vector-600nw-2471170029.jpg"
    },
    {
      name: "Neurology",
      description: "Focuses on brain and nervous system disorders like epilepsy, Alzheimer's, and Parkinson's disease.",
      img: "https://c8.alamy.com/comp/2NKPG2Y/neurology-icon-monochrome-simple-sign-from-medical-speialist-collection-neurology-icon-for-logo-templates-web-design-and-infographics-2NKPG2Y.jpg"
    },
    {
      name: "Orthopedics",
      description: "Treats bones, joints, ligaments, and muscles, including fractures, arthritis, and sports injuries.",
      img: "https://cdn-icons-png.flaticon.com/512/9340/9340043.png"
    },
    {
      name: "Psychiatry",
      description: "Deals with mental health disorders such as depression, anxiety, schizophrenia, and bipolar disorder.",
      img: "https://cdn-icons-png.flaticon.com/512/12024/12024688.png"
    },
  ];
  const { selectedSpecialty, setSelectedSpecialty } = useContext(AppContext)

  return (
    <div className="relative w-full h-[50vh] overflow-hidden">
      {/* Banner */}
      <img
        className="w-full h-full object-cover"
        src={banner}
        alt="Health Solution Banner"
      />

      <div className="absolute top-0 left-0 w-full h-full flex items-start justify-start">
        <div className="bg-gradient-to-r from-black/40 to-transparent w-full h-full flex items-start pt-20 md:pt-32 pl-6 md:pl-20">
          <div className="max-w-4xl px-20">
            {/* Title */}
            <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg">
              Quality Care
            </h1>

            {/* Subtitle and Button */}
            <h2 className="text-xl md:text-1xl font-medium mb-6 text-gray-100 drop-shadow-md pb-2">
              <span className="border-b-5 border-[#0288D1] inline-block">
                All Your Health Concerns in a Single Platform
              </span>
            </h2>

            {/* <p className="text-sm md:text-base text-gray-200 mb-4 max-w-xl">
              We help you make informed decisions about your health by bringing together trusted resources and real-time access to care.
            </p> */}

            <button
              onClick={() => navigate("/FindDoctors")}
              className="px-8 py-4 text-lg font-semibold rounded-xl shadow-2xl transition-all hover:brightness-115
          bg-[#0288D1] text-white border-2 border-white/20"

            >
              Make an Appointment
            </button>
          </div>
          {/* Opening Hours Card */}
          <motion.div
            className="absolute top-30 right-40 bg-white p-6 rounded-xl shadow-lg border-l-4 border-[#0288D1] w-96 max-w-xl"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-[#0288D1] mb-4">Servicing Hours</h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="font-medium">Sunday - Thursday</span>
                <span className="text-gray-600">8:00 AM - 7:00 PM</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Friday</span>
                <span className="text-gray-600">11:00 AM - 11:00 PM</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Saturday</span>
                <span className="text-gray-600">11:00 AM - 5:00 PM</span>
              </div>
            </div>

            <motion.button
              onClick={() => navigate("/FindDoctors")}
              className="w-full py-3 px-6 text-lg font-semibold rounded-lg shadow-md transition-all hover:brightness-105 bg-[#0288D1] text-white"

            >
              Book Now
            </motion.button>
          </motion.div>
        </div>
      </div>




      {/* Services Section */}
      <div className="w-full max-w-5xl mt-8 p-6">
        <h1 className="text-3xl md:text-4xl  underline text-center text-gray-900">
          Our Services
        </h1>
      </div>

      {/* Doctor Specialties Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6 w-full max-w-6xl px-6">
        {doctorSpecialties.map((specialty, index) => (
          <div
            key={index}
            onClick={() => {
              setSelectedSpecialty(specialty)
              console.log("clicked")
              navigate("/selectedSpeciality")
              scrollTo(0, 0)
            }}
            className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center transform hover:scale-105 transition duration-500 hover:shadow-2xl"
          >
            <img
              className="rounded-lg w-32 h-32 object-cover mb-4"
              src={specialty.img}
              alt={specialty.name}
            />
            <h2 className="text-xl font-bold text-center mb-2">{specialty.name}</h2>
            <p className="text-gray-600 text-sm text-center">{specialty.description}</p>
          </div>
        ))}
      </div>

      {/* More Button */}
      <button
        className="mt-8 bg-[#146A5D] hover:bg-green-900 text-white text-xl font-semibold px-8 py-3 rounded-lg shadow-md  transition-transform transform active:scale-95 active:translate-y-1"
        onClick={() => {
          navigate("/ourServices");
          window.scrollTo(0, 0);
        }}
      >
        More
      </button>

    </div >
  );
};

export default UserBody;
