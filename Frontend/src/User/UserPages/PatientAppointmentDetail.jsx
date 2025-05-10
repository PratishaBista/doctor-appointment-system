import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import {
    FiArrowLeft,
    FiFileText,
    FiClipboard,
    FiDroplet,
    FiCalendar,
    FiClock,
    FiCheckCircle,
    FiXCircle,
    FiAlertCircle,
    FiPrinter,
    FiFilePlus
} from "react-icons/fi";
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
                    console.log("Appointment data:", data.appointment);
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

    const [patientReply, setPatientReply] = useState("");

    const handleSubmitPatientReply = async () => {
        try {
            const { data } = await axios.post(
                `${backendUrl}/api/user/add-comment`,
                {
                    appointmentId,
                    comment: patientReply
                },
                { headers: { token } }
            );

            if (data.success) {
                toast.success("Reply sent successfully");
                setAppointment(data.appointment);
                setPatientReply("");
            }
        } catch (error) {
            console.error("Error sending reply:", error);
            toast.error(error.response?.data?.message || "Failed to send reply");
        }
    };

    const handlePrintPrescription = () => {
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
        <html>
          <head>
            <title>Prescription - ${appointment?.userData?.name}</title>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; padding: 20px; }
              .header { text-align: center; margin-bottom: 30px; }
              .header h1 { margin-bottom: 5px; }
              .header hr { width: 100px; margin: 10px auto; border: 1px solid #ddd; }
              .patient-info, .doctor-info { margin-bottom: 20px; }
              .prescription-content { border-top: 1px solid #ddd; border-bottom: 1px solid #ddd; padding: 20px 0; margin: 20px 0; }
              .signature { margin-top: 50px; text-align: right; }
              .footer { margin-top: 50px; font-size: 12px; color: #666; text-align: center; }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>Medical Prescription</h1>
              <hr />
              <p>${new Date().toLocaleDateString()}</p>
            </div>
            
            <div class="patient-info">
              <h3>Patient Information</h3>
              <p><strong>Name:</strong> ${appointment?.userData?.name}</p>
              <p><strong>Age:</strong> ${appointment?.userData?.age || 'N/A'}</p>
            </div>
            
            <div class="prescription-content">
              ${appointment?.prescription || '<p>No prescription provided.</p>'}
            </div>
            
            <div class="doctor-info">
              <div class="signature">
                <p><strong>Dr. ${appointment?.doctorData?.name}</strong></p>
                <p>${appointment?.doctorData?.speciality}</p>
                <p>License No: XXXXXXXX</p>
                <br /><br />
                <p>_________________________</p>
                <p>Signature</p>
              </div>
            </div>
            
            <div class="footer">
              <p>This is a computer generated prescription and does not require a physical signature.</p>
            </div>
          </body>
        </html>
      `);
        printWindow.document.close();
        printWindow.focus();
        setTimeout(() => {
            printWindow.print();
        }, 500);
    };

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

            {/* Prescription Section */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6 border border-gray-100">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                            <FiFilePlus className="mr-2 text-gray-600" />
                            Prescription
                        </h2>
                        {appointment.prescription && (
                            <button
                                onClick={handlePrintPrescription}
                                className="flex items-center text-blue-600 hover:text-blue-800 transition"
                            >
                                <FiPrinter className="mr-1" /> Print
                            </button>
                        )}
                    </div>

                    {appointment.prescription ? (
                        <div className="bg-gray-50 p-4 rounded border border-gray-200">
                            <div
                                className="prose max-w-none"
                                dangerouslySetInnerHTML={{ __html: appointment.prescription }}
                            />
                        </div>
                    ) : (
                        <div className="bg-gray-50 p-4 rounded border border-gray-200">
                            <p className="text-gray-500 italic">
                                No prescription has been provided for this appointment.
                            </p>
                        </div>
                    )}
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

            {/* Comments Section */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mt-6 border border-gray-100">
                <div className="p-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Appointment Comments</h2>

                    {/* Doctor's comment */}
                    {appointment.doctorComment ? (
                        <div className="mb-6">
                            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-4">
                                <h3 className="font-medium text-blue-800 mb-1">Doctor's Comment</h3>
                                <p className="text-gray-800 whitespace-pre-line">{appointment.doctorComment}</p>
                                <p className="text-xs text-gray-500 mt-2">
                                    Posted on: {new Date(appointment.doctorCommentAt).toLocaleString()}
                                </p>
                            </div>

                            {/* Patient's reply form or existing reply */}
                            {appointment.patientComment ? (
                                <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                                    <h3 className="font-medium text-green-800 mb-1">Your Reply</h3>
                                    <p className="text-gray-800 whitespace-pre-line">{appointment.patientComment}</p>
                                    <p className="text-xs text-gray-500 mt-2">
                                        Replied on: {new Date(appointment.patientCommentAt).toLocaleString()}
                                    </p>
                                </div>
                            ) : (
                                <>
                                    <h3 className="font-medium text-gray-800 mb-2">Your Reply</h3>
                                    <textarea
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        value={patientReply}
                                        onChange={(e) => setPatientReply(e.target.value)}
                                        placeholder="Type your reply to the doctor's comment..."
                                        rows={3}
                                    />
                                    <div className="mt-2 flex justify-end">
                                        <button
                                            onClick={handleSubmitPatientReply}
                                            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                                            disabled={!patientReply.trim()}
                                        >
                                            Send Reply
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    ) : (
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                            <p className="text-gray-500 italic">
                                The doctor has not added any comments yet for this appointment.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PatientAppointmentDetail;