import { motion } from "framer-motion";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const AppointmentsPage = () => {
    const { backendUrl, token, daysOfWeek, months, getDoctorsData } = useContext(AppContext);
    const [appointments, setAppointments] = useState([]);
    const [activeTab, setActiveTab] = useState("upcoming");
    const [isLoading, setIsLoading] = useState(true);
    const [currentAppointment, setCurrentAppointment] = useState(null);

    useEffect(() => {
        if (token) {
            console.log("Fetching appointments for token:", token); // Debug
            fetchAppointments();
        }
    }, [token]);

    const fetchAppointments = async () => {
        if (!token) {
            toast.warn("Please login to view your appointments.");
            return;
        }

        setIsLoading(true);
        try {
            const { data } = await axios.get(`${backendUrl}/api/user/appointments`, {
                headers: { token },
            });
            console.log("Received appointments data:", data);

            if (data.success) {
                setAppointments(data.appointments.reverse() || []);
            } else {
                toast.error(data.message || "Failed to fetch appointments");
            }
        } catch (error) {
            toast.error("Error fetching appointments");
        } finally {
            setIsLoading(false);
        }
    };

    const cancelAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(
                `${backendUrl}/api/user/cancel-appointment`,
                { appointmentId },
                { headers: { token } }
            );
            if (data.success) {
                toast.success("Appointment cancelled successfully");
                fetchAppointments();
                getDoctorsData();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Error cancelling appointment");
        }
    };

    useEffect(() => {
        if (token) fetchAppointments();
    }, [token]);

    const parseAppointmentDate = (slotDate, slotTime) => {
        const [day, month, year] = slotDate.split("-");
        // Convert 12h to 24h format
        const [time, modifier] = slotTime.split(" ");
        let [hours, minutes] = time.split(":").map(Number);

        if (modifier === "PM" && hours !== 12) {
            hours += 12;
        }
        if (modifier === "AM" && hours === 12) {
            hours = 0;
        }

        // Format to YYYY-MM-DDTHH:MM
        const isoString = `${year}-${month}-${day}T${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
        return new Date(isoString);
    };

    const now = new Date();
    const upcoming = appointments.filter(
        (a) => !a.cancelled && parseAppointmentDate(a.slotDate, a.slotTime) > now
    );
    const past = appointments.filter(
        (a) => !a.cancelled && parseAppointmentDate(a.slotDate, a.slotTime) <= now && !a.ongoing
    );

    const cancelled = appointments.filter((a) => a.cancelled);
    const ongoing = appointments.filter((a) => a.ongoing);

    const renderAppointmentCard = (appointment, type) => {
        const slotDate = appointment.slotDate;
        const dateParts = slotDate.split("-");
        const month = parseInt(dateParts[1], 10) - 1;
        const appointmentDate = parseAppointmentDate(appointment.slotDate, appointment.slotTime);

        return (
            <motion.div
                key={appointment._id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => type === "ongoing" && setCurrentAppointment(appointment)}
            >
                <div className="p-5">
                    <div className="flex items-start">
                        <img
                            src={appointment.doctorData.image}
                            alt={appointment.doctorData.name}
                            className="w-16 h-16 rounded-full object-cover mr-4"
                        />
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-800">{appointment.doctorData.name}</h3>
                            <p className="text-sm text-gray-600">{appointment.doctorData.speciality}</p>

                            <div className="mt-3 grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-xs text-gray-500">Date</p>
                                    <p className="text-sm font-medium text-gray-800">
                                        {appointmentDate.toLocaleDateString('en-US', {
                                            weekday: 'short',
                                            month: 'short',
                                            day: 'numeric'
                                        })}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500">Time</p>
                                    <p className="text-sm font-medium text-gray-800">
                                        {appointment.slotTime}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500">Fee</p>
                                    <p className="text-sm font-medium text-gray-800">
                                        Rs {appointment.doctorData.fees}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500">Status</p>
                                    <p className={`text-sm font-medium ${type === 'cancelled' ? 'text-red-600' :
                                        type === 'upcoming' ? 'text-blue-600' :
                                            type === 'ongoing' ? 'text-green-600' :
                                            'text-gray-600'
                                        }`}>
                                        {type === 'cancelled' ? 'Cancelled' :
                                            type === 'upcoming' ? 'Upcoming' :
                                            type === 'ongoing' ? 'Ongoing' : 'Completed'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {type === "upcoming" && (
                        <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                            <div className="flex space-x-2">
                                <motion.button
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="px-3 py-1.5 text-xs font-medium rounded-md border border-green-600 text-green-600"
                                >
                                    Pay Online
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="px-3 py-1.5 text-xs font-medium rounded-md border border-blue-600 text-blue-600"
                                >
                                    Pay at Clinic
                                </motion.button>
                            </div>
                            <motion.button
                                onClick={() => cancelAppointment(appointment._id)}
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.98 }}
                                className="px-3 py-1.5 text-xs font-medium rounded-md border border-red-600 text-red-600"
                            >
                                Cancel
                            </motion.button>
                        </div>
                    )}
                </div>
            </motion.div>
        );
    };

    const renderOngoingAppointmentDetails = (appointment) => {
        return (
            <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
                <h2 className="text-2xl font-semibold text-gray-800">Current Appointment with {appointment.doctorData.name}</h2>
                <p className="text-sm text-gray-600">{appointment.doctorData.speciality}</p>

                <div className="space-y-2">
                    <h3 className="text-lg font-medium text-gray-700">Follow-up Required:</h3>
                    <p className="text-sm text-gray-500">{appointment.doctorFeedback?.followUp || "Not specified"}</p>
                </div>

                <div className="space-y-2">
                    <h3 className="text-lg font-medium text-gray-700">Doctor's Feedback:</h3>
                    <p className="text-sm text-gray-500">{appointment.doctorFeedback?.feedback || "No feedback yet"}</p>
                </div>

                <div className="space-y-2">
                    <h3 className="text-lg font-medium text-gray-700">Prescription:</h3>
                    <p className="text-sm text-gray-500">{appointment.prescription || "No prescription provided"}</p>
                </div>

                {appointment.doctorFeedback && !appointment.userFeedback && (
                    <div className="mt-4">
                        <h3 className="text-lg font-medium text-gray-700">Write Your Feedback</h3>
                        <textarea
                            className="w-full p-3 border border-gray-300 rounded-md"
                            rows="4"
                            placeholder="Write your feedback here..."
                        />
                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md"
                        >
                            Submit Feedback
                        </motion.button>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <motion.h1
                className="text-2xl font-bold text-gray-800 mb-6"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                My Appointments
            </motion.h1>

            {/* Tabs */}
            <div className="mb-6 border-b border-gray-200">
                <nav className="flex space-x-8">
                    {[{ id: 'upcoming', label: 'Upcoming', count: upcoming.length },
                      { id: 'past', label: 'Past', count: past.length },
                      { id: 'cancelled', label: 'Cancelled', count: cancelled.length },
                      { id: 'ongoing', label: 'Ongoing', count: ongoing.length }
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`py-3 px-1 font-medium text-sm border-b-2 transition-colors ${activeTab === tab.id
                                ? 'border-blue-500 text-blue-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            {tab.label}
                            {tab.count > 0 && (
                                <span className="ml-2 bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs">
                                    {tab.count}
                                </span>
                            )}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Content */}
            {isLoading ? (
                <div className="flex justify-center py-12">
                    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            ) : (
                <div className="space-y-4">
                    {activeTab === 'upcoming' && (
                        upcoming.length > 0 ? (
                            upcoming.map(appointment => renderAppointmentCard(appointment, 'upcoming'))
                        ) : (
                            <div className="text-center py-12 text-gray-500">
                                No upcoming appointments
                            </div>
                        )
                    )}

                    {activeTab === 'past' && (
                        past.length > 0 ? (
                            past.map(appointment => renderAppointmentCard(appointment, 'past'))
                        ) : (
                            <div className="text-center py-12 text-gray-500">
                                No past appointments
                            </div>
                        )
                    )}

                    {activeTab === 'cancelled' && (
                        cancelled.length > 0 ? (
                            cancelled.map(appointment => renderAppointmentCard(appointment, 'cancelled'))
                        ) : (
                            <div className="text-center py-12 text-gray-500">
                                No cancelled appointments
                            </div>
                        )
                    )}

                    {activeTab === 'ongoing' && (
                        ongoing.length > 0 ? (
                            ongoing.map(appointment => renderAppointmentCard(appointment, 'ongoing'))
                        ) : (
                            <div className="text-center py-12 text-gray-500">
                                No ongoing appointments
                            </div>
                        )
                    )}

                    {currentAppointment && renderOngoingAppointmentDetails(currentAppointment)}
                </div>
            )}
        </div>
    );
};

export default AppointmentsPage;
