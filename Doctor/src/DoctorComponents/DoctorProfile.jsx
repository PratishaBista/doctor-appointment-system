import { React, useContext, useState } from 'react';
import { DocContext } from '../doctorContext/DocContext';

const DoctorProfile = () => {
  const { docData, setDocData } = useContext(DocContext);

  // State to handle editing
  const [isEditing, setIsEditing] = useState(false);
  const [editableData, setEditableData] = useState({ ...docData });

  // Handle change in input fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Save edited data
  const handleSave = () => {
    setDocData(editableData);
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl ml-[370px] mt-[40px] p-8 bg-gradient-to-r from-blue-100 via-white to-blue-100 rounded-lg shadow-lg  ">
      {/* Profile Picture */}
      <div className="flex justify-center mb-8 ">
        <img
          src={docData.img}
          alt="Doctor"
          className="rounded-full w-40 h-40 object-cover border-4 border-blue-500"
        />
      </div>

      {/* Profile Information */}
      <div className="text-center">
        <h1 className="text-4xl font-semibold text-gray-800 mb-4">{isEditing ? (
          <input
            type="text"
            name="name"
            value={editableData.name}
            onChange={handleInputChange}
            className="border-b-2 border-blue-500 p-2 text-lg font-medium text-gray-700 focus:outline-none focus:border-blue-700"
          />
        ) : (
          docData.name
        )}</h1>

        {/* Speciality and Degree */}
        <div className="flex justify-center gap-12 mb-6">
          <div className="text-left">
            <h2 className="text-lg font-medium text-gray-700">Speciality:</h2>
            {isEditing ? (
              <input
                type="text"
                name="speciality"
                value={editableData.speciality}
                onChange={handleInputChange}
                className="border-b-2 border-blue-500 p-2 mt-1 w-64 focus:outline-none focus:border-blue-700"
              />
            ) : (
              <p className="text-gray-600">{docData.speciality}</p>
            )}
          </div>
          <div className="text-left">
            <h2 className="text-lg font-medium text-gray-700">Degree:</h2>
            {isEditing ? (
              <input
                type="text"
                name="degree"
                value={editableData.degree}
                onChange={handleInputChange}
                className="border-b-2 border-blue-500 p-2 mt-1 w-64 focus:outline-none focus:border-blue-700"
              />
            ) : (
              <p className="text-gray-600">{docData.degree}</p>
            )}
          </div>
        </div>

        {/* Email and Experience */}
        <div className="flex justify-center gap-12 mb-6">
          <div className="text-left">
            <h2 className="text-lg font-medium text-gray-700">Email:</h2>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={editableData.email}
                onChange={handleInputChange}
                className="border-b-2 border-blue-500 p-2 mt-1 w-64 focus:outline-none focus:border-blue-700"
              />
            ) : (
              <p className="text-gray-600">{docData.email}</p>
            )}
          </div>
          <div className="text-left">
            <h2 className="text-lg font-medium text-gray-700">Experience:</h2>
            {isEditing ? (
              <input
                type="text"
                name="experience"
                value={editableData.experience}
                onChange={handleInputChange}
                className="border-b-2 border-blue-500 p-2 mt-1 w-64 focus:outline-none focus:border-blue-700"
              />
            ) : (
              <p className="text-gray-600">{docData.experience}</p>
            )}
          </div>
        </div>

        {/* Fee and About */}
        <div className="mb-6 text-left">
          <h2 className="text-lg font-medium text-gray-700">Fee:</h2>
          {isEditing ? (
            <input
              type="text"
              name="fee"
              value={editableData.fee}
              onChange={handleInputChange}
              className="border-b-2 border-blue-500 p-2 mt-1 w-64 focus:outline-none focus:border-blue-700"
            />
          ) : (
            <p className="text-gray-600">{docData.fee}</p>
          )}
        </div>

        <div className="mb-6 text-left">
          <h2 className="text-lg font-medium text-gray-700">About:</h2>
          {isEditing ? (
            <textarea
              name="about"
              value={editableData.about}
              onChange={handleInputChange}
              className="border-2 border-blue-500 p-3 w-full h-32 mt-1 focus:outline-none focus:border-blue-700"
            />
          ) : (
            <p className="text-gray-600">{docData.about}</p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-6">
          {isEditing ? (
            <button
              onClick={handleSave}
              className="bg-blue-600 text-white py-2 px-6 rounded-full hover:bg-blue-700 focus:outline-none transition duration-300"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-green-500 text-white py-2 px-6 rounded-full hover:bg-green-600 focus:outline-none transition duration-300"
            >
              Edit
            </button>
          )}
          {!isEditing && (
            <button
              onClick={() => console.log("Cancel")}
              className="bg-gray-500 text-white py-2 px-6 rounded-full hover:bg-gray-600 focus:outline-none transition duration-300"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
