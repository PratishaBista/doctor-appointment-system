import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';

const MyProfile = () => {
  const { userData, setUserData } = useContext(AppContext);
  const [edit, setEdit] = useState(false);
  const [tempData, setTempData] = useState(userData);
  console.log(tempData)

  if (!userData) {
    return <p>Loading...</p>;
  }

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempData({ ...tempData, [name]: value });
  };

  // Handle address change
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setTempData({
      ...tempData,
      address: { ...tempData.address, [name]: value },
    });
  };

  // Save changes
  const handleSave = () => {
    setUserData(tempData);
    setEdit(false);
  };

  return (
    <div className="p-6 bg-gray-100 rounded-md shadow-md max-w-lg mx-auto mt-8 mb-4">
      {/* Profile Picture */}
      <img
        className="h-[250px] w-[250px] rounded-full mx-auto"
        src={tempData.image || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"}
        alt="Profile"
      />

      {/* User Name */}
      <h1 className="text-2xl font-bold text-center mt-4">
        {edit ? (
          <input
            type="text"
            name="name"
            value={tempData.name}
            onChange={handleChange}
            className="border border-gray-300 rounded p-1"
          />
        ) : (
          tempData.name
        )}
      </h1>

      {/* Separator */}
      <div className="h-[3px] bg-black my-4"></div>

      {/* User Details */}
      <h2 className="text-xl font-semibold mb-2">Details</h2>

      {/* Email */}
      <div className="flex justify-between p-2">
        <span className="font-medium">Email:</span>
        {edit ? (
          <input
            type="email"
            name="email"
            value={tempData.email}
            onChange={handleChange}
            className="border border-gray-300 rounded p-1"
          />
        ) : (
          <span>{tempData.email}</span>
        )}
      </div>

      {/* Contact Number */}
      <div className="flex justify-between p-2">
        <span className="font-medium">Contact Number:</span>
        {edit ? (
          <input
            type="text"
            name="number"
            value={tempData.number}
            onChange={handleChange}
            className="border border-gray-300 rounded p-1"
          />
        ) : (
          <span>{tempData.number}</span>
        )}
      </div>

      {/* Address */}
      <div className="flex justify-between p-2">
        <span className="font-medium">Address:</span>
        <div>
          {edit ? (
            <>
              <input
                type="text"
                name="line1"
                value={tempData.address?.line1}
                onChange={handleAddressChange}
                className="border border-gray-300 rounded p-1 block mb-1"
              />
              <input
                type="text"
                name="line2"
                value={tempData.address?.line2}
                onChange={handleAddressChange}
                className="border border-gray-300 rounded p-1"
              />
            </>
          ) : (
            <span>
              {tempData.address?.line1}, {tempData.address?.line2}
            </span>
          )}
        </div>
      </div>

      {/* Gender */}
      <div className="flex justify-between p-2">
        <span className="font-medium">Gender:</span>
        {edit ? (
          <select
            name="gender"
            value={tempData.gender}
            onChange={handleChange}
            className="border border-gray-300 rounded p-1"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        ) : (
          <span>{tempData.gender}</span>
        )}
      </div>

      {/* Birth Date */}
      <div className="flex justify-between p-2">
        <span className="font-medium">Birth Date:</span>
        {edit ? (
          <input
            type="date"
            name="dob"
            value={tempData.dob}
            onChange={handleChange}
            className="border border-gray-300 rounded p-1"
          />
        ) : (
          <span>{tempData.dob}</span>
        )}
      </div>

      {/* Edit/Save Button */}
      <button
        onClick={edit ? handleSave : () => setEdit(true)}
        className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
      >
        {edit ? "Save" : "Edit Profile"}
      </button>
    </div>
  );
};

export default MyProfile;
