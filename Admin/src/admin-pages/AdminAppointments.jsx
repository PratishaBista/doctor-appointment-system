import React, { useState } from "react";

const AdminAppointments = () => {
  const [appointments, setAppointments] = useState([
    { id: 1, patient: "John Doe", age: 30, dateTime: "2025-03-22 10:00 AM", doctor: "Dr. Smith", fees: "$100", status: "Pending" },
    { id: 2, patient: "Jane Doe", age: 28, dateTime: "2025-03-22 11:00 AM", doctor: "Dr. Brown", fees: "$120", status: "Pending" },
  ]);

  // Function to update appointment status
  const updateStatus = (id, newStatus) => {
    setAppointments(appointments.map(appt => appt.id === id ? { ...appt, status: newStatus } : appt));
  };

  return (
    <div className="p-4 w-[80vw]">
      <h1 className="text-2xl font-semibold mb-4">All Appointments</h1>

      {/* Desktop view: Table Header */}
      <div className="hidden sm:flex items-center justify-between p-2 bg-gray-200 font-semibold text-gray-800">
        <div className="w-10 text-center">#</div>
        <div className="flex-1 text-left">Patient</div>
        <div className="w-16 text-center">Age</div>
        <div className="w-48 text-center">Date & Time</div>
        <div className="flex-1 text-left">Doctor</div>
        <div className="w-20 text-center">Fees</div>
        <div className="w-32 text-center">Status</div>
        <div className="w-20 text-center">Action</div>
      </div>

      {/* Mobile view: Make the table horizontally scrollable */}
      <div className="sm:hidden overflow-x-auto">
        <div className="min-w-[600px]"> {/* Ensures the table is wide enough to scroll */}
          {/* Table Data (Dynamically Loaded) */}
          {appointments.map((appt) => (
            <div key={appt.id} className="flex items-center justify-between p-2 border-t">
              <div className="w-10 text-center">{appt.id}</div>
              <div className="flex-1 text-left">{appt.patient}</div>
              <div className="w-16 text-center">{appt.age}</div>
              <div className="w-48 text-center">{appt.dateTime}</div>
              <div className="flex-1 text-left">{appt.doctor}</div>
              <div className="w-20 text-center">{appt.fees}</div>
              <div className={`w-32 text-center font-semibold ${appt.status === "Booked" ? "text-green-600" : appt.status === "Rejected" ? "text-red-600" : "text-gray-500"}`}>
                {appt.status}
              </div>
              <div className="w-20 text-center">
                <button className="flex">
                  <img className="rounded-full h-[25px] border-2 p-1 cursor-pointer" 
                       src="https://t4.ftcdn.net/jpg/05/19/99/45/360_F_519994541_TABPKuZ1QFkxo7uo33kYa0CBLnQ5MUq6.jpg" 
                       alt="Tick" 
                       onClick={() => updateStatus(appt.id, "Booked")} />
                  <img className="rounded-full h-[25px] border-2 p-1 ml-2 cursor-pointer" 
                       src="https://cdn.pixabay.com/photo/2022/03/23/02/48/cross-7086307_1280.png" 
                       alt="Cross" 
                       onClick={() => updateStatus(appt.id, "Rejected")} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop view: Regular table display */}
      <div className="hidden sm:flex flex-col">
        {appointments.map((appt) => (
          <div key={appt.id} className="flex items-center justify-between p-2 border-t">
            <div className="w-10 text-center">{appt.id}</div>
            <div className="flex-1 text-left">{appt.patient}</div>
            <div className="w-16 text-center">{appt.age}</div>
            <div className="w-48 text-center">{appt.dateTime}</div>
            <div className="flex-1 text-left">{appt.doctor}</div>
            <div className="w-20 text-center">{appt.fees}</div>
            <div className={`w-32 text-center font-semibold ${appt.status === "Booked" ? "text-green-600" : appt.status === "Rejected" ? "text-red-600" : "text-gray-500"}`}>
              {appt.status}
            </div>
            <div className="w-20 text-center">
              <button className="flex">
                <img className="rounded-full h-[25px] border-2 p-1 cursor-pointer" 
                     src="https://t4.ftcdn.net/jpg/05/19/99/45/360_F_519994541_TABPKuZ1QFkxo7uo33kYa0CBLnQ5MUq6.jpg" 
                     alt="Tick" 
                     onClick={() => updateStatus(appt.id, "Booked")} />
                <img className="rounded-full h-[25px] border-2 p-1 ml-2 cursor-pointer" 
                     src="https://cdn.pixabay.com/photo/2022/03/23/02/48/cross-7086307_1280.png" 
                     alt="Cross" 
                     onClick={() => updateStatus(appt.id, "Rejected")} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminAppointments;
