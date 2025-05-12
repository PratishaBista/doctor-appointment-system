import { motion } from 'framer-motion';
import React from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaCalendarAlt, FaUserMd } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const UserContact = () => {

  const navigate = useNavigate();
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl tracking-[-0.03em] md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#2E2E2E] to-[#2E2E2E] bg-clip-text text-transparent leading-[1.2] pb-2">Contact Health Solution</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          We're here to help you with all your healthcare needs
        </p>
      </motion.div>

      {/* Main */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
        {/* Contact information */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white p-8 rounded-xl shadow-md"
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Hospital Information</h2>

          <div className="space-y-6">
            <div className="flex items-start">
              <div className="text-[#4CAF50] mt-1 mr-4">
                <FaMapMarkerAlt size={20} />
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Address</h3>
                <p className="text-gray-600">123 Medical Plaza<br />Kathmandu, Nepal</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="text-[#4CAF50] mt-1 mr-4">
                <FaPhone size={20} />
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Phone</h3>
                <p className="text-gray-600">+977 123-456-7890<br />Emergency: +977 987-654-3210</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="text-[#4CAF50] mt-1 mr-4">
                <FaEnvelope size={20} />
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Email</h3>
                <p className="text-gray-600">info@healthsolution.com<br />support@healthsolution.com</p>
              </div>
            </div>

            <div className="pt-4">
              <h3 className="font-medium text-gray-800 mb-3">Operating Hours</h3>
              <div className="space-y-2 text-gray-600">
                <p className="flex justify-between"><span>Sunday - Thursday:</span> <span>8:00 AM - 7:00 PM</span></p>
                <p className="flex justify-between"><span>Friday:</span> <span>11:00 AM - 11:00 PM</span></p>
                <p className="flex justify-between"><span>Saturday:</span> <span>11:00 AM - 5:00 PM</span></p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Map and quick actions in order to help the user find the hospital */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6"
        >
          {/* Map for quick reference */}
          <div className="h-96 rounded-xl overflow-hidden shadow-md">
            <iframe
              title="Hospital Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.4567890123456!2d85.32456789012345!3d27.712345678901234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDQyJzQ0LjQiTiA4NcKwMTknMjEuNiJF!5e0!3m2!1sen!2snp!4v1234567890123!5m2!1sen!2snp"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>

          {/* these buttons will navigate to the FindDoctors page, we can redirect one of them to another page if needed  */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.button
              whileHover={{ y: -3 }}
              onClick={() => navigate("/FindDoctors")}
              className="flex items-center justify-center p-4 bg-[#0288D1] text-white rounded-lg shadow-md hover:bg-[#0277BD] transition-colors"
            >
              <FaUserMd className="mr-2" />
              <span>Find a Doctor</span>
            </motion.button>

            <motion.button
              whileHover={{ y: -3 }}
              onClick={() => navigate("/FindDoctors")}
              className="flex items-center justify-center p-4 bg-[#4CAF50] text-white rounded-lg shadow-md hover:bg-[#3d8b40] transition-colors"
            >
              <FaCalendarAlt className="mr-2" />
              <span>Book Appointment</span>
            </motion.button>
          </div>

          {/* Emergency Contact */}
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
            <h3 className="font-semibold text-red-700 mb-2">Emergency Contact</h3>
            <p className="text-red-600">For immediate medical assistance, call our emergency line:</p>
            <p className="text-xl font-bold text-red-700 mt-2">+977 987-654-3210</p>
          </div>
        </motion.div>
      </div>

      {/* Additional Information */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-[#f8fafc] p-8 rounded-xl shadow-sm mb-20"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Visiting Our Hospital</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-medium text-gray-800 mb-3">Parking Information</h3>
            <p className="text-gray-600">
              We offer ample parking space for patients and visitors. The parking lot is located at the
              north side of the building and is free for all patients.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-gray-800 mb-3">Public Transportation</h3>
            <p className="text-gray-600">
              Our hospital is easily accessible via bus routes 101, 205, and 307. The nearest metro
              station is Medical Center Station, just a 5-minute walk from our main entrance.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Contact Support */}
      <motion.div
        className="bg-[#0288D1] rounded-xl p-12 text-center text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h2 className="text-3xl font-bold mb-6">Need More Information?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Our patient care team is available 24/7 to answer your questions.
        </p>
        <button className="px-8 py-3 bg-white text-[#0288D1] font-semibold rounded-lg hover:bg-gray-100 transition-colors">
          Contact Support Team
        </button>
      </motion.div>
    </div>
  );
};

export default UserContact;