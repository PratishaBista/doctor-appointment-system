import React, { useEffect } from "react";
import { useContext } from "react";
import { AdminContext } from "../context/AdminContext";

const AdminDoctorsList = () => {
  const { doctors, admin_token, getAllDoctors } = useContext(AdminContext);

  useEffect(() => {
    if (admin_token) {
      getAllDoctors();
    }
  }, [admin_token]);

  return (
    <div className="md:flex flex-wrap gap-6 justify-center p-6">
      {doctors.length > 0 ? (
        doctors.map((doctor, index) => (
          <div
            key={doctor._id || index}
            className="border border-[#146A5D] rounded-xl p-6 w-80 bg-white shadow-lg"
          >
            {/* Doctor Image */}
            <img
              className="w-full h-56 object-cover rounded-lg mb-4"
              src={doctor.image}
              alt={doctor.name}
            />

            {/* Doctor Name & Specialty */}
            <h1 className="text-xl font-bold text-[#146A5D] mb-2 text-center">
              {doctor.name}
            </h1>
            <p className="text-[#146A5D] text-center font-semibold mb-4">
              {doctor.speciality}
            </p>

            {/* Doctor Additional Info */}
            <div className="text-sm text-gray-700 mb-4">
              <p className="mb-2">
                <span className="font-semibold">Degree:</span> {doctor.degree}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Experience:</span>
                {doctor.experience} {doctor.experience === 1 ? 'year' : 'years'}
              </p>

              <p className="mb-2">
                <span className="font-semibold">Fees:</span> ₹{doctor.fees}
              </p>
            </div>

            {/* Availability Checkbox */}
            <div className="flex items-center justify-start mt-4">
              <input
                type="checkbox"
                id={`availability-${index}`}
                className="mr-2"
                defaultChecked={doctor.isAvailable}
              />
              <label
                htmlFor={`availability-${index}`}
                className="text-sm text-gray-700"
              >
                Available
              </label>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No doctors found.</p>
      )}
    </div>
  );
};

export default AdminDoctorsList;
