import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DoctorContext } from "../../context/DoctorContext";
import { toast } from "react-toastify";

const DoctorNavbar = () => {
  const navigate = useNavigate();
  const { setDoctorToken } = useContext(DoctorContext);

  const handleLogout = () => {
    localStorage.removeItem('doctor_token');
    setDoctorToken(null);
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const handleLogoClick = () => {
    window.scrollTo(0, 0);
    navigate("/doctor/dashboard");
  };

  return (
    <div className="w-full mx-auto flex justify-between items-center px-6 py-4 shadow bg-white sticky top-0 z-50">
      {/* Logo & Hospital Name */}
      <div className="flex items-center space-x-3">
        <img
          className="h-[45px] w-[45px] rounded-full cursor-pointer transition-transform hover:scale-105"
          onClick={handleLogoClick}
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQfxenNNiYLFgw9ADWtnw8ORRX02r2APch0Z_jYq_REVUFTAvHOP94Jn7uxdN_iF7lt3k&usqp=CAU"
          alt="Hospital Logo"
        />
        <p
          className="text-2xl font-bold text-[#146A5D] transition duration-300 hover:text-gray-500 cursor-pointer"
          onClick={handleLogoClick}
        >
          Green City Hospital
        </p>
        <div className="border border-[#146A5D] rounded-full p-2 px-4 text-[#146A5D] text-sm font-medium">
          Doctor Portal
        </div>
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="bg-[#146A5D] text-white h-[40px] w-[160px] rounded-full hover:bg-[#0F5247] transition flex items-center justify-center space-x-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
        </svg>
        <span>Logout</span>
      </button>
    </div>
  );
};

export default DoctorNavbar;