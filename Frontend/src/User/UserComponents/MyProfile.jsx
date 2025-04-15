import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const MyProfile = () => {
  const { userData, setUserData, user_token, backendUrl, loadUserProfileData } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [name]: value,
      },
    }));
  };

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append('name', userData.name);
      formData.append('phone', userData.phone);
      formData.append('address', JSON.stringify(userData.address));
      formData.append('gender', userData.gender);
      formData.append('dob', userData.dob);
      if (image) formData.append('image', image);

      const { data } = await axios.post(`${backendUrl}/api/user/update-profile`, formData, {
        headers: { user_token },
      });

      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("An error occurred while updating your profile.");
    }
  };

  if (!userData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-6 bg-gray-100 rounded-md shadow-md max-w-lg mx-auto mt-8 mb-4">
      {/* Profile Image */}
      {isEdit ? (
        <label htmlFor="image">
          <div className="inline-block relative cursor-pointer">
            <img
              className="w-36 rounded opacity-75"
              src={image ? URL.createObjectURL(image) : userData.image}
              alt="Profile"
            />
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              id="image"
              hidden
            />
          </div>
        </label>
      ) : (
        <img
          className="h-[250px] w-[250px] rounded-full mx-auto"
          src={
            userData.image ||
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
          }
          alt="Profile"
        />
      )}

      {/* Name */}
      <h1 className="text-2xl font-bold text-center mt-4">
        {isEdit ? (
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleChange}
            className="border border-gray-300 rounded p-1"
          />
        ) : (
          userData.name
        )}
      </h1>

      <div className="h-[3px] bg-black my-4"></div>

      {/* Details */}
      <h2 className="text-xl font-semibold mb-2">Details</h2>

      {/* Email */}
      <div className="flex justify-between p-2">
        <span className="font-medium">Email:</span>
        {isEdit ? (
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            className="border border-gray-300 rounded p-1"
          />
        ) : (
          <span>{userData.email}</span>
        )}
      </div>

      {/* Phone */}
      <div className="flex justify-between p-2">
        <span className="font-medium">Contact Number:</span>
        {isEdit ? (
          <input
            type="text"
            name="phone"
            value={userData.phone}
            onChange={handleChange}
            className="border border-gray-300 rounded p-1"
          />
        ) : (
          <span>{userData.phone}</span>
        )}
      </div>

      {/* Address */}
      <div className="flex justify-between p-2">
        <span className="font-medium">Address:</span>
        <div>
          {isEdit ? (
            <>
              <input
                type="text"
                name="line1"
                value={userData.address?.line1 || ""}
                onChange={handleAddressChange}
                className="border border-gray-300 rounded p-1 block mb-1"
              />
              <input
                type="text"
                name="line2"
                value={userData.address?.line2 || ""}
                onChange={handleAddressChange}
                className="border border-gray-300 rounded p-1"
              />
            </>
          ) : (
            <span>
              {userData.address?.line1}, {userData.address?.line2}
            </span>
          )}
        </div>
      </div>

      {/* Gender */}
      <div className="flex justify-between p-2">
        <span className="font-medium">Gender:</span>
        {isEdit ? (
          <select
            name="gender"
            value={userData.gender}
            onChange={handleChange}
            className="border border-gray-300 rounded p-1"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        ) : (
          <span>{userData.gender}</span>
        )}
      </div>

      {/* Date of Birth */}
      <div className="flex justify-between p-2">
        <span className="font-medium">Birth Date:</span>
        {isEdit ? (
          <input
            type="date"
            name="dob"
            value={userData.dob}
            onChange={handleChange}
            className="border border-gray-300 rounded p-1"
          />
        ) : (
          <span>{userData.dob}</span>
        )}
      </div>

      {/* Edit / Save Button */}
      <button
        onClick={() => {
          if (isEdit) {
            updateUserProfileData();
          } else {
            setIsEdit(true);
          }
        }}
        className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
      >
        {isEdit ? "Save" : "Edit Profile"}
      </button>

      {isEdit && (
        <button
          onClick={() => {
            loadUserProfileData();
            setIsEdit(false);
            setImage(null);
          }}
          className="mt-2 w-full bg-gray-400 text-white py-2 rounded-md hover:bg-gray-500 transition"
        >
          Cancel
        </button>
      )}

    </div>
  );
};

export default MyProfile;
