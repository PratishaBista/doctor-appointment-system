import React, { useContext, useEffect, useState } from 'react';
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import AddDoctor from '../admin-pages/AddDoctor';
import AdminAppointments from '../admin-pages/AdminAppointments';
import AdminDashboard from '../admin-pages/AdminDashboard';
import AdminDoctorsList from '../admin-pages/AdminDoctorsList';
import { AdminContext } from '../context/AdminContext';

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
    else if (path.includes('doctor-list')) setActiveIndex(3);
  }, []);

  const handleItemClick = (index) => {
    const routes = [
      "/admin/dashboard",
      "/admin/appointments",
      "/admin/add-doctor",
      "/admin/doctor-list",
    ];
    navigate(routes[index]);
    setActiveIndex(index);
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="flex h-[90px] items-center justify-between px-6 border-b border-gray-300 bg-white sticky top-0 z-50">
        <div className="flex items-center space-x-3">
          <img
            onClick={() => handleItemClick(0)}
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQfxenNNiYLFgw9ADWtnw8ORRX02r2APch0Z_jYq_REVUFTAvHOP94Jn7uxdN_iF7lt3k&usqp=CAU"
            alt="Logo"
            className="h-12 cursor-pointer"
          />
          <p className="text-xl font-bold text-gray-800">Green City Hospital</p>
          <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600'>Admin</p>
        </div>

        <button
          onClick={handleLogout}
          className="bg-[#146A5D] text-white h-[40px] w-[160px] rounded-full hover:bg-[#0F5247] transition flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
          </svg>
          Logout
        </button>
      </div>

      {/* Main container for sidebar and content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div
          className={`h-full w-[250px] bg-white p-4 flex flex-col border-r border-gray-300 transition-all duration-300 ${
            isSidebarOpen ? 'block fixed inset-y-0 z-50 md:relative' : 'hidden md:block'
          }`}
        >
          {/* Close Button for Sidebar (Mobile view) */}
          <div className="md:hidden flex justify-end mb-4">
            <button
              className="text-gray-800 p-2"
              onClick={() => setIsSidebarOpen(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Sidebar menu items */}
          <div className="space-y-2">
            {[
              { 
                index: 0, 
                label: "Dashboard", 
                icon: "https://media.istockphoto.com/id/1186939191/vector/dashboard-icon-in-flat-style-finance-analyzer-vector-illustration-on-white-isolated.jpg?s=612x612&w=0&k=20&c=Uvzz2_C--rDfG9-oAJeS6HuYnvnvp7UFfY5rhGlvkPw=" 
              },
              { 
                index: 1, 
                label: "Appointments", 
                icon: "https://static.vecteezy.com/system/resources/thumbnails/024/150/216/small_2x/calendar-icon-vector.jpg" 
              },
              { 
                index: 2, 
                label: "Add Doctor", 
                icon: "https://static.vecteezy.com/system/resources/thumbnails/001/500/603/small/add-icon-free-vector.jpg" 
              },
              { 
                index: 3, 
                label: "Doctors List", 
                icon: "https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg" 
              }
            ].map((item) => (
              <div
                key={item.index}
                onClick={() => handleItemClick(item.index)}
                className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition ${
                  activeIndex === item.index ? 'bg-gray-100 border-l-4 border-[#146A5D]' : 'hover:bg-gray-50'
                }`}
              >
                <img className="h-6 w-6" src={item.icon} alt={`${item.label} Icon`} />
                <p className="text-gray-800 font-medium">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <Routes>
            <Route path="/dashboard" element={<AdminDashboard />} />
            <Route path="/appointments" element={<AdminAppointments />} />
            <Route path="/add-doctor" element={<AddDoctor />} />
            <Route path="/doctor-list" element={<AdminDoctorsList />} />
            <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
          </Routes>
        </div>

        {/* Mobile Menu Button */}
        {!isSidebarOpen && (
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="md:hidden fixed bottom-6 right-6 bg-[#146A5D] text-white rounded-full p-3 shadow-lg z-40"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default AdminHome;