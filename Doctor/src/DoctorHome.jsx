import React, { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import DoctorAppointment from "./DoctorComponents/DoctorAppointment";
import DoctorDashboard from "./DoctorComponents/DoctorDashboard";
import DoctorNavbar from "./DoctorComponents/DoctorNavbar";
import DoctorProfile from "./DoctorComponents/DoctorProfile";
import PatientsData from "./DoctorComponents/PatientsData";

const DoctorHome = () => {
  const [selected, setSelected] = useState("Dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to manage sidebar visibility
  const navigate = useNavigate();

  // Toggle sidebar visibility on mobile
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <DoctorNavbar />

      <div className="h-screen flex flex-col">
        <div className="flex flex-1 overflow-hidden">
          {/* Mobile Menu Icon */}
          <div className="lg:hidden p-4">
            <img
              onClick={toggleSidebar}
              className="w-8 h-8 cursor-pointer"
              src="https://images.icon-icons.com/3054/PNG/512/menu_option_setting_icon_190499.png"
              alt="Menu"
            />
          </div>

          {/* Sidebar */}
          <div
            className={`min-w-[16vw] min-h-screen p-4 transition-all duration-300 ${
              isSidebarOpen ? "block" : "hidden lg:block" // Show/Hide sidebar based on isSidebarOpen state
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

          {/* Main Content */}
          <div className="flex-1 p-6 bg-gray-100 overflow-y-auto lg:overflow-visible">
            {/* This ensures the content is scrollable on mobile */}
            <Routes>
              <Route path="/" element={<DoctorDashboard />} />
              <Route path="/doctorDashboard" element={<DoctorDashboard />} />
              <Route path="/doctorAppointment" element={<DoctorAppointment />} />
              <Route path="/doctorProfile" element={<DoctorProfile />} />
              <Route path="/patientsData" element={<PatientsData />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
};

export default DoctorHome;
