import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import HealthSolutionLogo from "../../assets/HealthSolutionLogo.svg";
import { AppContext } from "../../context/AppContext";

const Navbar = () => {
  const { token, setToken, userData = {} } = useContext(AppContext);
  const { notifications, setNotifications,defaultImage } = useContext(AppContext);
  const [active, setActive] = useState("Home");
  const navigate = useNavigate();
  const [dropDown, setDropDown] = useState(false);
  const [notificationDropDown, setNotificationDropDown] = useState(false);
  const dropdownRef = useRef(null);
  const notificationRef = useRef(null);
  const [expandedIndex, setExpandedIndex] = useState(null);


  // Effect for handling clicks outside the notification dropdown
  useEffect(() => {
    // Handler function to close dropdown when clicked outside
    const handleClickOutside = (event) => {
      if (notificationDropDown && notificationRef.current && !notificationRef.current.contains(event.target)) {
        setNotificationDropDown(false);
      }

      if (dropDown && dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropDown(false);
      }
    };

    // Add event listener for mouse clicks anywhere in the document
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup - remove event listener when component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [notificationDropDown, dropDown]);

  const logout = () => {
    setToken(false);
    localStorage.removeItem("token");
  };

  const handleNavigation = (page, route) => {
    setActive(page);
    navigate(route);
  };

  const toggleNotification = (index) => {
    // 1. Toggle expanded notification
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));

    // 2. Set the status of this notification to true
    setNotifications((prev) =>
      prev.map((item, i) => (i === index ? { ...item, status: true } : item))
    );
  };

  return (
    <div className="bg-white w-full">
      {/* Top Contact Bar */}
      <div className="bg-[#ffffff] text-black py-2 px-15">
        <div className="max-w-[2500px] mx-auto flex justify-between items-center">
          <div className="flex items-center cursor-pointer">
            <img
              onClick={() => {
                navigate("/");
                window.scrollTo(0, 0);
              }}
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
               <path d="M2 3a1 1 0 0 1 1-1h2.153a1 1 0 0 1 .986.836l.74 4.435a1 1 0 0 1-.54 1.06l-1.548.773a11.037 11.037 0 0 0 6.105 6.105l.774-1.548a1 1 0 0 1 1.059-.54l4.435.74a1 1 0 0 1 .836.986V17a1 1 0 0 1-1 1h-2C7.82 18 2 12.18 2 5V3z" />
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
              ${
                active === "Home"
                  ? "text-[#0288D1]"
                  : "text-gray-700 hover:text-[#0288D1]"
              }`}
            onClick={() => handleNavigation("Home", "/")}
          >
            <p className="font-medium">Home</p>
          </div>

          <div
            className={`relative cursor-pointer text-lg transition duration-300 ease-in-out 
              ${
                active === "Department"
                  ? "text-[#0288D1]"
                  : "text-gray-700 hover:text-[#0288D1]"
              }`}
            onClick={() => handleNavigation("Department", "/Department")}
          >
            <p className="font-medium">Department</p>
          </div>

          <div
            className={`relative cursor-pointer text-lg transition duration-300 ease-in-out 
              ${
                active === "Find Doctors"
                  ? "text-[#0288D1]"
                  : "text-gray-700 hover:text-[#0288D1]"
              }`}
            onClick={() => handleNavigation("Find Doctors", "/FindDoctors")}
          >
            <p className="font-medium">Find Doctors</p>
          </div>

          <div
            className={`relative cursor-pointer text-lg transition duration-300 ease-in-out 
              ${
                active === "Contact Us"
                  ? "text-[#0288D1]"
                  : "text-gray-700 hover:text-[#0288D1]"
              }`}
            onClick={() => handleNavigation("Contact Us", "/userContact")}
          >
            <p className="font-medium">Contact Us</p>
          </div>

          <div
            className={`relative cursor-pointer text-lg transition duration-300 ease-in-out 
              ${
                active === "About Us"
                  ? "text-[#0288D1]"
                  : "text-gray-700 hover:text-[#0288D1]"
              }`}
            onClick={() => handleNavigation("About Us", "/userAbout")}
          >
            <p className="font-medium">About Us</p>
          </div>
        </div>

        {/* Profile / Auth Button */}
        <div className="flex items-center mr-6 relative">
          <div ref={notificationRef} className="relative">
            <img
              onClick={() => setNotificationDropDown(!notificationDropDown)}
              className="h-[60px] mr-4 cursor-pointer"
              src="https://static.vecteezy.com/system/resources/previews/006/086/198/original/notification-icon-for-web-vector.jpg"
              alt=""
            />
            <p className="absolute left-[33px] bottom-[24px] bg-red-500 rounded-full px-1 font-bold text-[16px]">
              {notifications?.filter((item) => !item.status).length || 0}
            </p>
            {notificationDropDown ? (
              <div className="absolute top-[80px] right-[10px] h-[90vh] w-[18rem] bg-white z-50 border border-gray-200 shadow-xl rounded-xl overflow-y-auto">
                <h3 className="text-lg font-semibold text-gray-700 p-4 border-b">
                  Notifications
                </h3>

                {/* Example Notification Items will cover after the model is ready */}
                {notifications.map((not, index) => (
                  <div
                    key={index}
                    className={`p-4 m-2 rounded-lg shadow-sm cursor-pointer transition ${
                      !not.status
                        ? "bg-blue-100 hover:bg-blue-200"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                    onClick={() => {
                      toggleNotification(index);
                    }}
                  >
                    <p className="text-sm text-gray-800 font-medium">
                      {expandedIndex === index
                        ? not.header
                        : not.header.length > 29
                        ? `${not.header.slice(0, 29)}...`
                        : not.header}
                    </p>
                    <span className="text-xs text-gray-500 block mt-1">
                      {expandedIndex === index
                        ? not.body
                        : not.body.length > 68
                        ? `${not.body.slice(0, 68)}...`
                        : not.body}
                    </span>
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          {token ? (
            <div className="flex items-center group relative" ref={dropdownRef}>
              <div
                onClick={() => navigate("/dashboard")}
                className="flex items-center cursor-pointer"
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
                className="px-6 py-2 text-lg font-semibold rounded-xl shadow-xl transition-all hover:brightness-115 bg-[#0288D1] text-white border-2 border-white/20"
              >
                User Login
              </button>
              <button
                onClick={() =>navigate("/admin")
                }
                className="px-6 py-2 text-lg font-semibold rounded-xl shadow-xl transition-all hover:brightness-115 bg-[#4CAF50] text-white border-2 border-white/20"
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