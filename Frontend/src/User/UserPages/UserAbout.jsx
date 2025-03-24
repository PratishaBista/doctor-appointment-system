import { motion } from 'framer-motion';
import React from 'react';

const UserAbout = () => {
  return (
    <div className='p-6 bg-white text-gray-800'>
      <motion.div className='flex items-center justify-center text-white mb-6'
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}>
      </motion.div>
      <h1 className='text-4xl font-semibold text-center mt-2'>About Us</h1>
      <motion.div className='flex gap-6 mb-8'
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}>
        <div className='w-1/3'>
          <img
            src='https://th.bing.com/th/id/R.fbf0d6bffd225b0c87bc1d3cae05dc1d?rik=XGhgNVKwvEMZWA&pid=ImgRaw&r=0'
            alt='Hospital Building'
            className='w-full rounded-lg shadow-lg h-[390px]  mt-14 ml-50'
          />
        </div>
        <div className='w-2/3'>
          <h1 className='font-bold'></h1>
          <p className='ml-60 mb-4 mt-14 text-gray-600 text-sm md:w-2/4 '>Welcome to Green City Hospital, where your health and well-being are our top priority. We understand how challenging it can be to manage appointments and health records, which is why we're here to make it as simple and efficient as possible.
            <br />
            <br />
            At Green City Hospital, we believe in combining advanced technology with compassionate care. Our platform is designed to enhance your experience, offering seamless solutions for scheduling appointments and managing your health journey. Whether it's your first visit or ongoing treatment, we’re here to support you every step of the way.
          </p>
          <motion.div className='mb-8'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}>
            <h1 className='text-2xl font-semibold text-[#146A5D]  mb-4 mt-6 ml-60'>Our Aims</h1>
            <p className=' text-gray-600 text-sm md:w-2/4 ml-60'>Our vision at Green City Hospital is to redefine the healthcare experience by making it accessible, personalized, and hassle-free for everyone. We are dedicated to connecting patients with the right care at the right time, ensuring that you always have the support you need to live your healthiest life.</p>
          </motion.div>
        </div>
      </motion.div>
      <motion.div className='mb-8'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}>
        <h1 className='text-2xl font-semibold text-[#146A5D] mb-4'>Why Choose Us</h1>
        <div className='flex gap-4'>
          
          {/* Efficiency Section */}
          <motion.div className='rounded-lg p-4 flex-1 text-center shadow-lg'
            whileHover={{ scale: 1.05, backgroundColor: '#146A5D', color: 'white' }}
            transition={{ duration: 0.3 }}>
            <h2 className='text-xl font-semibold text-[#000000] mb-2'>Efficiency</h2>
            <p className='text-[#000000]'>Quick appointment scheduling and easy access to medical records.</p>
          </motion.div>

          {/* Reliability Section */}
          <motion.div className='rounded-lg p-4 flex-1 text-center shadow-lg'
            whileHover={{ scale: 1.05, backgroundColor: '#146A5D', color: 'white' }}
            transition={{ duration: 0.3 }}>
            <h2 className='text-xl font-semibold text-[#000000] mb-2'>Reliability</h2>
            <p className='text-[#000000]'>Consistent, high-quality care available whenever you need it.</p>
          </motion.div>

          {/* Trustworthiness Section */}
          <motion.div className='rounded-lg p-4 flex-1 text-center shadow-lg'
            whileHover={{ scale: 1.05, backgroundColor: '#146A5D', color: 'white' }}
            transition={{ duration: 0.3 }}>
            <h2 className='text-xl font-semibold text-[#000000] mb-2'>Trustworthiness</h2>
            <p className='text-[#000000]'>Transparent practices and protection of your privacy and health information.</p>
          </motion.div>

        </div>
      </motion.div>

    </div>
  );
}

export default UserAbout;
