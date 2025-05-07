import React, { useState } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import DocSideBar from "./DoctorPages/DocSideBar";
import DoctorAppointment from "./DoctorPages/DoctorAppointment";
import DoctorDashboard from "./DoctorPages/DoctorDashboard";
import DoctorNavbar from "./DoctorPages/DoctorNavbar";
import DoctorProfile from "./DoctorPages/DoctorProfile";
import PatientsData from "./DoctorPages/PatientsData";

const DoctorHome = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="h-screen flex flex-col">
      <DoctorNavbar />
      <div className="flex flex-1 overflow-hidden">
        <DocSideBar />
        <div className="flex-1 p-6 bg-gray-100 overflow-y-auto">
          <Routes>
            <Route path="/dashboard" element={<DoctorDashboard />} />
            <Route path="/appointments" element={<DoctorAppointment />} />
            <Route path="/profile" element={<DoctorProfile />} />
            <Route path="/patients" element={<PatientsData />} />
            <Route path="*" element={<navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default DoctorHome;