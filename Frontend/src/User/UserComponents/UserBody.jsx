import React from 'react';

const UserBody = () => {
  return (
    <div className='mt-10 flex justify-center'>
      <div className="">
        <div className="relative">
            <h1 className='text-4xl font-bold text-center'>Your Health, Our Priority – Trusted Doctors, Caring for You</h1>
          {/* Image */}
          <img className='h-[570px] w-[70vw] mt-2 rounded-2xl' src="https://www.shutterstock.com/image-photo/cooperation-people-medical-community-teamwork-600nw-1971770123.jpg" alt="" />
          
          {/* Button on top of the image */}
          <button className="mb-24  absolute bottom-10 left-1/2 transform -translate-x-1/2 px-8 py-4 bg-[#146A5D] text-white rounded-lg hover:bg-[#0F5247] transition text-2xl">
            Book Appointment
          </button>
        </div>

      </div>
    </div>
  );
};

export default UserBody;
