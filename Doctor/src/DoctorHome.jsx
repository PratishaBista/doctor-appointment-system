import React, { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import DocSideBar from "./DoctorComponents/DocSideBar";
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
        <DocSideBar/>

          {/* Main Content */}
            {/* Main content */}
            <div className="flex-1 p-6 bg-gray-100 overflow-y-auto">
          <Routes>
            <Route path="/doctorDashboard" element={<DoctorDashboard />} />
            <Route path="/doctorAppointment" element={<DoctorAppointment />} />
            <Route path="/doctorProfile" element={<DoctorProfile />} />
            <Route path="/patientsData" element={<PatientsData />} />
            {/* fallback route */}
            <Route path="*" element={<DoctorDashboard />} />
          </Routes>
        </div>
        </div>
      </div>
    </>
  );
};

export default DoctorHome;
