import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const ProfilePage = () => {
  const { userData, setUserData, token, backendUrl, loadUserProfileData } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    name: userData?.name || '',
    email: userData?.email || '',
    phone: userData?.phone || '',
    gender: userData?.gender || 'Male',
    dob: userData?.dob || '',
    address: userData?.address || { line1: '', line2: '' }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      address: {
        ...prev.address,
        [name]: value
      }
    }));
  };

  const updateUserProfile = async () => {
    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('phone', formData.phone);
      data.append('address', JSON.stringify(formData.address));
      data.append('gender', formData.gender);
      data.append('dob', formData.dob);
      if (image) data.append('image', image);

      const response = await axios.post(`${backendUrl}/api/user/update-profile`, data, {
        headers: { token }
      });

      if (response.data.success) {
        toast.success('Profile updated successfully');
        await loadUserProfileData();
        setIsEdit(false);
        setImage(null);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    }
  };

  if (!userData) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white shadow rounded-lg overflow-hidden">
        {/* Profile Header */}
        <div className="bg-gray-50 px-6 py-8 border-b border-gray-200">
          <div className="flex flex-col md:flex-row items-center">
            <div className="relative mb-4 md:mb-0 md:mr-6">
              <img
                className="h-32 w-32 rounded-full object-cover"
                src={image ? URL.createObjectURL(image) : userData.image || "/default-profile.png"}
                alt="Profile"
              />
              {isEdit && (
                <label className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md cursor-pointer">
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => setImage(e.target.files[0])}
                    accept="image/*"
                  />
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </label>
              )}
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-2xl font-bold text-gray-900">
                {isEdit ? (
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  userData.name
                )}
              </h1>
              <p className="text-gray-600 mt-1">{userData.email}</p>
              {/* <p className="text-sm text-gray-500 mt-2">Member since {new Date(userData.createdAt).toLocaleDateString()}</p> */}
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="px-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h2 className="text-lg font-medium text-gray-900 border-b pb-2">Personal Information</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                {isEdit ? (
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                ) : (
                  <p className="mt-1 text-sm text-gray-900">{userData.phone || 'Not provided'}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Gender</label>
                {isEdit ? (
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                ) : (
                  <p className="mt-1 text-sm text-gray-900">{userData.gender || 'Not specified'}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                {isEdit ? (
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                ) : (
                  <p className="mt-1 text-sm text-gray-900">
                    {userData.dob ? new Date(userData.dob).toLocaleDateString() : 'Not specified'}
                  </p>
                )}
              </div>
            </div>

            {/* Address */}
            <div className="space-y-4">
              <h2 className="text-lg font-medium text-gray-900 border-b pb-2">Address</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Address Line 1</label>
                {isEdit ? (
                  <input
                    type="text"
                    name="line1"
                    value={formData.address.line1}
                    onChange={handleAddressChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                ) : (
                  <p className="mt-1 text-sm text-gray-900">{userData.address?.line1 || 'Not provided'}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Address Line 2</label>
                {isEdit ? (
                  <input
                    type="text"
                    name="line2"
                    value={formData.address.line2}
                    onChange={handleAddressChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                ) : (
                  <p className="mt-1 text-sm text-gray-900">{userData.address?.line2 || 'Not provided'}</p>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex justify-end space-x-3">
            {isEdit ? (
              <>
                <button
                  onClick={() => {
                    setIsEdit(false);
                    setFormData({
                      name: userData.name,
                      email: userData.email,
                      phone: userData.phone,
                      gender: userData.gender,
                      dob: userData.dob,
                      address: userData.address || { line1: '', line2: '' }
                    });
                    setImage(null);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  onClick={updateUserProfile}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Save Changes
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEdit(true)}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;