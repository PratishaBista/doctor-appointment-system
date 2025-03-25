import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [active, setActive] = useState('Home');
  const navigate = useNavigate();

  const handleNavigation = (page, route) => {
    console.log(route);
    setActive(page);
    navigate(route);
  };

  return (
    <div className="bg-[#146A5D] w-full shadow-md">
      <div className="max-w-[2200px] mx-auto flex justify-between items-center px-6 py-4">
        
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <img
            className="h-[45px] w-[45px] rounded-full transform transition duration-300 hover:scale-110"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQfxenNNiYLFgw9ADWtnw8ORRX02r2APch0Z_jYq_REVUFTAvHOP94Jn7uxdN_iF7lt3k&usqp=CAU"
            alt="Logo"
          />
          <p className="text-2xl font-bold text-white transition duration-300 transform hover:scale-110 hover:text-[#D3D3D3]">
            Green City Hospital
          </p>
        </div>

        {/* Navigation */}
        <div className="hidden md:flex space-x-8 font-semibold">
          {/* Home */}
          <div
            className={`relative cursor-pointer text-lg transition duration-300 ease-in-out
              ${active === 'Home' ? 'text-[#D3D3D3]' : 'text-white hover:text-gray-300'}`}
            onClick={() => handleNavigation('Home', '/')}
          >
            Home
            <span
              className={`absolute left-0 bottom-[-5px] h-[3px] w-full bg-white transform transition-all duration-300
                ${active === 'Home' ? 'scale-x-100' : 'scale-x-0'}`}
            ></span>
          </div>

          {/* Our Services */}
          <div
            className={`relative cursor-pointer text-lg transition duration-300 ease-in-out
              ${active === 'Our Services' ? 'text-[#D3D3D3]' : 'text-white hover:text-gray-300'}`}
            onClick={() => handleNavigation('Our Services', '/ourServices')}
          >
            Our Services
            <span
              className={`absolute left-0 bottom-[-5px] h-[3px] w-full bg-white transform transition-all duration-300
                ${active === 'Our Services' ? 'scale-x-100' : 'scale-x-0'}`}
            ></span>
          </div>

          {/* Contact Us */}
          <div
            className={`relative cursor-pointer text-lg transition duration-300 ease-in-out
              ${active === 'Contact Us' ? 'text-[#D3D3D3]' : 'text-white hover:text-gray-300'}`}
            onClick={() => handleNavigation('Contact Us', '/userContact')}
          >
            Contact Us
            <span
              className={`absolute left-0 bottom-[-5px] h-[3px] w-full bg-white transform transition-all duration-300
                ${active === 'Contact Us' ? 'scale-x-100' : 'scale-x-0'}`}
            ></span>
          </div>

          {/* About Us */}
          <div
            className={`relative cursor-pointer text-lg transition duration-300 ease-in-out
              ${active === 'About Us' ? 'text-[#D3D3D3]' : 'text-white hover:text-gray-300'}`}
            onClick={() => handleNavigation('About Us', '/userAbout')}
          >
            About Us
            <span
              className={`absolute left-0 bottom-[-5px] h-[3px] w-full bg-white transform transition-all duration-300
                ${active === 'About Us' ? 'scale-x-100' : 'scale-x-0'}`}
            ></span>
          </div>
        </div>

        {/* Sign Up Button */}
        <div className="flex items-center">
          <button className="text-xl font-bold bg-slate-400 text-white rounded-full py-2 px-6 hover:bg-[#0F5247] transform transition duration-300 ease-in-out hover:scale-105">
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
