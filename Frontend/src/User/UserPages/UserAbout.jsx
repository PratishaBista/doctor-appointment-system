import React from 'react';
import { motion } from 'framer-motion';

const UserAbout = () => {
  return (
    <div className='p-6 bg-white text-gray-800'>
      <motion.div className='h-[110px] flex items-center justify-center bg-[#146A5D] text-white mb-6'
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}>
        <h1 className='text-3xl font-semibold'>About Us</h1>
      </motion.div>

      <motion.div className='flex gap-6 mb-8'
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}>
        <div className='w-1/3'>
          <img
            
            src='https://e.snmc.io/lk/f/x/5690ed70fe5648c1c362012f293a59b7/9270989'
            alt='Hospital Building'
            className='w-full rounded-lg shadow-lg h-[410px]'
          />
        </div>
        <div className='w-2/3'>
          <h1 className='font-bold'></h1>
          <p className='mb-4 mt-14'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam, libero delectus. Temporibus eum, eligendi iusto vitae deleniti totam deserunt? Impedit sed consectetur ducimus dolores. Ratione vitae non repellat neque odit.</p>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime molestias omnis, rem possimus quibusdam distinctio tempore magnam odio deserunt esse aspernatur sunt necessitatibus fugit beatae temporibus facilis aliquid odit praesentium.</p>
          <motion.div className='mb-8'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}>
        <h1 className='text-2xl font-semibold text-[#146A5D] mb-4 mt-6'>Our Aims</h1>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam rem eum tenetur ipsum unde. Vel doloremque perferendis exercitationem, dolorem dicta impedit, voluptatum provident id minus voluptatibus nisi totam quos eius?</p>
      </motion.div> 
        </div>
      </motion.div>



      <motion.div className='mb-8'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}>
        <h1 className='text-2xl font-semibold text-[#146A5D] mb-4'>Why Choose Us</h1>
        <div className='flex gap-4'>
          {['Efficiency', 'Reliability', 'Trustworthiness'].map((quality, idx) => (
            <motion.div key={idx} className='border-2 border-[#146A5D] rounded-lg p-4 flex-1 text-center shadow-lg'
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}>
              <h2 className='text-xl font-semibold text-[#146A5D] mb-2'>{quality}</h2>
              <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default UserAbout;
