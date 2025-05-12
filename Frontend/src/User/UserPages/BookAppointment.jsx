import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

const BookAppointment = () => {
  const { docId } = useParams();  
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
        // toast.error("Doctor not found");
        navigate("/FindDoctors");
      }
    }
  }, [docId, doctors, navigate]);

  const bookAppointment = async () => {
    if (!token) {
      toast.warn("Please login to book an appointment.");
      return navigate("/auth");
    }

    if (!docInfo) {
      toast.error("Doctor information not loaded yet.");
      return;
    }

    if (docInfo.available === false) {
      toast.warn("This doctor is currently unavailable for appointments.");
      return;
    }

    if (!slotTime) {
      toast.warn("Please select a time slot.");
      return;
    }

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
        navigate("/dashboard/appointments");
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
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F6FA] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Book Appointment</h1>
          <p className="text-gray-600 mt-2">Select your preferred date and time</p>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Doctor Card */}
          <div className="p-6 md:p-8 border-b border-gray-100">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#0288d1]">
                <img
                  className="w-full h-full object-cover"
                  src={docInfo.image}
                  alt={docInfo.name}
                />
              </div>

              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl font-bold text-gray-800">{docInfo.name}</h2>
                <p className="text-[#0288d1] font-medium">{docInfo.speciality}</p>

                <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-3">
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                    {docInfo.degree}
                  </span>
                  <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm">
                    {docInfo.experience} experience
                  </span>
                  <span className="px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-sm">
                    ₹{docInfo.fees} consultation fee
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Section */}
          <div className="p-6 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Calendar Section */}
              <div className="lg:col-span-1">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Select Date</h3>
                <div className="grid grid-cols-7 gap-2">
                  {docSlots.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSlotIndex(index);
                        setSelectedDate(item[0]?.datetime.getDate());
                        setSelectedMonth(item[0]?.datetime.getMonth() + 1);
                      }}
                      className={`flex flex-col items-center justify-center p-3 rounded-lg transition-all
                        ${slotIndex === index
                          ? "bg-[#0288d1] text-white shadow-md"
                          : "bg-white border border-gray-200 hover:bg-gray-50"}
                        ${!item.length ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                      disabled={!item.length}
                    >
                      <span className="text-xs font-medium">
                        {item[0] && daysOfWeek[item[0].datetime.getDay()].substring(0, 3)}
                      </span>
                      <span className="text-lg font-semibold mt-1">
                        {item[0] && item[0].datetime.getDate()}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Slots Section */}
              <div className="lg:col-span-2">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Available Time Slots</h3>

                {docSlots.length > 0 && docSlots[slotIndex].length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {docSlots[slotIndex].map((item, index) => (
                      <button
                        key={index}
                        onClick={() => setSlotTime(item.time)}
                        className={`p-3 rounded-lg text-center transition-all
                          ${item.time === slotTime
                            ? "bg-[#4CAF50] text-white shadow-md"
                            : "bg-white border border-gray-200 hover:bg-gray-50"}`}
                      >
                        {item.time}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-yellow-700">
                          No available slots for this day. Please select another date.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Book Button */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <button
                    onClick={bookAppointment}
                    disabled={isBooking || !slotTime}
                    className={`w-full py-3 px-6 rounded-lg bg-[#0288d1] text-white font-medium shadow-md hover:bg-[#0277bd] transition
                      ${isBooking || !slotTime ? "opacity-70 cursor-not-allowed" : ""}`}
                  >
                    {isBooking ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      "Confirm Appointment"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Doctor Details Section */}
        <div className="mt-8 bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 md:p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">About {docInfo.name}</h3>
            <div className="prose max-w-none text-gray-600">
              <p>{docInfo.about}</p>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center">
                    <svg className="h-6 w-6 text-[#0288d1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-900">Specialization</h4>
                    <p className="mt-1 text-gray-600">{docInfo.speciality}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center">
                    <svg className="h-6 w-6 text-[#0288d1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-900">Qualifications</h4>
                    <p className="mt-1 text-gray-600">{docInfo.degree}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;
