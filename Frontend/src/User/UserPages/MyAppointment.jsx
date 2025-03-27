import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

const MyAppointment = () => {
  const { docId } = useParams();
  const { AllDoctors } = useContext(AppContext);
  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState(null);

  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  useEffect(() => {
    const foundDoc = AllDoctors.find((doc) => doc.id.toString() === docId);
    setDocInfo(foundDoc || null);
  }, [docId, AllDoctors]);

  const getAvailableSlots = () => {
    let today = new Date();
    let slotsArray = [];

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0, 0);

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(Math.max(currentDate.getHours() + 1, 10));
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10, 0, 0, 0);
      }

      let timeSlots = [];
      while (currentDate < endTime) {
        timeSlots.push({
          datetime: new Date(currentDate),
          time: currentDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true }),
        });

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
      slotsArray.push(timeSlots);
    }

    setDocSlots(slotsArray);
  };

  useEffect(() => {
    if (docInfo) {
      getAvailableSlots();
    }
  }, [docInfo]);

  if (!docInfo) {
    return <p className="text-center text-gray-600 mt-10">Doctor not found...</p>;
  }

  return (
    <div className="p-6">
      {/* Doctor Details */}
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-1/3 flex justify-center">
          <img className="w-full max-w-sm rounded-lg shadow-md" src={docInfo.image} alt={docInfo.Name} />
        </div>

        <div className="w-full lg:w-2/3 border p-6 rounded-lg shadow-md">
          <h1 className="text-2xl sm:text-4xl font-bold">{docInfo.Name}</h1>
          <p className="text-lg text-gray-600 mt-2">{docInfo.Speciality}</p>
          <p className="text-lg text-gray-600 mt-2">
            {docInfo.Degree} <span className="text-sm border p-1">{docInfo.Experience} years</span>
          </p>
          <h2 className="text-xl font-semibold mt-4 underline">About</h2>
          <p className="text-gray-600 mt-2">{docInfo.Description}</p>
          <h2 className="text-lg mt-2">
            Fee: <span className="font-bold">{docInfo.Fees}</span>
          </h2>
        </div>
      </div>

      {/* Booking Slots */}
      <div className="mt-6">
        <p className="text-xl font-semibold">Booking Slots</p>

        {/* Date Selection */}
        <div className="flex gap-3 overflow-x-auto mt-4">
          {docSlots.map((item, index) => (
            <div
              key={index}
              onClick={() => setSlotIndex(index)}
              className={`text-center py-4 px-6 rounded-full cursor-pointer 
              ${slotIndex === index ? "bg-green-900 text-white" : "border"} transition`}
            >
              <p className="text-sm">{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
              <p className="text-lg font-semibold">{item[0] && item[0].datetime.getDate()}</p>
            </div>
          ))}
        </div>

        {/* Time Slots */}
        <div className="flex gap-3 overflow-x-auto mt-4">
          {docSlots.length > 0 &&
            docSlots[slotIndex].map((item, index) => (
              <p
                key={index}
                onClick={() => setSlotTime(item.time)}
                className={`px-5 py-2 rounded-full cursor-pointer 
                ${item.time === slotTime ? "bg-[#146A5D] text-white" : "border"} transition`}
              >
                {item.time}
              </p>
            ))}
        </div>

        {/* Book Button */}
        <div className="flex justify-center">
          <button className="bg-[#146A5D] text-white px-6 py-3 rounded-full mt-6 hover:bg-green-900 transition">
            Book an appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyAppointment;
