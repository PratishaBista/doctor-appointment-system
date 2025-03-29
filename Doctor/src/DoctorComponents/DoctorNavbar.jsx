import React from "react";


const DoctorNavbar = () => {


  return (
    <div className="max-w-[2200px] mx-auto flex justify-between items-center px-6 py-4 shadow max-h-[197px]">
      {/* Logo & Hospital Name */}
      <div className="flex items-center space-x-3">
        <img
          className="h-[45px] w-[45px] rounded-full cursor-pointer transition-transform hover:scale-105"
          onClick={() => {
           
            window.scrollTo(0, 0);
          }}
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQfxenNNiYLFgw9ADWtnw8ORRX02r2APch0Z_jYq_REVUFTAvHOP94Jn7uxdN_iF7lt3k&usqp=CAU"
          alt="Logo"
        />
        <p
          className="text-2xl font-bold text-[#146A5D] transition duration-300 hover:text-gray-500 cursor-pointer"
        
        >
          Green City Hospital
        </p>
        <div className="border border-[#146A5D] rounded-full p-2 px-4 text-[#146A5D]">
          Doctor
        </div>
      </div>

      {/* Logout Button */}
      <button
       
        className="bg-[#146A5D] text-white h-[40px] w-[160px] rounded-full hover:bg-[#0F5247] transition"
      >
        Logout
      </button>
    </div>
  );
};

export default DoctorNavbar;
