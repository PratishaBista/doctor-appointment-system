import React from 'react';

const AdminAppointments = () => {
  return (
    <div className="p-4 w-[80vw]">
      <h1 className="text-2xl font-semibold mb-4">All Appointments</h1>
      
      {/* Table Header */}
      <div className="grid grid-cols-7 gap-4 p-2 bg-gray-200 font-semibold text-gray-800">
        <div><p>#</p></div>
        <div className="w-[400px]"><p>Patient</p></div>
        <div><p>Age</p></div>
        <div><p>Date & Time</p></div>
        <div className="w-[400px]"><p>Doctor</p></div>
        <div><p>Fees</p></div>
        <div><p>Action</p></div>
      </div>

      {/* Table Data (This part will be dynamically loaded) */}
      <div className="grid grid-cols-7 gap-4 p-2 border-t">
        <div><p>1</p></div>
        <div className="w-[400px]"><p>John Doe</p></div>
        <div><p>30</p></div>
        <div><p>2025-03-22 10:00 AM</p></div>
        <div className="w-[400px]"><p>Dr. Smith</p></div>
        <div><p>$100</p></div>
        <div><button className="text-blue-500">Edit</button></div>
      </div>

      {/* Repeat the above structure for more rows */}
      {/* You can map through the data and generate rows dynamically */}
    </div>
  );
};

export default AdminAppointments;
