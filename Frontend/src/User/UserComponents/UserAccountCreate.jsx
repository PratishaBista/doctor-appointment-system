import React from 'react';

const UserAccountCreate = () => {
  return (
    <div className='flex flex-col md:flex-row items-center justify-center w-full p-8 bg-gray-100 mt-6'>
      <div className="flex flex-col items-center md:items-start text-center md:text-left w-full md:w-[500px] space-y-4">
        <h1 className='text-3xl font-bold text-[#146A5D]'>Don't have an account?</h1>
        <p className='text-lg text-gray-700'>Join Our Family</p>
        <button className='bg-[#146A5D] hover:bg-[#125347] text-white text-lg font-semibold px-6 py-3 rounded-lg shadow-md transition-all'>
          Create An Account
        </button>
      </div>

      <div className="mt-6 md:mt-0 md:ml-8">
        <img 
          className='h-[400px] w-auto rounded-lg shadow-md' 
          src="https://img.freepik.com/free-vector/doctor-character-background_1270-84.jpg" 
          alt="Doctor Illustration" 
        />
      </div>
    </div>
  );
};

export default UserAccountCreate;
