// DoctorNavbar.jsx
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DoctorContext } from "../../context/DoctorContext";
import { toast } from "react-toastify";
import { FiMenu, FiBell, FiLogOut } from "react-icons/fi";
import HealthSolutionLogo from "../../assets/HealthSolutionLogo.svg";
import NotificationDropdown from "./NotificationDropdown";

const DoctorNavbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const { setDoctorToken, doctorData } = useContext(DoctorContext);

  const handleLogout = () => {
    localStorage.removeItem('doctor_token');
    setDoctorToken(null);
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <div className="flex h-16 items-center justify-between px-6 bg-white shadow-sm sticky top-0 z-[9000]">

      <div className="flex items-center justify-center h-20 px-4 border-b border-gray-200">
        <img
          src={HealthSolutionLogo}
          alt="HealthSolution Logo"
          className="h-12"
          onClick={() => navigate("/")}
        />
        {/* <div className="flex items-center space-x-4"> */}
        <button
          onClick={toggleSidebar}
          className="md:hidden text-gray-600"
        >
          <FiMenu className="w-6 h-6" />
        </button>
        <span className="text-sm bg-[#0288D1]/10 text-[#0288D1] px-2.5 py-0.5 rounded-full">Doctor</span>
      </div>

      <div className="flex items-center space-x-6">
        <NotificationDropdown />

        <div className="hidden md:flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-[#0288D1] flex items-center justify-center text-white font-medium">
            {doctorData?.name?.charAt(0) || 'D'}
          </div>
          <span className="text-sm font-medium text-gray-700">{doctorData?.name || 'Doctor'}</span>
        </div>

        <button
          onClick={handleLogout}
          className="text-sm font-medium text-gray-600 hover:text-[#0288D1] transition flex items-center gap-1"
        >
          <FiLogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default DoctorNavbar;