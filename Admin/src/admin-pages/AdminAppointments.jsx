import React, { useEffect, useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { AppContext } from "../context/AppContext";

const AdminAppointments = () => {
  const { admin_token, appointments, getAllAppointments, updateStatus, cancelAppointment } = useContext(AdminContext);
  const { calculateAge, formatDate } = useContext(AppContext);

  useEffect(() => {
    if (admin_token) {
      getAllAppointments();
    }
  }, [admin_token]);

  return (
    <div className="p-6 w-full overflow-x-auto">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">All Appointments</h1>

      <div className="min-w-[800px]">
        <table className="w-full table-auto border-collapse rounded-lg overflow-hidden shadow-sm">
          <thead>
            <tr className="bg-gray-100 text-left text-gray-700 text-sm uppercase tracking-wider">
              <th className="p-3">#</th>
              <th className="p-3">Patient</th>
              <th className="p-3">Age</th>
              <th className="p-3">Date & Time</th>
              <th className="p-3">Doctor</th>
              <th className="p-3">Fees</th>
              <th className="p-3 text-center">Booking Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-800 text-sm">
            {appointments.map((appt, index) => (
              <tr key={appt._id} className="hover:bg-gray-50 transition duration-150 border-t">
                <td className="p-3">{index + 1}</td>

                <td className="p-3 flex items-center space-x-2">
                  <img
                    className="w-8 h-8 rounded-full object-cover"
                    src={appt.userData?.image || "https://via.placeholder.com/40"}
                    alt="User"
                  />
                  <span>{appt.userData?.name || "Unknown"}</span>
                </td>

                <td className="p-3 text-left">{calculateAge(appt.userData?.dob)}</td>

                <td className="p-2 text-left">
                  {formatDate(appt.slotDate)} at {appt.slotTime}
                </td>

                <td className="p-3 flex items-center space-x-2">
                  <img
                    className="w-8 h-8 rounded-full object-cover"
                    src={appt.doctorData?.image || "https://via.placeholder.com/40"}
                    alt="Doctor"
                  />
                  <span>{appt.doctorData?.name || "Doctor"}</span>
                </td>

                <td className="p-3 text-left">Rs. {appt.doctorData?.fees || 0}</td>

                {/* Booking Status */}
                <td className={`p-3 text-center font-medium ${appt.cancelled ? "text-red-500" : "text-green-600"}`}>
                  {appt.cancelled ? "Cancelled" : "Booked"}
                </td>

                {/* Actions */}
                <td className="p-3 text-left">
                  <div className="flex justify-center">
                    {appt.cancelled ? (
                      <img
                        className="h-6 w-6 opacity-50"
                        src="https://cdn-icons-png.flaticon.com/512/159/159604.png"
                        alt="No action"
                        title="No actions available"
                      />
                    ) : (
                      <img
                        className="h-6 w-6 cursor-pointer hover:scale-110 transition-transform"
                        src="https://cdn.pixabay.com/photo/2022/03/23/02/48/cross-7086307_1280.png"
                        alt="Cancel"
                        title="Cancel Appointment"
                        onClick={() => cancelAppointment(appt._id, "Cancelled")}
                      />
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminAppointments;
