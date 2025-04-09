import { Pencil, Save, XCircle } from "lucide-react";
import { React, useContext, useState } from "react";
import { DocContext } from "../doctorContext/DocContext";

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
    <div className="max-w-3xl mx-auto mt-10 p-8 bg-white rounded-2xl shadow-lg border border-gray-200">
      {/* Profile Picture */}
      <div className="flex justify-center mb-6">
        <img
          src={docData.img}
          alt="Doctor"
          className="rounded-full w-32 h-32 object-cover border-4 border-blue-500 shadow-md"
        />
      </div>

      {/* Profile Information */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-semibold text-gray-800">
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={editableData.name}
              onChange={handleInputChange}
              className="border border-gray-300 p-2 rounded-md w-full text-center"
            />
          ) : (
            docData.name
          )}
        </h1>

        {/* Speciality & Degree */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h2 className="text-gray-600 font-medium">Speciality</h2>
            {isEditing ? (
              <input
                type="text"
                name="speciality"
                value={editableData.speciality}
                onChange={handleInputChange}
                className="border border-gray-300 p-2 rounded-md w-full"
              />
            ) : (
              <p className="text-gray-700">{docData.speciality}</p>
            )}
          </div>
          <div>
            <h2 className="text-gray-600 font-medium">Degree</h2>
            {isEditing ? (
              <input
                type="text"
                name="degree"
                value={editableData.degree}
                onChange={handleInputChange}
                className="border border-gray-300 p-2 rounded-md w-full"
              />
            ) : (
              <p className="text-gray-700">{docData.degree}</p>
            )}
          </div>
        </div>

        {/* Email & Experience */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h2 className="text-gray-600 font-medium">Email</h2>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={editableData.email}
                onChange={handleInputChange}
                className="border border-gray-300 p-2 rounded-md w-full"
              />
            ) : (
              <p className="text-gray-700">{docData.email}</p>
            )}
          </div>
          <div>
            <h2 className="text-gray-600 font-medium">Experience</h2>
            {isEditing ? (
              <input
                type="text"
                name="experience"
                value={editableData.experience}
                onChange={handleInputChange}
                className="border border-gray-300 p-2 rounded-md w-full"
              />
            ) : (
              <p className="text-gray-700">{docData.experience}</p>
            )}
          </div>
        </div>

        {/* Fee */}
        <div>
          <h2 className="text-gray-600 font-medium">Fee</h2>
          {isEditing ? (
            <input
              type="text"
              name="fee"
              value={editableData.fee}
              onChange={handleInputChange}
              className="border border-gray-300 p-2 rounded-md w-full"
            />
          ) : (
            <p className="text-gray-700">{docData.fee}</p>
          )}
        </div>

        {/* About Section */}
        <div>
          <h2 className="text-gray-600 font-medium">About</h2>
          {isEditing ? (
            <textarea
              name="about"
              value={editableData.about}
              onChange={handleInputChange}
              className="border border-gray-300 p-2 rounded-md w-full h-24"
            />
          ) : (
            <p className="text-gray-700">{docData.about}</p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mt-4">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="bg-blue-600 text-white flex items-center gap-2 py-2 px-6 rounded-md hover:bg-blue-700 transition"
              >
                <Save size={18} /> Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-500 text-white flex items-center gap-2 py-2 px-6 rounded-md hover:bg-gray-600 transition"
              >
                <XCircle size={18} /> Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-green-500 text-white flex items-center gap-2 py-2 px-6 rounded-md hover:bg-green-600 transition"
            >
              <Pencil size={18} /> Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
