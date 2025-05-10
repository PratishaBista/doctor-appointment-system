import { motion } from "framer-motion";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Appointments = () => {
    const { backendUrl, token, getDoctorsData } = useContext(AppContext);
    const [appointments, setAppointments] = useState([]);
    const [activeTab, setActiveTab] = useState("upcoming");
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
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

    const parseAppointmentDate = (slotDate, slotTime) => {
        const [day, month, year] = slotDate.split("-");
        const [time, modifier] = slotTime.split(" ");
        let [hours, minutes] = time.split(":").map(Number);

        if (modifier === "PM" && hours !== 12) {
            hours += 12;
        }
        if (modifier === "AM" && hours === 12) {
            hours = 0;
        }

        const isoString = `${year}-${month}-${day}T${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
        return new Date(isoString);
    };

    const now = new Date();
    
    const upcoming = appointments.filter(
        (a) => !a.cancelled && !a.isCompleted && parseAppointmentDate(a.slotDate, a.slotTime) > now
    );
    
    const past = appointments.filter(
        (a) => !a.cancelled && a.isCompleted
    );
    
    const cancelled = appointments.filter((a) => a.cancelled);

    const renderAppointmentCard = (appointment, type) => {
        const appointmentDate = parseAppointmentDate(appointment.slotDate, appointment.slotTime);
        
        let statusLabel = type === 'cancelled' ? 'Cancelled' : 
                         type === 'upcoming' ? 'Upcoming' : 'Completed';
        
        let statusClasses = type === 'cancelled' ? 'bg-red-100 text-red-800' :
                           type === 'upcoming' ? 'bg-blue-100 text-blue-800' : 
                           'bg-green-100 text-green-800';

        return (
            <motion.div
                key={appointment._id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                <div className="p-5">
                    <div className="flex items-start">
                        <img
                            src={appointment.doctorData.image}
                            alt={appointment.doctorData.name}
                            className="w-16 h-16 rounded-full object-cover mr-4"
                        />
                        <div className="flex-1">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800">{appointment.doctorData.name}</h3>
                                    <p className="text-sm text-gray-600">{appointment.doctorData.speciality}</p>
                                </div>
                                <span className={`text-xs px-2 py-1 rounded-full ${statusClasses}`}>
                                    {statusLabel}
                                </span>
                            </div>

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
                                    <p className="text-xs text-gray-500">Payment</p>
                                    <p className="text-sm font-medium text-gray-800">
                                        {appointment.payment?.status === 'completed' ? 'Paid' : 'Pending'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {type === "upcoming" && (
                        <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center space-x-3">
                            <button
                                onClick={() => navigate(`/dashboard/appointments/${appointment._id}`)}
                                className="px-3 py-2 text-sm font-medium text-white bg-[#0288d1ff] rounded hover:bg-[#0289d1df] transition"
                            >
                                View Details
                            </button>
                            <div className="flex space-x-2">
                                <motion.button
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="px-3 py-2 text-xs font-medium rounded-md border border-green-600 text-green-600 hover:bg-green-50"
                                >
                                    Pay Online
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="px-3 py-2 text-xs font-medium rounded-md border border-blue-600 text-blue-600 hover:bg-blue-50"
                                >
                                    Pay at Clinic
                                </motion.button>
                                <motion.button
                                    onClick={() => cancelAppointment(appointment._id)}
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="px-3 py-2 text-xs font-medium rounded-md border border-red-600 text-red-600 hover:bg-red-50"
                                >
                                    Cancel
                                </motion.button>
                            </div>
                        </div>
                    )}
                    
                    {type === "past" && (
                        <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end">
                            <button
                                onClick={() => navigate(`/dashboard/appointments/${appointment._id}`)}
                                className="px-3 py-2 text-sm font-medium text-white bg-[#0288d1ff] rounded hover:bg-[#0289d1df] transition"
                            >
                                View Details
                            </button>
                        </div>
                    )}
                    
                    {type === "cancelled" && (
                        <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end">
                            <button
                                onClick={() => navigate(`/dashboard/appointments/${appointment._id}`)}
                                className="px-3 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded hover:bg-gray-200 transition"
                            >
                                View Details
                            </button>
                        </div>
                    )}
                </div>
            </motion.div>
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
                    {[
                        { id: 'upcoming', label: 'Upcoming', count: upcoming.length },
                        { id: 'past', label: 'Appointment History', count: past.length }, //if the doctor has marked the appointment as completed
                        { id: 'cancelled', label: 'Cancelled', count: cancelled.length }
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
                </div>
            )}
        </div>
    );
};

export default Appointments;