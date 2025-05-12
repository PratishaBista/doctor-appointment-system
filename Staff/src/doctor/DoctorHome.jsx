// DoctorHome.jsx
import React, { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import DocSideBar from "./DoctorPages/DocSideBar";
import DoctorAppointment from "./DoctorPages/DoctorAppointment";
import DoctorDashboard from "./DoctorPages/DoctorDashboard";
import DoctorNavbar from "./DoctorPages/DoctorNavbar";
import DoctorProfile from "./DoctorPages/DoctorProfile";
import PatientAppointmentDetail from "./DoctorPages/PatientAppointmentDetail";

const DoctorHome = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F6FA]">
      <DoctorNavbar toggleSidebar={toggleSidebar} />
      <div className="flex flex-1 overflow-hidden">
        <DocSideBar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className={`flex-1 overflow-y-auto transition-all duration-300 ${isSidebarOpen ? 'ml-64 md:ml-0' : 'ml-0'}`}>
          <div className="p-6">
            <Routes>
              <Route path="dashboard" element={<DoctorDashboard />} />
              <Route path="appointments" element={<DoctorAppointment />} />
              <Route path="appointments/:appointmentId" element={<PatientAppointmentDetail />} />
              <Route path="profile" element={<DoctorProfile />} />
              <Route index element={<DoctorDashboard />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorHome;