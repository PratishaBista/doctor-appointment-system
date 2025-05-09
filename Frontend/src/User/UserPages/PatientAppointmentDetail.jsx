import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { FiArrowLeft, FiFileText, FiClipboard, FiDroplet, FiCalendar, FiClock, FiCheckCircle, FiXCircle, FiAlertCircle } from "react-icons/fi";
import { toast } from "react-toastify";

const PatientAppointmentDetail = () => {
    const { appointmentId } = useParams();
    const navigate = useNavigate();
    const { backendUrl, token } = useContext(AppContext);
    const [appointment, setAppointment] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAppointmentDetails = async () => {
            try {
                const { data } = await axios.get(
                    `${backendUrl}/api/user/appointments/${appointmentId}`,
                    { headers: { token } }
                );

                if (data.success) {
                    setAppointment(data.appointment);
                } else {
                    toast.error(data.message || "Failed to load appointment details");
                }
            } catch (error) {
                console.error("Error fetching appointment:", error);
                toast.error("Failed to load appointment details");
            } finally {
                setLoading(false);
            }
        };

        fetchAppointmentDetails();
    }, [appointmentId, backendUrl, token]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (!appointment) {
        return (
            <div className="p-6 text-center">
                <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
                    <FiAlertCircle className="mx-auto h-12 w-12 text-red-500" />
                    <h2 className="mt-4 text-xl font-semibold text-gray-800">Appointment Not Found</h2>
                    <p className="mt-2 text-gray-600">
                        We couldn't retrieve the details for this appointment. Please try again later.
                    </p>
                    <button
                        onClick={() => navigate(-1)}
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                    >
                        Back to Appointments
                    </button>
                </div>
            </div>
        );
    }

    const getStatusIcon = () => {
        if (appointment.cancelled) {
            return <FiXCircle className="h-5 w-5 text-red-500" />;
        }
        if (appointment.isCompleted) {
            return <FiCheckCircle className="h-5 w-5 text-green-500" />;
        }
        return <FiClock className="h-5 w-5 text-blue-500" />;
    };

    const getStatusText = () => {
        if (appointment.cancelled) return 'Cancelled';
        if (appointment.isCompleted) return 'Completed';
        return 'Upcoming';
    };

    const getStatusColor = () => {
        if (appointment.cancelled) return 'text-red-600';
        if (appointment.isCompleted) return 'text-green-600';
        return 'text-blue-600';
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center text-blue-600 hover:text-blue-800 mb-6 transition"
            >
                <FiArrowLeft className="mr-2" /> Back to Appointments
            </button>

            {/* Appointment Summary Card */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6 border border-gray-100">
                <div className="p-6">
                    <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                            <img
                                src={appointment.doctorData.image || "https://via.placeholder.com/80"}
                                alt="Doctor"
                                className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                            />
                        </div>
                        <div className="flex-1">
                            <h2 className="text-xl font-semibold text-gray-800">{appointment.doctorData.name}</h2>
                            <p className="text-gray-600">{appointment.doctorData.speciality}</p>

                            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex items-start">
                                    <FiCalendar className="h-5 w-5 text-gray-400 mt-1 mr-2" />
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">Date</h3>
                                        <p className="text-gray-800">{appointment.slotDate}</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <FiClock className="h-5 w-5 text-gray-400 mt-1 mr-2" />
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">Time</h3>
                                        <p className="text-gray-800">{appointment.slotTime}</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="h-5 w-5 mt-1 mr-2">
                                        {getStatusIcon()}
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">Status</h3>
                                        <p className={`font-medium ${getStatusColor()}`}>
                                            {getStatusText()}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="h-5 w-5 mt-1 mr-2 text-gray-400">
                                        ₹
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">Fee</h3>
                                        <p className="text-gray-800">Rs. {appointment.doctorData.fees}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Follow-up Section */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6 border border-gray-100">
                <div className="p-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                        <FiFileText className="mr-2 text-gray-600" />
                        Follow-up Status
                    </h2>

                    {appointment.followUpRequired ? (
                        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <FiFileText className="h-5 w-5 text-yellow-400" />
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm text-yellow-700">
                                        Your doctor has requested a follow-up for this appointment.
                                    </p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-gray-50 border-l-4 border-gray-300 p-4 rounded">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <FiCheckCircle className="h-5 w-5 text-gray-400" />
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm text-gray-700">
                                        No follow-up required for this appointment.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Doctor Notes Section */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6 border border-gray-100">
                <div className="p-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                        <FiClipboard className="mr-2 text-gray-600" />
                        Doctor's Notes
                    </h2>

                    {appointment.doctorNotes ? (
                        <div className="bg-gray-50 p-4 rounded border border-gray-200">
                            <p className="text-gray-800 whitespace-pre-line">
                                {appointment.doctorNotes}
                            </p>
                        </div>
                    ) : (
                        <div className="bg-gray-50 p-4 rounded border border-gray-200">
                            <p className="text-gray-500 italic">
                                No notes have been added by the doctor for this appointment.
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Lab Tests Section */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
                <div className="p-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                        <FiDroplet className="mr-2 text-gray-600" />
                        Lab Tests
                    </h2>

                    {appointment.labTests?.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Test Type
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {appointment.labTests.map((test, index) => (
                                        <tr key={index}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {test.testType}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${test.status === 'completed' ? 'bg-green-100 text-green-800' :
                                                        test.status === 'requested' ? 'bg-blue-100 text-blue-800' :
                                                            'bg-yellow-100 text-yellow-800'
                                                    }`}>
                                                    {test.status.replace('_', ' ')}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="bg-gray-50 p-4 rounded border border-gray-200">
                            <p className="text-gray-500 italic">
                                No lab tests have been requested for this appointment.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PatientAppointmentDetail;