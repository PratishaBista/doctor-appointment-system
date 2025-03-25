import React from 'react';

const UserBody = () => {
  const doctorSpecialties = [
    {
      name: "Cardiology",
      description: "Specializes in the diagnosis and treatment of heart conditions, including heart attacks, arrhythmias, and other cardiovascular diseases.",
      img: "https://www.shutterstock.com/image-vector/heart-icon-flat-style-vector-600nw-2471170029.jpg"
    },
    {
      name: "Neurology",
      description: "Focuses on the nervous system, including the brain, spinal cord, and peripheral nerves, treating disorders like epilepsy, Alzheimer's, and Parkinson's disease.",
      img: "https://c8.alamy.com/comp/2NKPG2Y/neurology-icon-monochrome-simple-sign-from-medical-speialist-collection-neurology-icon-for-logo-templates-web-design-and-infographics-2NKPG2Y.jpg"
    },
    {
      name: "Orthopedics",
      description: "Deals with the treatment of bones, joints, ligaments, tendons, and muscles, including fractures, arthritis, and sports injuries.",
      img: "https://cdn-icons-png.flaticon.com/512/9340/9340043.png"
    },
    {
      name: "Psychiatry",
      description: "Focuses on the diagnosis, treatment, and prevention of mental health disorders such as depression, anxiety, schizophrenia, and bipolar disorder.",
      img:"https://cdn-icons-png.flaticon.com/512/12024/12024688.png"
    },]
  return (
    <div className='mt-16 flex flex-col items-center px-4'>
      <h1 className='text-5xl font-bold text-center max-w-3xl leading-tight text-gray-800'>
        Your Health, Our Priority – Trusted Doctors, Caring for You
      </h1>
      
      <div className='mt-6 flex flex-col items-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6'>
        <button className='bg-[#146A5D] hover:bg-green-900 text-white text-xl font-semibold px-6 py-3 rounded-lg shadow-md transition-all'>
          Book an Appointment
        </button>
        
        <h4 className='text-2xl font-semibold text-gray-700 text-center sm:text-left'>
          - All your health concerns in a single platform
        </h4>
      </div>
      <div className="">
      <div className="p-6 mt-8">
      <h1 className="text-4xl font-bold underline mb-6 text-center mt-2">Our Services</h1>

      <div className="flex flex-wrap gap-6 justify-center ">
        {doctorSpecialties.map((specialty, index) => (
          <div
            key={index}
            className="transform hover:scale-105 transition duration-500 ease-in-out bg-white shadow-lg rounded-lg p-4 w-1/3 sm:w-1/4 md:w-1/6 hover:shadow-2xl"
          >
            <div className="flex justify-center mb-4 m-2">
              <img
                className="rounded-lg w-32 h-32 object-cover"
                src={specialty.img}
                alt={specialty.name}
              />
            </div>
            <h2 className="text-xl font-bold text-center mb-2">{specialty.name}</h2>
            <p className="text-gray-600 text-sm text-center">{specialty.description}</p>
          </div>
        ))}
      </div>
    </div>
      </div>
      <button className='bg-[#146A5D] hover:bg-green-900 text-white text-xl font-semibold px-6 py-3 rounded-lg shadow-md transition-all mt-3'>
          More
        </button>
    </div>
  );
};

export default UserBody;