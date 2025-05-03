import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

const MyAppointment = () => {
  const { docId } = useParams();  // Fetching doctor ID from URL
  const {
    doctors,
    backendUrl,
    token,
    getDoctorsData,
    slotTime,
    setSlotTime,
    slotIndex,
    setSlotIndex,
    daysOfWeek,
    setSelectedDate,
    setSelectedMonth
  } = useContext(AppContext);

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [isBooking, setIsBooking] = useState(false);
  const navigate = useNavigate();

  // Fetch doctor info
  useEffect(() => {
    if (doctors && docId) {
      const foundDoc = doctors.find((doc) => doc._id.toString() === docId);
      if (foundDoc) {
        setDocInfo(foundDoc);
      } else {
        toast.error("Doctor not found");
        navigate("/doctors");
      }
    }
  }, [docId, doctors, navigate]);

  // Book appointment function
  const bookAppointment = async () => {
    if (!token) {
      toast.warn("Please login to book an appointment.");
      return navigate("/auth");
    }

    if (!docInfo) {
      toast.error("Doctor information not loaded yet.");
      return;
    }

    // Check if doctor is available
    if (docInfo.available === false) {
      toast.warn("This doctor is currently unavailable for appointments.");
      return;
    }

    // Check if slot is selected
    if (!slotTime) {
      toast.warn("Please select a time slot.");
      return;
    }

    // Check if there are available slots for the selected date
    if (!docSlots.length || !docSlots[slotIndex] || docSlots[slotIndex].length === 0) {
      toast.warn("No available slots for the selected date.");
      return;
    }

    setIsBooking(true);
    try {
      const date = docSlots[slotIndex][0].datetime;
      let day = String(date.getDate()).padStart(2, '0');
      let month = String(date.getMonth() + 1).padStart(2, '0');
      let year = date.getFullYear();
      const slotDate = `${day}-${month}-${year}`;

      const { data } = await axios.post(
        `${backendUrl}/api/user/book-appointment`,
        {
          userId: token.userId, 
          doctorId: docId,
          slotDate,
          slotTime
        },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        getDoctorsData();
        navigate("/bookedAppointment");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "Failed to book appointment";
      toast.error(errorMessage);
    } finally {
      setIsBooking(false);
    }
  };

  const getAvailableSlots = () => {
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    let slotsArray = [];

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let startTime = new Date(currentDate);
      let endTime = new Date(currentDate);

      startTime.setHours(10, 0, 0, 0);
      endTime.setHours(21, 0, 0, 0);

      if (i === 0) {
        const now = new Date();
        startTime.setHours(Math.max(now.getHours() + 1, 10));
        startTime.setMinutes(now.getMinutes() > 30 ? 30 : 0, 0, 0);
      }

      let timeSlots = [];
      let slotTime = new Date(startTime);

      let day = String(currentDate.getDate()).padStart(2, '0');
      let month = String(currentDate.getMonth() + 1).padStart(2, '0');
      let year = currentDate.getFullYear();
      const slotDate = `${day}-${month}-${year}`;

      while (slotTime < endTime) {
        const formattedTime = slotTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true
        });

        const isSlotAvailable = !(
          docInfo.slots_booked &&
          docInfo.slots_booked[slotDate] &&
          docInfo.slots_booked[slotDate].includes(formattedTime)
        );

        if (isSlotAvailable) {
          timeSlots.push({
            datetime: new Date(slotTime),
            time: formattedTime,
          });
        }

        slotTime.setMinutes(slotTime.getMinutes() + 30);
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
    return <p className="text-center text-gray-600 mt-10">Loading doctor information...</p>;
  }

  return (
    <div className="p-6">
      {/* Doctor Details */}
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-1/3 flex justify-center">
          <img
            className="w-full max-w-sm rounded-lg shadow-md"
            src={docInfo.image}
            alt={docInfo.name}
          />
        </div>

        <div className="w-full lg:w-2/3 border p-6 rounded-lg shadow-md">
          <h1 className="text-2xl sm:text-4xl font-bold">{docInfo.name}</h1>
          <p className="text-lg text-gray-600 mt-2">{docInfo.speciality}</p>
          <p className="text-lg text-gray-600 mt-2">
            {docInfo.degree} <span className="text-sm border p-1">{docInfo.experience} years</span>
          </p>
          <h2 className="text-xl font-semibold mt-4 underline">About</h2>
          <p className="text-gray-600 mt-2">{docInfo.about}</p>
          <h2 className="text-lg mt-2">
            Fee: <span className="font-bold">{docInfo.fees}</span>
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
              onClick={() => {
                console.log("Date selected:", item[0]?.datetime);
                setSlotIndex(index);
                setSelectedDate(item[0] ? item[0].datetime.getDate() : null);
                setSelectedMonth(item[0] ? item[0].datetime.getMonth() + 1 : null);
              }}
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
          {docSlots.length > 0 && docSlots[slotIndex].length > 0 ? (
            docSlots[slotIndex].map((item, index) => (
              <p
                key={index}
                onClick={() => {
                  console.log("Time slot selected:", item.time);
                  setSlotTime(item.time);
                }}
                className={`px-5 py-2 rounded-full cursor-pointer
                ${item.time === slotTime ? "bg-[#146A5D] text-white" : "border-2"} transition`}
              >
                {item.time}
              </p>
            ))
          ) : (
            <p className="text-gray-500">No available slots for this day</p>
          )}
        </div>

        {/* Book Button */}
        <div className="flex justify-center">
          <button
            onClick={bookAppointment}
            disabled={isBooking || !slotTime}
            className={`bg-[#146A5D] text-white px-6 py-3 rounded-full mt-6 hover:bg-green-900 transition ${isBooking || !slotTime ? "opacity-50 cursor-not-allowed" : ""
              }`}
          >
            {isBooking ? "Booking..." : "Book an appointment"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyAppointment;
