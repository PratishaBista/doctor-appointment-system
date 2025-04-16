import React, { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";

const DocSideBar = () => {
  const [selected, setSelected] = useState("Dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    if (location.pathname.includes("doctorDashboard")) setSelected("Dashboard");
    else if (location.pathname.includes("doctorAppointment")) setSelected("Appointments");
    else if (location.pathname.includes("doctorProfile")) setSelected("Profile");
  }, [location.pathname]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Mobile menu button */}
      <div className="lg:hidden p-4">
        <img
          onClick={toggleSidebar}
          className="w-8 h-8 cursor-pointer"
          src="https://images.icon-icons.com/3054/PNG/512/menu_option_setting_icon_190499.png"
          alt="Menu"
        />
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div
          className={`min-w-[16vw] min-h-screen p-4 transition-all duration-300 bg-white ${
            isSidebarOpen ? "block" : "hidden lg:block"
          }`}
        >
          <div
            className={`p-3 rounded-md cursor-pointer transition duration-200 ${
              selected === "Dashboard" ? "border-l-4 border-[#146A5D]" : ""
            }`}
            onClick={() => {
              setSelected("Dashboard");
              navigate("/doctorDashboard");
            }}
          >
            Dashboard
          </div>

          <div
            className={`p-3 rounded-md cursor-pointer transition duration-200 ${
              selected === "Appointments" ? "border-l-4 border-[#146A5D]" : ""
            }`}
            onClick={() => {
              setSelected("Appointments");
              navigate("/doctorAppointment");
            }}
          >
            Appointments
          </div>

          <div
            className={`p-3 rounded-md cursor-pointer transition duration-200 ${
              selected === "Profile" ? "border-l-4 border-[#146A5D]" : ""
            }`}
            onClick={() => {
              setSelected("Profile");
              navigate("/doctorProfile");
            }}
          >
            Profile
          </div>
        </div>

    
      </div>
    </div>
  );
};

export default DocSideBar;