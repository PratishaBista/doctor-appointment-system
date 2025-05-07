import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";

const DocSideBar = () => {
  const [selected, setSelected] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const pathSegments = location.pathname.split('/');
    const currentRoute = pathSegments[2] || 'dashboard';
    
    setSelected(currentRoute);
  }, [location.pathname]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const menuItems = [
    { name: "dashboard", label: "Dashboard", path: "/doctor/dashboard" },
    { name: "appointments", label: "Appointments", path: "/doctor/appointments" },
    { name: "profile", label: "Profile", path: "/doctor/profile" },
    { name: "patients", label: "Patients", path: "/doctor/patients" }
  ];

  return (
    <div className={`min-w-[16vw] min-h-screen p-4 transition-all duration-300 bg-white ${
      isSidebarOpen ? "block" : "hidden lg:block"
    }`}>
      {/* Mobile menu button */}
      <div className="lg:hidden p-4 flex justify-end">
        <button onClick={toggleSidebar} className="text-gray-600 hover:text-gray-800">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Menu Items */}
      <div className="space-y-2">
        {menuItems.map((item) => (
          <div
            key={item.name}
            className={`p-3 rounded-md cursor-pointer transition duration-200 hover:bg-gray-100 ${
              selected === item.name ? "border-l-4 border-[#146A5D] bg-gray-50" : ""
            }`}
            onClick={() => {
              setSelected(item.name);
              navigate(item.path);
            }}
          >
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocSideBar;