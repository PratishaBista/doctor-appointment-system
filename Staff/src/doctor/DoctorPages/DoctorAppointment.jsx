// DoctorAppointment.jsx
import { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

const DoctorAppointment = () => {
  const { doctor_token, appointments = [], getAppointments, completeAppointment } = useContext(DoctorContext);
  const { calculateAge, formatDate } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (doctor_token) {
      getAppointments();
    }
  }, [doctor_token]);

  // Filter to show only booked (non-cancelled, non-completed) appointments
  const bookedAppointments = appointments.filter(appt =>
    !appt.cancelled && !appt.isCompleted
  );

  const handleRowClick = (appointment) => {
    navigate(`/doctor/appointments/${appointment._id}`, {
      state: { appointmentId: appointment._id, patientId: appointment.userData?._id }
    });
  };

  return (
    <div className="p-6 w-full overflow-x-auto">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">Current Appointments</h1>

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
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="text-gray-800 text-sm">
            {bookedAppointments.length === 0 ? (
              <tr>
                <td colSpan="7" className="p-6 text-center text-gray-500">
                  No current appointments
                </td>
              </tr>
            ) : (
              bookedAppointments.map((appt, index) => (
                <tr
                  key={appt._id}
                  className="hover:bg-gray-50 transition duration-150 border-t cursor-pointer"
                  onClick={() => handleRowClick(appt)}
                >
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

                  <td className="p-3 text-center" onClick={(e) => e.stopPropagation()}>
                    <button
                      className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                      onClick={() => completeAppointment(appt._id)}
                    >
                      Mark as Completed
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DoctorAppointment;