import { useContext } from "react";
import { DocContext } from "../doctorContext/DocContext";

const DoctorAppointment = () => {
  const { appointments, setAppointments } = useContext(DocContext);

  // Function to update appointment status
  const updateStatus = (id, newStatus) => {
    setAppointments(
      appointments.map((appt) => (appt.id === id ? { ...appt, status: newStatus } : appt))
    );
  };

  return (
    <div className="p-4 w-full sm:w-[80vw]">
      <h1 className="text-2xl font-semibold mb-4">All Appointments</h1>
      <div className="hidden sm:flex items-center justify-between p-2 bg-gray-200 font-semibold text-gray-800">
        <div className="w-10 text-center">#</div>
        <div className="min-w-38 max-w-38 text-left">Patient</div>
        <div className="w-16 text-center">Age</div>
        <div className="w-16 text-center">Payment</div>
        <div className="w-42 text-center">Date & Time</div>
        <div className="w-20 text-center">Fees</div>
        <div className="w-32 text-center">Status</div>
        <div className="w-20 text-center">Action</div>
      </div>


      {/* Desktop view: Regular table display */}
      <div className=" flex-col">
        {appointments.map((appt) => (
          <div key={appt.id} className="flex items-center justify-between p-2 border-t">
            <div className="w-10 text-center">{appt.id}</div>
            <div className="min-w-38 max-w-38 text-center">{appt.patient}</div>
            <div className="w-16 text-center">{appt.age}</div>
            <div className="w-16 text-center">{appt.payment}</div>
            <div className="w-42 text-center">{appt.dateTime}</div>
            <div className="w-20 text-center">{appt.fees}</div>
            <div
              className={`w-32 text-center font-semibold ${
                appt.status === "Completed" ? "text-green-600" : appt.status === "Cancelled" ? "text-red-600" : "text-gray-500"
              }`}
            >
              {appt.status}
            </div>
            <div className="w-20 text-center">
              <button className="flex space-x-2">
                <img
                  className="rounded-full h-[25px] border-2 p-1 cursor-pointer"
                  src="https://t4.ftcdn.net/jpg/05/19/99/45/360_F_519994541_TABPKuZ1QFkxo7uo33kYa0CBLnQ5MUq6.jpg"
                  alt="Tick"
                  onClick={() => updateStatus(appt.id, "Completed")}
                />
                <img
                  className="rounded-full h-[25px] border-2 p-1 cursor-pointer"
                  src="https://cdn.pixabay.com/photo/2022/03/23/02/48/cross-7086307_1280.png"
                  alt="Cross"
                  onClick={() => updateStatus(appt.id, "Cancelled")}
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorAppointment;
