import React from 'react'


const Footer = () => {
  return (<>
  
    <div className=" text-black p-8 mt-10 border-t-4">
      <div className="flex flex-col md:flex-row justify-between gap-8">

        {/* Left Section */}
        <div className="flex flex-col md:w-1/4 gap-4 ">
          <img  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQfxenNNiYLFgw9ADWtnw8ORRX02r2APch0Z_jYq_REVUFTAvHOP94Jn7uxdN_iF7lt3k&usqp=CAU" alt="Logo" className="w-20 mb-4" />
          <p className="text-sm md:text-base">
            Book Appointment with Best Doctor
            <br />
            Green City Hospital
          </p>
        </div>
        

        {/* Center Section */}
        <div className="flex flex-col md:w-1/4 gap-2">
          <h1 className="text-lg font-semibold">Company</h1>
          <ul className="list-none space-y-2">
            <li className="hover:text-gray-200">Home</li>
            <li className="hover:text-gray-200">About Us</li>
            <li className="hover:text-gray-200">Privacy Policy</li>
          </ul>
        </div>

        {/* Right Section */}
        <div className="flex flex-col md:w-1/4 gap-2">
          <h1 className="text-lg font-semibold">GEY IN TOUCH  </h1>
          <ul className="list-none space-y-2">
            <li className="hover:text-gray-200">+1-222-333-000</li>
            <li className="hover:text-gray-200">SiddhantShrestha54@gmail.com</li>
          </ul>
          <div className="flex items-center">
        <h1 className='text-2xl font-bold text-red-600'>Emergency Number: 09090000</h1>
      </div>
        </div>

      </div>

      {/* Footer Text */}
      <div className="mt-8 text-center text-sm">
        <p>&copy; {new Date().getFullYear()}@greencity- All Rights Reserved</p>
      </div>
    </div>
    </>
  )
}

export default Footer
