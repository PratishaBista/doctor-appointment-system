import React, { useState } from 'react';
import AdminAppointments from './admin-pages/AdminAppointments';

const AdminHome = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const handleItemClick = (index) => {
      setActiveIndex(index); // Set active index to the clicked item
    };
  return (
    <>
    <div className="flex h-[90px] items-center justify-between px-6 border-gray-300 border-2 ">
    <div className="flex items-center space-x-3">
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQfxenNNiYLFgw9ADWtnw8ORRX02r2APch0Z_jYq_REVUFTAvHOP94Jn7uxdN_iF7lt3k&usqp=CAU" alt="Logo" className="h-12" />
      <p className="text-xl font-bold text-gray-800">Green City Hospital</p>
    </div>
   
    <button className="bg-[#146A5D] text-white h-[40px] w-[160px] rounded-full hover:bg-[#0F5247] transition ">
      Logout
    </button>
  </div>
<div className="flex">
    
  
  <div className="h-[90vh] w-[250px]  rounded-lg shadow-md p-4 flex flex-col justify-start space-y-4 border-2 border-gray-300 mt-1">
      {/* Sidebar Item */}
      <div
        onClick={() => handleItemClick(0)}
        className={`flex items-center space-x-3 p-2 rounded-lg cursor-pointer transition ${
          activeIndex === 0 ? "border-l-4 border-[#146A5D]" : ""
        }`}
      >
        <img className="h-[40px]" src="https://media.istockphoto.com/id/1186939191/vector/dashboard-icon-in-flat-style-finance-analyzer-vector-illustration-on-white-isolated.jpg?s=612x612&w=0&k=20&c=Uvzz2_C--rDfG9-oAJeS6HuYnvnvp7UFfY5rhGlvkPw=" alt="Dashboard Icon" />
        <p className="text-gray-800 font-medium">Dashboard</p>
      </div>

      {/* Appointment Item */}
      <div
        onClick={() => handleItemClick(1)}
        className={`flex items-center space-x-3 p-2 rounded-lg cursor-pointer transition ${
          activeIndex === 1 ? "border-l-4 border-[#146A5D]" : ""
        }`}
      >
        <img className="h-[40px]" src="https://static.vecteezy.com/system/resources/thumbnails/024/150/216/small_2x/calendar-icon-vector.jpg" alt="Appointment Icon" />
        <p className="text-gray-800 font-medium">Appointment</p>
      </div>

      {/* Add Doctor Item */}
      <div
        onClick={() => handleItemClick(2)}
        className={`flex items-center space-x-3 p-2 rounded-lg cursor-pointer transition ${
          activeIndex === 2 ? "border-l-4 border-[#146A5D]" : ""
        }`}
      >
        <img className="h-[40px]" src="https://static.vecteezy.com/system/resources/thumbnails/001/500/603/small/add-icon-free-vector.jpg" alt="Add Doctor Icon" />
        <p className="text-gray-800 font-medium">Add Doctor</p>
      </div>

      {/* Doctors List Item */}
      <div
        onClick={() => handleItemClick(3)}
        className={`flex items-center space-x-3 p-2 rounded-lg cursor-pointer transition ${
          activeIndex === 3 ? "border-l-4 border-[#146A5D]" : ""
        }`}
      >
        <img className="h-[40px]" src="https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg" alt="Doctors List Icon" />
        <p className="text-gray-800 font-medium">Doctors List</p>
      </div>
    </div>
    <AdminAppointments/>
   
</div>
       
  </>
  )
}

export default AdminHome
