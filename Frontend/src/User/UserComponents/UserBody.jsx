import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';

const UserBody = () => {
  const navigate =useNavigate()
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
      img:"https://cdn-icons-png.flaticon.com/512/12024/12024688.png"
    },
  ];
  const {selectedSpecialty,setSelectedSpecialty}=useContext(AppContext)

  return (
    <div className="flex flex-col items-center px-4 mt-10">
      
      {/* Hero Title */}
      <h1 className="text-3xl md:text-5xl font-bold leading-tight text-gray-800 max-w-3xl mx-auto text-center">
        Your Health Our Priority 
      </h1>

      {/* Hero Section with Transparent Image */}
      <div className="relative w-[100vw] flex justify-center mt-6">
        <img 
          className="w-[87vw] h-[500px] md:h-[570px] object-cover rounded-2xl shadow-lg "
          src="https://img.freepik.com/free-photo/close-up-doctor-with-copy-space_23-2148814244.jpg?t=st=1742957571~exp=1742961171~hmac=fe85ae5ec88e437032dd745630d9162f65bff4b7dff1a0713729ae8ae0c3001e&w=1380"
          alt="Medical Team"
        />
        <div className="absolute top-29 right-24 transform -translate-x-1/2  text-white rounded-xl  transition-all text-lg md:text-2xl opacity-80">
          <h1 className='text-black text-4xl font-semibold w-[500px]'>All Your Health concern in a single Platform</h1>
          <button
          onClick={()=>navigate("/ourServices")}
          className=' mt-4  hover:bg-slate-50 border-2 border-slate-100 px-8 py-4 bg-slate-200 rounded-xl shadow-2xl text-black'>Book Appointment</button>

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
            onClick={()=>{setSelectedSpecialty(specialty)
              console.log("clicked")
              navigate("/selectedSpeciality")
              scrollTo(0,0)
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
    window.scrollTo(0, 0); // Fixed scroll function name
  }}
>
  More
</button>

    </div>
  );
};

export default UserBody;
