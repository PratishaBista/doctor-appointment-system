import React from 'react';

const AddDoctor = () => {
  return (
    <div className="h-[80vh] w-[70vw] p-8 bg-white shadow-lg rounded-lg overflow-y-auto">
      <h2 className="text-xl font-semibold mb-4 text-[#146A5D]">Add New Doctor</h2>

      {/* Upload Picture */}
      <div className="flex items-center mb-4">
        <input type="file" className="border-2 border-[#146A5D] p-2 rounded-lg" />
        <p className="ml-4 text-[#146A5D]">Upload Picture</p>
      </div>

      {/* Name */}
      <div className="flex flex-col mb-4">
        <label htmlFor="name" className="font-medium text-gray-700">Name</label>
        <input
          id="name"
          placeholder="Enter Doctor's Name"
          type="text"
          className="border-2 border-[#146A5D] p-2 rounded-lg mt-1 focus:outline-none focus:border-[#0F5247]"
        />
      </div>

      {/* Speciality */}
      <div className="flex flex-col mb-4">
        <label htmlFor="speciality" className="font-medium text-gray-700">Speciality</label>
        <input
          id="speciality"
          placeholder="Enter Doctor's Speciality"
          type="text"
          className="border-2 border-[#146A5D] p-2 rounded-lg mt-1 focus:outline-none focus:border-[#0F5247]"
        />
      </div>

      {/* Password and Email */}
      <div className="flex space-x-4 mb-4">
        <div className="flex flex-col w-1/2">
          <label htmlFor="password" className="font-medium text-gray-700">Set Password</label>
          <input
            id="password"
            placeholder="Enter Password"
            type="password"
            className="border-2 border-[#146A5D] p-2 rounded-lg mt-1 focus:outline-none focus:border-[#0F5247]"
          />
        </div>
        <div className="flex flex-col w-1/2">
          <label htmlFor="email" className="font-medium text-gray-700">Set Email</label>
          <input
            id="email"
            placeholder="Enter Email"
            type="email"
            className="border-2 border-[#146A5D] p-2 rounded-lg mt-1 focus:outline-none focus:border-[#0F5247]"
          />
        </div>
      </div>

      {/* Degree and Address */}
      <div className="flex space-x-4 mb-4">
        <div className="flex flex-col w-1/2">
          <label htmlFor="degree" className="font-medium text-gray-700">Degree</label>
          <input
            id="degree"
            placeholder="Enter Degree"
            type="text"
            className="border-2 border-[#146A5D] p-2 rounded-lg mt-1 focus:outline-none focus:border-[#0F5247]"
          />
        </div>
        <div className="flex flex-col w-1/2">
          <label htmlFor="address" className="font-medium text-gray-700">Address</label>
          <input
            id="address"
            placeholder="Enter Address"
            type="text"
            className="border-2 border-[#146A5D] p-2 rounded-lg mt-1 focus:outline-none focus:border-[#0F5247]"
          />
        </div>
      </div>

      {/* Experience */}
      <div className="flex flex-col mb-4">
        <label htmlFor="experience" className="font-medium text-gray-700">Experience</label>
        <select
          id="experience"
          className="border-2 border-[#146A5D] p-2 rounded-lg mt-1 focus:outline-none focus:border-[#0F5247]"
        >
          {[...Array(10).keys()].map(i => (
            <option key={i} value={i + 1}>{i + 1} Year{(i + 1) > 1 ? 's' : ''}</option>
          ))}
        </select>
      </div>

      {/* Address 1 & 2 */}
      <div className="flex flex-col mb-4">
        <label htmlFor="address1" className="font-medium text-gray-700">Address 1</label>
        <input
          id="address1"
          placeholder="Enter Address Line 1"
          type="text"
          className="border-2 border-[#146A5D] p-2 rounded-lg mt-1 focus:outline-none focus:border-[#0F5247]"
        />
        <label htmlFor="address2" className="font-medium text-gray-700 mt-2">Address 2</label>
        <input
          id="address2"
          placeholder="Enter Address Line 2"
          type="text"
          className="border-2 border-[#146A5D] p-2 rounded-lg mt-1 focus:outline-none focus:border-[#0F5247]"
        />
      </div>

      {/* Fees */}
      <div className="flex flex-col mb-4">
        <label htmlFor="fees" className="font-medium text-gray-700">Fees</label>
        <input
          id="fees"
          placeholder="Enter Doctor's Fees"
          type="number"
          className="border-2 border-[#146A5D] p-2 rounded-lg mt-1 focus:outline-none focus:border-[#0F5247]"
        />
      </div>

      {/* About Doctor */}
      <div className="flex flex-col mb-4">
        <label htmlFor="about" className="font-medium text-gray-700">About Doctor</label>
        <textarea
          id="about"
          placeholder="Write about the Doctor"
          rows="4"
          className="border-2 border-[#146A5D] p-2 rounded-lg mt-1 focus:outline-none focus:border-[#0F5247]"
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button className="bg-[#146A5D] text-white px-6 py-2 rounded-full hover:bg-[#0F5247] transition">
          Submit
        </button>
      </div>
    </div>
  );
};

export default AddDoctor;
