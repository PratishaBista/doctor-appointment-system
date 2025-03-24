import React from 'react'

const Navbar = () => {
  return (
    <div className='flex'>
      <div className="flex items-center space-x-3">
          <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQfxenNNiYLFgw9ADWtnw8ORRX02r2APch0Z_jYq_REVUFTAvHOP94Jn7uxdN_iF7lt3k&usqp=CAU" alt="Logo" className="h-12" />
          <p className="text-xl font-bold text-gray-800">Green City Hospital</p>
        </div>

        <div className="mt-4 flex">
            <p className='text-xl'>Home</p>
            <p className='text-xl'>Our Services</p>
            <p className='text-xl'></p>
            <p className='text-xl'>Contact Us</p>
            <p className='text-xl'>About Us</p>
            
        </div>
    </div>
  )
}

export default Navbar
