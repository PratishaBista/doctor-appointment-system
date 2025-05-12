// DocSideBar.jsx
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { FiHome, FiCalendar, FiUser, FiUsers, FiFileText } from "react-icons/fi";

const DocSideBar = ({ isSidebarOpen, toggleSidebar }) => {
  const [selected, setSelected] = useState("dashboard");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const pathSegments = location.pathname.split('/');
    const currentRoute = pathSegments[2] || 'dashboard';
    setSelected(currentRoute);
  }, [location.pathname]);

  const menuItems = [
    {
      name: "dashboard",
      label: "Dashboard",
      path: "/doctor/dashboard",
      icon: <FiHome className="w-5 h-5" />
    },
    {
      name: "appointments",
      label: "Appointments",
      path: "/doctor/appointments",
      icon: <FiCalendar className="w-5 h-5" />
    },
    {
      name: "patients",
      label: "Patients",
      path: "/doctor/appointments",
      icon: <FiUsers className="w-5 h-5" />
    },
    {
      name: "profile",
      label: "Profile",
      path: "/doctor/profile",
      icon: <FiUser className="w-5 h-5" />
    }
  ];

  return (
    <div
      className={`fixed md:relative h-full w-64 bg-white p-4 flex flex-col shadow-sm transition-all duration-300 z-30 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
    >
      {/* Mobile menu button */}
      <div className="md:hidden p-4 flex justify-end">
        <button
          onClick={toggleSidebar}
          className="text-gray-600 hover:text-gray-800"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Menu Items */}
      <div className="space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.name}
            onClick={() => {
              setSelected(item.name);
              navigate(item.path);
              toggleSidebar();
            }}
            className={`w-full flex items-center space-x-3 p-3 rounded-lg transition ${selected === item.name
                ? 'bg-[#0288D1]/10 text-[#0288D1] font-medium'
                : 'text-gray-600 hover:bg-gray-100'
              }`}
          >
            <span className={`${selected === item.name ? 'text-[#0288D1]' : 'text-gray-500'}`}>
              {item.icon}
            </span>
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DocSideBar;