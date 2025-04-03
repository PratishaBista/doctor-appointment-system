import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

const MyAppointment = () => {
  const { docId } = useParams();
  const { AllDoctors,slotTime, setSlotTime,slotIndex, setSlotIndex,daysOfWeek,
    selectedDate, setSelectedDate,selectedMonth, setSelectedMonth,booked,setBooked
   } = useContext(AppContext);
  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const navigate=useNavigate()
  const [selectedDocId,setSelectedDocId]=useState()
  const [isAlreadyBooked, setIsAlreadyBooked] = useState(false);

  useEffect(() => {
    const foundDoc = AllDoctors.find((doc) => doc.id.toString() === docId);
    setDocInfo(foundDoc || null);
    setSelectedDocId(docId);
    
    let existingBookings = JSON.parse(localStorage.getItem("bookedDoctors")) || [];
    setIsAlreadyBooked(existingBookings.some((doc) => doc.id.toString() === docId && doc.slotTime === slotTime));
  }, [docId, AllDoctors, slotTime]);

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

  const handleBooking=()=>{
    let existingBookings = JSON.parse(localStorage.getItem("bookedDoctors")) || [];
    existingBookings.push({...docInfo, slotTime});
    localStorage.setItem("bookedDoctors", JSON.stringify(existingBookings));
    setIsAlreadyBooked(true);
    navigate(`/bookedAppointment/${selectedDocId}`, { state: { docId: selectedDocId } });
  }

  return (
    <div className="p-6">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-1/3 flex justify-center">
          <img className="w-full max-w-sm rounded-lg shadow-md" src={docInfo.image} alt={docInfo.Name} />
        </div>
        <div className="w-full lg:w-2/3 border p-6 rounded-lg shadow-md">
          <h1 className="text-2xl sm:text-4xl font-bold">{docInfo.Name}</h1>
          <p className="text-lg text-gray-600 mt-2">{docInfo.Speciality}</p>
          <p className="text-lg text-gray-600 mt-2">{docInfo.Degree} <span className="text-sm border p-1">{docInfo.Experience} years</span></p>
          <h2 className="text-xl font-semibold mt-4 underline">About</h2>
          <p className="text-gray-600 mt-2">{docInfo.Description}</p>
          <h2 className="text-lg mt-2">Fee: <span className="font-bold">{docInfo.Fees}</span></h2>
        </div>
      </div>

      <div className="mt-6">
        <p className="text-xl font-semibold">Booking Slots</p>
        <div className="flex gap-3 overflow-x-auto mt-4">
          {docSlots.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                setSlotIndex(index);
                setSelectedDate(item[0] ? item[0].datetime.getDate() : null);
                if (item[0]) {
                  setSelectedMonth(item[0].datetime.getMonth() + 1);
                }
              }}
              className={`text-center py-4 px-6 rounded-full cursor-pointer ${slotIndex === index ? "bg-green-900 text-white" : "border"} transition`}
            >
              <p className="text-sm">{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
              <p className="text-lg font-semibold">{item[0] && item[0].datetime.getDate()}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-3 overflow-x-auto mt-4 ">
          {docSlots.length > 0 &&
            docSlots[slotIndex].map((item, index) => (
              <p
                key={index}
                onClick={() => {
                  setSlotTime(item.time);
                  setBooked(false);
                }}
                className={`px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? "bg-[#146A5D] text-white" : "border-2"} transition`}
              >
                {item.time}
              </p>
            ))}
        </div>

        <div className={`flex justify-center ${booked || isAlreadyBooked ? "pointer-events-none opacity-50" : ""}`}>
          <button onClick={handleBooking} disabled={booked || isAlreadyBooked} className="bg-[#146A5D] text-white px-6 py-3 rounded-full mt-6 hover:bg-green-900 transition">
            {isAlreadyBooked ? "Already Booked for this Slot" : "Book an appointment"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyAppointment;