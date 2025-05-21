import React, { useContext, useEffect, useState } from 'react';
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import AddDoctor from '../admin/AddDoctor';
import AdminAppointments from '../admin/AdminAppointments';
import AdminDashboard from '../admin/AdminDashboard';
import AdminDoctorsList from '../admin/AdminDoctorsList';
import AddPathologist from '../admin/AddPathologist';
import AdminPathologistList from '../admin/AdminPathologistList';
import { AdminContext } from '../context/AdminContext';
import HealthSolutionLogo from '../assets/HealthSolutionLogo.svg';
import NotificationDropdown from '../admin/NotificationDropdown';

const AdminHome = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { admin_token, setAdminToken } = useContext(AdminContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    setAdminToken(null);
    navigate('/login');
  };

  useEffect(() => {
    const path = window.location.pathname;
    if (path.includes('dashboard')) setActiveIndex(0);
    else if (path.includes('appointments')) setActiveIndex(1);
    else if (path.includes('add-doctor')) setActiveIndex(2);
    else if (path.includes('add-pathologist')) setActiveIndex(3);
    else if (path.includes('doctor-list')) setActiveIndex(4);
    else if (path.includes('pathologist-list')) setActiveIndex(5);

  }, []);

  const handleItemClick = (index) => {
    const routes = [
      "/admin/dashboard",
      "/admin/appointments",
      "/admin/add-doctor",
      "/admin/add-pathologist",
      "/admin/doctor-list",
      "/admin/pathologist-list",
    ];
    navigate(routes[index]);
    setActiveIndex(index);
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F6FA]">
      {/* Header */}
      <div className="flex h-16 items-center justify-between px-6 bg-white shadow-sm sticky top-0 z-50">
        <div className="flex items-center space-x-4">
          {/* Mobile menu button */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="md:hidden text-gray-600"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Logo */}
          <div className="flex items-center justify-center h-20 px-4 border-b border-gray-200">
            <img
              src={HealthSolutionLogo}
              alt="HealthSolution Logo"
              className="h-12"
              onClick={() => navigate("/")}
            />
          </div>
          <span className="text-sm bg-[#0288D1]/10 text-[#0288D1] px-2.5 py-0.5 rounded-full">Admin</span>
        </div>

        <div className="flex items-center space-x-6">
          {/* Notifications */}
         <NotificationDropdown />
          <div className="hidden md:flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-[#0288D1] flex items-center justify-center text-white font-medium">
              {admin_token?.name?.charAt(0) || 'A'}
            </div>
            <span className="text-sm font-medium text-gray-700">{admin_token?.name || 'Admin'}</span>
          </div>
          <button
            onClick={handleLogout}
            className="text-sm font-medium text-gray-600 hover:text-[#0288D1] transition flex items-center gap-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
            </svg>
            Logout
          </button>
        </div>
      </div>

      {/* Main container for sidebar and content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div
          className={`h-full w-64 bg-[#F5F6FA] p-4 flex flex-col  transition-all duration-300 ${isSidebarOpen ? 'fixed inset-y-0 z-40 md:relative' : 'hidden md:block'
            }`}
        >
          {/* Sidebar menu items */}
          <div className="space-y-1 mt-4">
            {[
              {
                index: 0,
                label: "Dashboard",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                )
              },
              {
                index: 1,
                label: "Appointments",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                )
              },
              {
                index: 2,
                label: "Add Doctor",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                  </svg>
                )
              },
              {
                index: 3,
                label: "Add Pathologist",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                  </svg>
                )
              },
              {
                index: 4,
                label: "Doctors List",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v1h8v-1zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-1a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v1h-3zM4.75 12.094A5.973 5.973 0 004 15v1H1v-1a3 3 0 013.75-2.906z" />
                  </svg>
                )
              },
              {
                index: 5,
                label: "Pathologist List",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v1h8v-1zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-1a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v1h-3zM4.75 12.094A5.973 5.973 0 004 15v1H1v-1a3 3 0 013.75-2.906z" />
                  </svg>
                )
              }
            ].map((item) => (
              <button
                key={item.index}
                onClick={() => handleItemClick(item.index)}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg transition ${activeIndex === item.index
                  ? 'bg-[#0288D1]/10 text-[#0288D1] font-medium'
                  : 'text-gray-600 hover:bg-gray-100'
                  }`}
              >
                <span className={`${activeIndex === item.index ? 'text-[#0288D1]' : 'text-gray-500'}`}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className={`flex-1 overflow-y-auto p-6 transition-all duration-300 ${isSidebarOpen ? 'ml-64 md:ml-0' : 'ml-0'
          }`}>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <Routes>
              <Route path="/dashboard" element={<AdminDashboard />} />
              <Route path="/appointments" element={<AdminAppointments />} />
              <Route path="/add-doctor" element={<AddDoctor />} />
              <Route path="/add-pathologist" element={<AddPathologist />} />
              <Route path="/doctor-list" element={<AdminDoctorsList />} />
              <Route path="/pathologist-list" element={<AdminPathologistList />} />
              <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;