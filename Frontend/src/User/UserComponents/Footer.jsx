import React from 'react'


const Footer = () => {
  return (<div className=''>
  
    <div className=" text-black p-8  ">
      <div className="flex flex-col md:flex-row justify-between gap-8 mb-8 items-end">

        {/* Left Section */}
        <div className="flex  md:w-1/4 gap-4 ">
        <div className="">
        <img  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQfxenNNiYLFgw9ADWtnw8ORRX02r2APch0Z_jYq_REVUFTAvHOP94Jn7uxdN_iF7lt3k&usqp=CAU" alt="Logo" className="w-18 mb-4" />
        </div>
         <div className="mt-2 font-semibold">
         <p className="text-sm md:text-base">
            Book Appointment with Best Doctor
            <br />
            Green City Hospital
          </p>
         </div>
        </div>
        

        {/* Center Section */}
        <div className="flex flex-col md:w-1/4 gap-2">
          <h1 className="text-lg font-semibold hover:underline">Company</h1>
          <ul className="list-none space-y-2">
            <li className="hover:underline">Home</li>
            <li className="hover:underline">About Us</li>
            <li className="hover:underline">Privacy Policy</li>
          </ul>
        </div>

        {/* Right Section */}
        <div className="flex flex-col md:w-1/4 gap-2">
          <h1 className="text-lg font-semibold hover:underline">GET IN TOUCH  </h1>
          <ul className="list-none space-y-2">
            <li className="hover:underline">+1-222-333-000</li>
            <li className="hover:underline">SiddhantShrestha54@gmail.com</li>
          </ul>
          <div className="flex items-center">
        <h1 className='text-xl font-bold text-red-600 hover:underline'>Emergency Number: +09090000</h1>
      </div>
        </div>

      </div>

      {/* Footer Text */}
      <div className="flex justify-center text-center border-t-4 text-xl">
        <p className='mt-4'>&copy; {new Date().getFullYear()}@greencity- All Rights Reserved</p>
      </div>
    </div>

    </div>
  )
}

export default Footer
