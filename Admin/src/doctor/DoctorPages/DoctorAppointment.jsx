import { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";

const DoctorAppointment = () => {
  const { doctor_token, appointments, getAppointments, completeAppointment } = useContext(DoctorContext);
  const { calculateAge, formatDate } = useContext(AppContext);
  useEffect(() => {
    if (doctor_token) {
      getAppointments();
    }
  }, [doctor_token]);


  return (
    <div className="p-6 w-full overflow-x-auto">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">All Appointments</h1>

      <div className="min-w-[800px]">
        <table className="w-full table-auto border-collapse rounded-lg overflow-hidden shadow-sm">
          <thead>
            <tr className="bg-gray-100 text-left text-gray-700 text-sm uppercase tracking-wider">
              <th className="p-3">#</th>
              <th className="p-3">Patient</th>
              <th className="p-3">Payment</th>
              <th className="p-3">Age</th>
              <th className="p-3">Date & Time</th>
              <th className="p-3">Fees</th>
              <th className="p-3 text-center">Booking Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="text-gray-800 text-sm">
            {appointments.reverse().map((appt, index) => (
              <tr key={appt._id} className="hover:bg-gray-50 transition duration-150 border-t">
                <td className="p-3">{index + 1}</td>

                <td className="p-3 flex items-center space-x-2">
                  <img
                    className="w-8 h-8 rounded-full object-cover"
                    src={appt.userData?.image || "https://via.placeholder.com/40"}
                    alt="Patient"
                  />
                  <span>{appt.userData?.name || "Unknown"}</span>
                </td>

                <td className="p-3">{appt.payment ? "Online" : "Cash"}</td>
                <td className="p-3">{calculateAge(appt.userData?.dob)}</td>
                <td className="p-3">{formatDate(appt.slotDate)} at {appt.slotTime}</td>
                <td className="p-3">Rs. {appt.doctorData?.fees || 0}</td>

                {/* Booking Status */}
                <td className={`p-3 text-center font-medium 
                  ${appt.cancelled ? "text-red-500" : appt.isCompleted ? "text-blue-500" : "text-green-600"}`}>
                  {appt.cancelled ? "Cancelled" : appt.isCompleted ? "Completed" : "Booked"}
                </td>

                {/* Actions */}
                <td className="p-3 text-center">
                  {!appt.cancelled && !appt.isCompleted ? (
                    <button
                      className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                      onClick={() => completeAppointment(appt._id)}
                    >
                      Mark as Completed
                    </button>
                  ) : (
                    <span className="text-gray-400 text-sm">No actions</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DoctorAppointment;