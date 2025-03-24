import React, { useState } from 'react';

const Navbar = () => {
  const [active, setActive] = useState('Home');

  return (
    <div className="bg-[#146A5D]  w-full shadow-md">
      <div className="max-w-[2200px] mx-auto flex justify-around items-center px-6 py-4">
        
        {/* Logo */}
        <div className="flex  items-center">
          <img
            className="h-[45px] w-[45px] rounded-full"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQfxenNNiYLFgw9ADWtnw8ORRX02r2APch0Z_jYq_REVUFTAvHOP94Jn7uxdN_iF7lt3k&usqp=CAU"
            alt="Logo"
          />
          <p className="text-2xl font-bold text-white ml-3">Green City Hospital</p>
        </div>

        {/* Navigation */}
        <div className="hidden md:flex space-x-8 font-semibold">
          {['Home', 'Our Services', 'Contact Us', 'About Us'].map((item) => (
            <div
              key={item}
              className={`relative cursor-pointer text-lg transition duration-300 ease-in-out 
                ${active === item ? 'text-[#D3D3D3]' : 'text-white hover:text-gray-300'}`}
              onClick={() => setActive(item)}
            >
              {item}
              <span
                className={`absolute left-0 bottom-[-5px] h-[3px] w-full bg-white transform transition-all duration-300
                ${active === item ? 'scale-x-100' : 'scale-x-0'}`}
              ></span>
            </div>
          ))}
        </div>
        <div className="flex items-center">
        <button className="text-xl font-bold bg-slate-400 text-white rounded-full py-2 px-6 hover:bg-[#0F5247] transition ease-in-out">
          Sign Up
        </button>
      </div>
      </div>
      
    </div>
  );
};

export default Navbar;
