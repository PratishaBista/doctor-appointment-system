import { Pencil, Save, XCircle } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import axios from "axios";
import { toast } from "react-toastify";

const DoctorProfile = () => {
  const { doctor_token, doctorData, backendUrl, getDoctorData } = useContext(DoctorContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editableData, setEditableData] = useState({
    fees: "",
    address: { line1: "", line2: "" },
    available: false
  });

  useEffect(() => {
    if (doctor_token) {
      getDoctorData();
    }
  }, [doctor_token]);

  useEffect(() => {
    if (doctorData) {
      setEditableData({
        fees: doctorData.fees || "",
        address: doctorData.address || { line1: "", line2: "" },
        available: doctorData.available || false
      });
    }
  }, [doctorData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setEditableData(prev => ({
      ...prev,
      address: {
        ...prev.address,
        [name]: value
      }
    }));
  };

  const handleAvailabilityChange = (e) => {
    setEditableData(prev => ({
      ...prev,
      available: e.target.checked
    }));
  };

  const updateProfile = async () => {
    try {
      const updateData = {
        doctorId: doctorData._id,
        fees: editableData.fees,
        address: editableData.address,
        available: editableData.available
      };

      const { data } = await axios.post(`${backendUrl}/api/doctor/update-profile`, updateData, {
        headers: { doctor_token },
      });


      if (data.success) {
        toast.success("Profile updated successfully");
        getDoctorData();
        setIsEditing(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("An error occurred while updating your profile");
    }
  };

  if (!doctorData) {
    return <div className="text-center p-8">Loading profile data...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 p-8 bg-white rounded-2xl shadow-lg border border-gray-200">
      {/* Profile Picture */}
      <div className="flex justify-center mb-6">
        <img
          src={doctorData.image || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"}
          alt="Doctor"
          className="rounded-full w-32 h-32 object-cover border-4 border-blue-500 shadow-md"
        />
      </div>

      {/* Profile Information */}
      <div className="space-y-4">
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-gray-800">
            {doctorData.name}
          </h1>
          <p className="text-gray-600">{doctorData.speciality}</p>
          <p className="text-gray-500">{doctorData.degree}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Email (readonly) */}
          <div>
            <h2 className="text-gray-600 font-medium">Email</h2>
            <p className="text-gray-700">{doctorData.email}</p>
          </div>

          {/* Phone (readonly) */}
          {/* <div>
            <h2 className="text-gray-600 font-medium">Phone</h2>
            <p className="text-gray-700">{doctorData.phone}</p>
          </div> */}

          {/* Experience (readonly) */}
          <div>
            <h2 className="text-gray-600 font-medium">Experience</h2>
            <p className="text-gray-700">{doctorData.experience}</p>
          </div>

          {/* Fees (editable) */}
          <div>
            <h2 className="text-gray-600 font-medium">Consultation Fee</h2>
            <p className="text-gray-700">Rs. {doctorData.fees}</p>
            {/* {isEditing ? (
              <input
                type="number"
                name="fees"
                value={editableData.fees}
                onChange={handleInputChange}
                className="border border-gray-300 p-2 rounded-md w-full"
              />
            ) : ( */}
          </div>
        </div>

        {/* Availability (editable) */}
        <div>
          <h2 className="text-gray-600 font-medium">Availability</h2>
          {isEditing ? (
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={editableData.available}
                onChange={handleAvailabilityChange}
                className="h-5 w-5 text-[#0288d1ff] bg-[#0288d1ff] hover:bg-[#0289d1df] rounded"
              />
              <span>{editableData.available ? "Available" : "Not Available"}</span>
            </label>
          ) : (
            <p className="text-gray-700">
              {doctorData.available ? "Available" : "Not Available"}
            </p>
          )}
        </div>

        {/* Address (editable) */}
        <div>
          <h2 className="text-gray-600 font-medium">Address</h2>
          {isEditing ? (
            <div className="space-y-2">
              <input
                type="text"
                name="line1"
                value={editableData.address.line1 || ''}
                onChange={handleAddressChange}
                className="border border-gray-300 p-2 rounded-md w-full"
                placeholder="Address Line 1"
              />
              <input
                type="text"
                name="line2"
                value={editableData.address.line2 || ''}
                onChange={handleAddressChange}
                className="border border-gray-300 p-2 rounded-md w-full"
                placeholder="Address Line 2"
              />
            </div>
          ) : (
            <p className="text-gray-700">
              {doctorData.address?.line1 || 'N/A'}, {doctorData.address?.line2 || 'N/A'}
            </p>
          )}
        </div>

        {/* About Section (readonly) */}
        <div>
          <h2 className="text-gray-600 font-medium">About</h2>
          <p className="text-gray-700 whitespace-pre-line">
            {doctorData.about || 'No information provided'}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mt-6">
          {isEditing ? (
            <>
              <button
                onClick={updateProfile}
                className= "bg-[#0288d1ff] rounded-md hover:bg-[#0289d1df] text-white flex items-center gap-2 py-2 px-6 transition"
              >
                <Save size={18} /> Save
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setEditableData({
                    fees: doctorData.fees || "",
                    address: doctorData.address || { line1: "", line2: "" },
                    available: doctorData.available || false
                  });
                }}
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
              <Pencil size={18} /> Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;