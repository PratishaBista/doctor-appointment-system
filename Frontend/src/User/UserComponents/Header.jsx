import React from 'react';

const Header = () => {
  return (
    <div className='h-[120px] flex justify-around mt-4 border-b-2 border-[#146A5D]'>
      <div className="flex items-center">
        <h1 className='text-2xl font-bold text-red-600'>Emergency Number: 09090000</h1>
      </div>

      <div className="flex items-center text-2xl">
        <img
          className="h-[80px]"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQfxenNNiYLFgw9ADWtnw8ORRX02r2APch0Z_jYq_REVUFTAvHOP94Jn7uxdN_iF7lt3k&usqp=CAU"
          alt="Logo"
        />
        <p className="text-xl font-bold text-gray-800 ml-4 ">Green City Hospital</p>
      </div>

      <div className="flex items-center font-bold text-black">
        <h1 className='text-2xl'>Email: greencity@gmail.com</h1>
      </div>
      <div className="flex items-center font-bold text-black">
        <h1 className='text-xl border rounded-full p-4'>Sign up </h1>
      </div>

      

    </div>
  );
}

export default Header;
