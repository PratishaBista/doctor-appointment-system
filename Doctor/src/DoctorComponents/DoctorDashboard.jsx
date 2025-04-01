import { motion } from "framer-motion";
import React, { useState } from "react";

// Initial Data
const initialBookedPatients = [
  {
    name: "Siddhant Shrestha",
    img: "https://static.vecteezy.com/system/resources/thumbnails/004/607/791/small_2x/man-face-emotive-icon-smiling-male-character-in-blue-shirt-flat-illustration-isolated-on-white-happy-human-psychological-portrait-positive-emotions-user-avatar-for-app-web-design-vector.jpg",
    date: "30 Mar 2025 at 10AM",
    status: null,
  },
  {
    name: "Sidd",
    img: "https://static.vecteezy.com/system/resources/thumbnails/004/607/791/small_2x/man-face-emotive-icon-smiling-male-character-in-blue-shirt-flat-illustration-isolated-on-white-happy-human-psychological-portrait-positive-emotions-user-avatar-for-app-web-design-vector.jpg",
    date: "30 Dec 2025 at 10AM",
    status: null,
  },
  {
    name: "Ram Bahadur",
    img: "https://static.vecteezy.com/system/resources/thumbnails/004/607/791/small_2x/man-face-emotive-icon-smiling-male-character-in-blue-shirt-flat-illustration-isolated-on-white-happy-human-psychological-portrait-positive-emotions-user-avatar-for-app-web-design-vector.jpg",
    date: "30 Aug 2026 at 10AM",
    status: null,
  },
  {
    name: "Customer",
    img: "https://static.vecteezy.com/system/resources/thumbnails/004/607/791/small_2x/man-face-emotive-icon-smiling-male-character-in-blue-shirt-flat-illustration-isolated-on-white-happy-human-psychological-portrait-positive-emotions-user-avatar-for-app-web-design-vector.jpg",
    date: "12 Oct 2025 at 10AM",
    status: null,
  },
];

const DoctorDashboard = () => {
  const [bookedPatients, setBookedPatients] = useState(initialBookedPatients);

  // Handle the tick icon click (mark as completed)
  const handleTick = (index) => {
    const updatedPatients = [...bookedPatients];
    updatedPatients[index].status = true;
    setBookedPatients(updatedPatients);
  };

  // Handle the cross icon click (mark as rejected)
  const handleCross = (index) => {
    const updatedPatients = [...bookedPatients];
    updatedPatients[index].status = false;
    setBookedPatients(updatedPatients);
  };

  return (
    <motion.div
      className="p-1"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="flex justify-between border border-gray-300 shadow-md rounded-lg p-4 bg-white w-[80vw]">
        {/* Experience */}
        <motion.div
          whileHover={{ scale: 1.05, boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)" }}
          className="flex items-center gap-3 p-4 rounded-lg transition duration-300"
        >
          <div className="w-16 h-16 flex items-center justify-center">
            <img
              className="w-full h-full object-contain"
              src="https://static.vecteezy.com/system/resources/previews/026/220/984/non_2x/experience-icon-symbol-design-illustration-vector.jpg"
              alt="Experience"
            />
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-[#146A5D]">5 years</p>
            <h1 className="text-gray-600">Experience</h1>
          </div>
        </motion.div>

        {/* Booked Appointments */}
        <motion.div
          whileHover={{ scale: 1.05, boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)" }}
          className="flex items-center gap-3 p-4 rounded-lg transition duration-300"
        >
          <div className="w-16 h-16 flex items-center justify-center">
            <img
              className="w-full h-full object-contain"
              src="https://static.vecteezy.com/system/resources/thumbnails/024/150/216/small_2x/calendar-icon-vector.jpg"
              alt="Appointments"
            />
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-[#146A5D]">5</p>
            <h1 className="text-gray-600">Booked Appointments</h1>
          </div>
        </motion.div>

        {/* Patients */}
        <motion.div
          whileHover={{ scale: 1.05, boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)" }}
          className="flex items-center gap-3 p-4 rounded-lg transition duration-300"
        >
          <div className="w-16 h-16 flex items-center justify-center">
            <img
              className="w-full h-full object-contain"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQx4WPMRwUZHH4CIYhmmhdmOPjBP03sSfRshQ&s"
              alt="Patients"
            />
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-[#146A5D]">5</p>
            <h1 className="text-gray-600">Patients</h1>
          </div>
        </motion.div>

        {/* Speciality */}
        <motion.div
          whileHover={{ scale: 1.05, boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)" }}
          className="flex items-center gap-3 p-4 rounded-lg transition duration-300"
        >
          <div className="w-16 h-16 flex items-center justify-center">
            <img
              className="w-full h-full object-contain"
              src="https://media.istockphoto.com/id/1299755243/vector/creative-idea-line-icon-lump-with-gear-icon-brain-in-lightbulb-vector-illustration-thin-sign.jpg?s=612x612&w=0&k=20&c=CaqnVEqz2RqzbqoEGhU8UBFMTBGWHa1zROXrtTtlH_I="
              alt="Speciality"
            />
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-[#146A5D]">Gyno</p>
            <h1 className="text-gray-600">Speciality</h1>
          </div>
        </motion.div>
      </div>

      <div className="mt-10">
        <h1 className="text-3xl font-bold underline w-[700px] text-center">Recent Bookings</h1>
        <div className="max-h-[1px] bg-black w-screen mt-1"></div>

        <div className="">
          {bookedPatients.map((item, index) => (
            <div
              key={index}
              className="flex m-4 my-8 justify-between max-w-[700px] border border-gray-300 shadow-lg rounded-lg p-4 bg-white hover:shadow-xl transition duration-300"
            >
              <div className="flex">
                <div className="">
                  <img className="h-[40px]" src={item.img} alt="" />
                </div>
                <div className="ml-4">
                  <p>{item.name}</p>
                  <p>Booking on {item.date}</p>
                </div>
              </div>

              <div className="flex">
                {item.status === true ? (
                  <h1 className="text-green-500 font-semibold">Completed</h1>
                ) : item.status === false ? (
                  <h1 className="text-red-500 font-semibold">Rejected</h1>
                ) : (
                  <>
                    <img
                      onClick={() => handleTick(index)}
                      className="h-[48px] border-2 rounded-full p-2 cursor-pointer"
                      src="https://www.freeiconspng.com/thumbs/check-tick-icon/tick-icon-30.png"
                      alt="Tick"
                    />
                    <img
                      onClick={() => handleCross(index)}
                      className="h-[48px] ml-8 border-2 rounded-full p-2 cursor-pointer"
                      src="https://cdn.pixabay.com/photo/2022/03/23/02/48/cross-7086307_1280.png"
                      alt="Cross"
                    />
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default DoctorDashboard;
