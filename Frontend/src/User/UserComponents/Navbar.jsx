import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import HealthSolutionLogo from "../../assets/HealthSolutionLogo.svg";

const Navbar = () => {
  const { token, setToken, userData = {} } = useContext(AppContext);
  const [active, setActive] = useState("Home");
  const navigate = useNavigate();
  const defaultImage = "data:image/png;base64,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";

  const logout = () => {
    setToken(false);
    localStorage.removeItem("token");
  };

  const handleNavigation = (page, route) => {
    setActive(page);
    navigate(route);
  };


  return (
    <div className="bg-white w-full">
      {/* Top Contact Bar */}
      <div className="bg-[#ffffff] text-black py-2 px-15">
        <div className="max-w-[2500px] mx-auto flex justify-between items-center">
          <div className="flex items-center cursor-pointer">
            <img
              onClick={() => { navigate("/"); window.scrollTo(0, 0); }}
              className="h-20 w-25 mr-4 transition transform"
              src={HealthSolutionLogo}
              alt="HealthSolution Logo"
            />
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 mr-2 text-[#4CAF50]"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              <span>+977 9841234567</span>
            </div>
            <div className="flex items-center">
              <a
                href="mailto:info@healthsolution.com"
                className="flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 mr-2 text-[#4CAF50]"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span>info@healthsolution.com</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-[2500px] mx-auto flex justify-between items-center px-40 py-3">
        <div className="hidden md:flex space-x-8 font-semibold">
          <div
            className={`relative cursor-pointer text-lg transition duration-300 ease-in-out 
              ${active === "Home" ? "text-[#0288D1]" : "text-gray-700 hover:text-[#0288D1]"}`}
            onClick={() => handleNavigation("Home", "/")}
          >
            <p className="font-medium">Home</p>
          </div>

          <div
            className={`relative cursor-pointer text-lg transition duration-300 ease-in-out 
              ${active === "Department" ? "text-[#0288D1]" : "text-gray-700 hover:text-[#0288D1]"}`}
            onClick={() => handleNavigation("Department", "/Department")}
          >
            <p className="font-medium">Department</p>
          </div>

          <div
            className={`relative cursor-pointer text-lg transition duration-300 ease-in-out 
              ${active === "Find Doctors" ? "text-[#0288D1]" : "text-gray-700 hover:text-[#0288D1]"}`}
            onClick={() => handleNavigation("Find Doctors", "/FindDoctors")}
          >
            <p className="font-medium">Find Doctors</p>
          </div>

          <div
            className={`relative cursor-pointer text-lg transition duration-300 ease-in-out 
              ${active === "Contact Us" ? "text-[#0288D1]" : "text-gray-700 hover:text-[#0288D1]"}`}
            onClick={() => handleNavigation("Contact Us", "/userContact")}
          >
            <p className="font-medium">Contact Us</p>
          </div>

          <div
            className={`relative cursor-pointer text-lg transition duration-300 ease-in-out 
              ${active === "About Us" ? "text-[#0288D1]" : "text-gray-700 hover:text-[#0288D1]"}`}
            onClick={() => handleNavigation("About Us", "/userAbout")}
          >
            <p className="font-medium">About Us</p>
          </div>
        </div>

        {/* Profile */}
        <div className="flex items-center relative">
          {token ? (
            <div className="flex items-center group relative">
              <div
                onClick={() => navigate("/dashboard")}
                className="flex items-center cursor-pointer"
                title="View my dashboard"
              >
                <img
                  className="h-10 w-10 rounded-full"
                  src={userData?.image || defaultImage}
                  alt="Profile"
                />
                <span className="ml-2 text-gray-700 group-hover:text-[#0288D1] hidden md:inline">
                  Dashboard
                </span>
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate("/auth")}
                className="px-6 py-2 text-lg font-semibold rounded-xl shadow-xl transition-all hover:brightness-115
                bg-[#0288D1] text-white border-2 border-white/20"
              >
                User Login
              </button>
              <button
                onClick={() => window.location.href = `${import.meta.env.VITE_STAFF_URL}/login`}
                className="px-6 py-2 text-lg font-semibold rounded-xl shadow-xl transition-all hover:brightness-115
        bg-[#4CAF50] text-white border-2 border-white/20"
              >
                Staff Login
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;