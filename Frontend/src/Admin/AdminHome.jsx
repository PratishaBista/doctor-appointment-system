import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import AddDoctor from './admin-pages/AddDoctor';
import AdminAppointments from './admin-pages/AdminAppointments';
import AdminDashboard from './admin-pages/AdminDashboard';
import AdminDoctorsList from './admin-pages/AdminDoctorsList';

const AdminHome = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    if (location.pathname === "/admin") {
      navigate("/admin/dashboard");
    }
  }, [location.pathname, navigate]);


 const handleItemClick = (index) => {
    const routes = [
      "/admin/dashboard",
      "/admin/appointment",
      "/admin/addDoctor",
      "/admin/doctorList",
    ];
    navigate(routes[index]);
    setActiveIndex(index);
  };
  useEffect(() => {
    navigate("/admin/dashboard");
  }, []);

  return (
    <>
      <div className="flex h-[90px] items-center justify-between px-6 border-gray-300 border-2 ">
        <div className="flex items-center space-x-3">
          <img
          onClick={()=>navigate('/admin/dashboard')}
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQfxenNNiYLFgw9ADWtnw8ORRX02r2APch0Z_jYq_REVUFTAvHOP94Jn7uxdN_iF7lt3k&usqp=CAU" alt="Logo" className="h-12" />
          <p className="text-xl font-bold text-gray-800">Green City Hospital</p>
        </div>

        <button
          onClick={() => navigate("/admin/login")}
          className="bg-[#146A5D] text-white h-[40px] w-[160px] rounded-full hover:bg-[#0F5247] transition "
        >
          Logout
        </button>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="h-[90vh] w-[250px] rounded-lg shadow-md p-4 flex flex-col justify-start space-y-4 border-2 border-gray-300 mt-1">
          <div
            onClick={() => handleItemClick(0)}
            className={`flex items-center space-x-3 p-2 rounded-lg cursor-pointer transition ${
              activeIndex === 0 ? "border-l-4 border-[#146A5D]" : ""
            }`}
          >
            <img className="h-[40px]" src="https://media.istockphoto.com/id/1186939191/vector/dashboard-icon-in-flat-style-finance-analyzer-vector-illustration-on-white-isolated.jpg?s=612x612&w=0&k=20&c=Uvzz2_C--rDfG9-oAJeS6HuYnvnvp7UFfY5rhGlvkPw=" alt="Dashboard Icon" />
            <p className="text-gray-800 font-medium">Dashboard</p>
          </div>

          <div
            onClick={() => handleItemClick(1)}
            className={`flex items-center space-x-3 p-2 rounded-lg cursor-pointer transition ${
              activeIndex === 1 ? "border-l-4 border-[#146A5D]" : ""
            }`}
          >
            <img className="h-[40px]" src="https://static.vecteezy.com/system/resources/thumbnails/024/150/216/small_2x/calendar-icon-vector.jpg" alt="Appointment Icon" />
            <p className="text-gray-800 font-medium">Appointment</p>
          </div>

          <div
            onClick={() => handleItemClick(2)}
            className={`flex items-center space-x-3 p-2 rounded-lg cursor-pointer transition ${
              activeIndex === 2 ? "border-l-4 border-[#146A5D]" : ""
            }`}
          >
            <img className="h-[40px]" src="https://static.vecteezy.com/system/resources/thumbnails/001/500/603/small/add-icon-free-vector.jpg" alt="Add Doctor Icon" />
            <p className="text-gray-800 font-medium">Add Doctor</p>
          </div>

          <div
            onClick={() => handleItemClick(3)}
            className={`flex items-center space-x-3 p-2 rounded-lg cursor-pointer transition ${
              activeIndex === 3 ? "border-l-4 border-[#146A5D]" : ""
            }`}
          >
            <img className="h-[40px]" src="https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg" alt="Doctors List Icon" />
            <p className="text-gray-800 font-medium">Doctors List</p>
          </div>
        </div>

        {/* Main content area */}
        <div className="w-full p-6">
          <Routes>
            <Route path="/dashboard" element={<AdminDashboard />} />
            <Route path="/appointment" element={<AdminAppointments />} />
            <Route path="/addDoctor" element={<AddDoctor />} />
            <Route path="/doctorList" element={<AdminDoctorsList />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default AdminHome;
