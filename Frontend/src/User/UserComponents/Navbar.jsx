import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

const Navbar = () => {
  const {userData}=useContext(AppContext)
  const [active, setActive] = useState("Home");
  const navigate = useNavigate();
  const { account } = useContext(AppContext);
  const [dropDown, setDropDown] = useState(false);
  const dropdownRef = useRef(null);

  const handleNavigation = (page, route) => {
    setActive(page);
    navigate(route);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropDown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-white w-full shadow-md">
      <div className="max-w-[2200px] mx-auto flex justify-between items-center px-6 py-4">
        
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <img
            className="h-[45px] w-[45px] rounded-full cursor-pointer transition transform hover:scale-105"
            onClick={() => {
              navigate("/");
              window.scrollTo(0, 0);
            }}
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQfxenNNiYLFgw9ADWtnw8ORRX02r2APch0Z_jYq_REVUFTAvHOP94Jn7uxdN_iF7lt3k&usqp=CAU"
            alt="Logo"
          />
          <p className="text-2xl font-bold text-[#146A5D] transition duration-300 transform hover:scale-110 hover:text-gray-400">
            Green City Hospital
          </p>
        </div>

        {/* Navigation (Without Map Method) */}
        <div className="hidden md:flex space-x-8 font-semibold">
          <div
            className={`relative cursor-pointer text-lg transition duration-300 ease-in-out 
              ${active === "Home" ? "text-gray-400" : "text-[#146A5D] hover:text-gray-400"}`}
            onClick={() => handleNavigation("Home", "/")}
          >
            <p className="font-bold">Home</p>
          </div>

          <div
            className={`relative cursor-pointer text-lg transition duration-300 ease-in-out 
              ${active === "Our Services" ? "text-gray-400" : "text-[#146A5D] hover:text-gray-400"}`}
            onClick={() => handleNavigation("Our Services", "/ourServices")}
          >
            <p className="font-bold">Our Services</p>
          </div>

          <div
            className={`relative cursor-pointer text-lg transition duration-300 ease-in-out 
              ${active === "Contact Us" ? "text-gray-400" : "text-[#146A5D] hover:text-gray-400"}`}
            onClick={() => handleNavigation("Contact Us", "/userContact")}
          >
            <p className="font-bold">Contact Us</p>
          </div>

          <div
            className={`relative cursor-pointer text-lg transition duration-300 ease-in-out 
              ${active === "About Us" ? "text-gray-400" : "text-[#146A5D] hover:text-gray-400"}`}
            onClick={() => handleNavigation("About Us", "/userAbout")}
          >
            <p className="font-bold">About Us</p>
          </div>
        </div>

        {/* Profile / Auth Button */}
        <div className="flex items-center mr-6 relative">
          {account ? (
            <div className="relative" ref={dropdownRef}>
              <div className="flex items-center">
                <img
                  onClick={()=>navigate('/profile')}
                  className="h-10 w-10 rounded-full"
                  src={userData.image}
                  alt="Profile"
                />
                <img
                  onClick={() => setDropDown((prev) => !prev)}
                  className="h-8 ml-2 mt-1 cursor-pointer"
                  src="https://www.svgrepo.com/show/345223/three-dots-vertical.svg"
                  alt="Menu"
                />
              </div>

              {/* Dropdown Menu */}
              {dropDown && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-md py-2 z-50">
                  <p onClick={()=>navigate("/profile")}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Profile</p>
                  <p className="px-4 py-2 hover:bg-gray-100 cursor-pointer">My Appointments</p>
                  <p
                    onClick={() => navigate("/auth")}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-600"
                  >
                    Logout
                  </p>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => navigate("/auth")}
              className="text-lg text-white rounded-sm py-2 px-6 hover:bg-[#0F5247] transform transition duration-300 ease-in-out hover:scale-105 bg-[#146A5D]"
            >
              Create an Account
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
