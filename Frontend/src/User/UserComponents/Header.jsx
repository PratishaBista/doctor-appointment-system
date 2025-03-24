import React from 'react'

const Header = () => {
  return (
    <div className='h-[120px] flex justify-around mt-4'>
   <div className="">
   <h1 className='text-2xl font-bold text-red-600'>Emergency Number: 09090000</h1>
   </div>

    <div className="flex">
        
    <img
        className="h-[80px]"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQfxenNNiYLFgw9ADWtnw8ORRX02r2APch0Z_jYq_REVUFTAvHOP94Jn7uxdN_iF7lt3k&usqp=CAU" alt="Logo"  />
        <p className="text-xl font-bold text-gray-800 ml-4 mt-6">Green City Hospital</p>
    </div>
    <div className="">
    <h1>Email:greencity@gmail.com</h1>
    </div>


    </div>
  )
}

export default Header
