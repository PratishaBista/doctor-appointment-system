import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

const Navbar = () => {
  const { token, setToken, userData = {} } = useContext(AppContext);
  const [active, setActive] = useState("Home");
  const navigate = useNavigate();
  const [dropDown, setDropDown] = useState(false);
  const dropdownRef = useRef(null);
  const defaultImage = "data:image/png;base64,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";

  const logout = () => {
    setToken(false);
    localStorage.removeItem("token");
  };

  const handleNavigation = (page, route) => {
    setActive(page);
    navigate(route);
  };

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
            className="h-[45px] w-[45px] rounded-full cursor-pointer transition transform"
            onClick={() => {
              navigate("/");
              window.scrollTo(0, 0);
            }}
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQfxenNNiYLFgw9ADWtnw8ORRX02r2APch0Z_jYq_REVUFTAvHOP94Jn7uxdN_iF7lt3k&usqp=CAU"
            alt="Logo"
          />
          <p onClick={() => {
            navigate("/");
          }} className="text-2xl font-bold text-[#146A5D] cursor-pointer">
            PrimeLine Hospital
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
          {token ? (
            <div className="relative" ref={dropdownRef}>
              <div className="flex items-center">
                <img
                  onClick={() => navigate("/profile")}
                  className="h-10 w-10 rounded-full cursor-pointer"
                  src={userData?.image || defaultImage} 
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
                <div className="absolute right-0 mt-2 w-48 shadow-md rounded-md py-2 z-50 bg-white">
                  <p
                    onClick={() => {
                      navigate("/profile");
                      setDropDown(false);
                    }}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    Profile
                  </p>
                  <p
                    onClick={() => {
                      navigate("/bookedAppointment");
                      setDropDown(false);
                    }}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    My Appointments
                  </p>
                  <p
                    onClick={() => {
                      logout();
                      navigate("/");
                      setDropDown(false);
                    }}
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