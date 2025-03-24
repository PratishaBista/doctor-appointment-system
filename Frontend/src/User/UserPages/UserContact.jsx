import { motion } from 'framer-motion';
import React from 'react';

const UserContact = () => {
  return (
    <div className='p-6 bg-white text-gray-800'>
      <motion.div className=' flex items-center justify-center text-white mb-6'
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}>
        {/* Removed bg-[#146A5D] to eliminate the green background line */}
      </motion.div>
      
      {/* Adjusted margin-top and removed unnecessary left margin */}
      <h1 className='text-4xl font-semibold mt-4 text-center '>Contact Us</h1>

      <motion.div className='flex gap-6 mb-8 mt-8'
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}> 
        <img 
          src='https://img.freepik.com/free-photo/young-doctor-gesturing-thumb-up-elderly-patient_23-2147896891.jpg?semt=ais_hybrid' 
          alt='Contact Image' 
          className='w-1/3 rounded-lg shadow-lg h-[400px] ml-50 mt-8' />
         <div className='w-2/3 space-y-4 ml-10 mt-11 text-gray-600'>
         <h2 className='text-2xl font-semibold text-[#146A5D]'>Our Contact Information</h2>
          <p>Phone: 123-456-7890</p>
           <p>Email: siddhantshrestha54@gmail.com</p>
            <p>Address: Kathmandu, Nepal</p>

          <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
            <h2 className=' text-2xl font-semibold text-[#146A5D] mt-6'>Bond with Our Hospital</h2>
            <p className='mt-2'>Work with us</p>
            <p className='mt-2'>Learn more about Green City Hospital</p>
            <div className='mt-3 px-4 py-2 bg-[#146A5D] w-[150px] text-center text-white rounded-lg shadow-md hover:bg-green-700 transition'> Visit Us</div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default UserContact;
