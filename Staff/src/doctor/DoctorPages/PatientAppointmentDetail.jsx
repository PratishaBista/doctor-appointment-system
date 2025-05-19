import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { FiArrowLeft, FiCheck, FiFileText, FiPlus, FiEdit2, FiTrash2, FiInfo } from "react-icons/fi";
import { toast } from "react-toastify";
import PatientLabReports from "./PatientLabReports";
import Prescription from "./Prescription";
import axios from "axios";
// import { FiFileMedical } from "react-icons/fi";

const PatientAppointmentDetail = () => {
    const { appointmentId } = useParams();
    const navigate = useNavigate();
    const {
        getPatientDetails,
        requestLabTest,
        addDoctorNotes,
        markFollowUp,
        completeAppointment,
        getPatientLabReports,
        updatePrescription,

    } = useContext(DoctorContext);
    const { formatDate, calculateAge } = useContext(AppContext);
    const { backendUrl, doctor_token } = useContext(DoctorContext);

    const [loading, setLoading] = useState(true);
    const [appointment, setAppointment] = useState(null);
    const [patient, setPatient] = useState(null);
    const [notes, setNotes] = useState("");
    const [labTests, setLabTests] = useState([]);
    const [newTest, setNewTest] = useState({
        testType: "",
        testCode: "",
        notes: ""
    });
    const [activeTab, setActiveTab] = useState("consultation");

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const data = await getPatientDetails(appointmentId);
                if (data) {
                    setAppointment(data.appointment);
                    setPatient(data.patient);
                    setNotes(data.appointment.doctorNotes || "");
                    setLabTests(data.appointment.labTests || []);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                toast.error("Failed to load appointment details");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [appointmentId, getPatientDetails]);

    const [doctorComment, setDoctorComment] = useState("");

    const handleSubmitDoctorComment = async () => {
        try {
            const { data } = await axios.post(
                `${backendUrl}/api/doctor/add-comment`,
                {
                    appointmentId,
                    comment: doctorComment
                },
                { headers: { doctor_token } }
            );

            if (data.success) {
                toast.success("Comment posted successfully");
                setAppointment(data.appointment);
                setDoctorComment("");
            }
        } catch (error) {
            console.error("Error posting comment:", error);
            toast.error(error.response?.data?.message || "Failed to post comment");
        }
    };

    const handleAddTest = () => {
        if (!newTest.testType.trim()) {
            toast.error("Test type is required");
            return;
        }

        setLabTests([...labTests, {
            testType: newTest.testType,
            testCode: newTest.testCode,
            doctorNotes: newTest.notes,
            status: "requested"
        }]);

        setNewTest({
            testType: "",
            testCode: "",
            notes: ""
        });
    };

    const handleSaveTests = async () => {
        try {

            const newTests = labTests.filter(test => test.status === "requested");
            if (newTests.length === 0) {
                toast.error("Please add at least one test");
                return;
            }

            const updatedAppointment = await requestLabTest(appointmentId, newTests);
            if (updatedAppointment) {
                setAppointment(updatedAppointment);
                setLabTests(updatedAppointment.labTests || []);
            }
        } catch (error) {
            console.error("Error saving tests:", error);
            toast.error(error.response?.data?.message || "Failed to save tests");
        }
    };

    const handleDeleteTest = async (testId) => {
        try {
            if (!appointmentId || !testId) {
                toast.error("Both appointment ID and test ID are required");
                return;
            }

            const updatedAppointment = await deleteRequestedLabTest(appointmentId, testId);

            if (updatedAppointment) {
                setLabTests(updatedAppointment.labTests || []);
                toast.success("Test request deleted successfully");
            }
        } catch (error) {
            console.error("Error deleting test:", error);
            toast.error(error.response?.data?.message || "Failed to delete test");
        }
    };
    const deleteRequestedLabTest = async (appointmentId, testId) => {
        try {
            const { data } = await axios.post(
                `${backendUrl}/api/doctor/delete-lab-test`,
                {
                    appointmentId,  
                    testId         
                },
                {
                    headers: {
                        doctor_token: doctor_token // Ensure this is properly set
                    }
                }
            );

            return data;
        } catch (error) {
            console.error("API Error:", error);
            throw error;
        }
    };


    const handleSaveNotes = async () => {
        try {
            await addDoctorNotes(appointmentId, notes);
        } catch (error) {
            console.error("Error saving notes:", error);
        }
    };

    const handleMarkFollowUp = async () => {
        try {
            setLoading(true);

            const updatedAppointment = await markFollowUp(appointmentId);

            if (updatedAppointment) {
                setAppointment(prev => ({
                    ...prev,
                    followUpRequired: updatedAppointment.followUpRequired
                }));
                // toast.success("Follow-up marked successfully");

            }
        } catch (error) {
            console.error("Error marking follow-up:", error);
            toast.error(error.message || "Failed to mark follow-up");
        } finally {
            setLoading(false);
        }
    };

    const handleCompleteAppointment = async () => {
        try {
            await completeAppointment(appointmentId);
            navigate("/doctor/appointments");
        } catch (error) {
            toast.error("Failed to complete appointment");
            console.error("Error completing appointment:", error);
        }
    };

    if (loading) {
        return (
            <div className="p-6 flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (!appointment || !patient) {
        return (
            <div className="p-6 text-center text-red-500">
                Failed to load appointment details
            </div>
        );
    }



    return (
        <div className="p-6 max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <button
                    onClick={() => navigate("/doctor/appointments")}
                    className="flex items-center text-blue-600 hover:text-blue-800"
                >
                    <FiArrowLeft className="mr-2" /> Back to Appointments
                </button>
                <div className="text-sm text-gray-500">
                    Appointment ID: {appointmentId}
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
                <div className="p-6 flex items-start space-x-6">
                    <div className="flex-shrink-0">
                        <img
                            src={patient.image || "/default-avatar.png"}
                            alt="Patient"
                            className="w-20 h-20 rounded-full object-cover border-2 border-white shadow"
                        />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800">{patient.name}</h2>
                                <p className="text-gray-600">
                                    {calculateAge(patient.dob)} years • {patient.gender}
                                </p>
                            </div>
                            <div className="bg-blue-50 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                                {appointment.isCompleted ? "Completed" : "In Progress"}
                            </div>
                        </div>
                        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Contact</h3>
                                <p className="text-gray-800">{patient.email}</p>
                                <p className="text-gray-800">{patient.phone || "Not provided"}</p>
                            </div>
                            <div>
                                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Appointment</h3>
                                <p className="text-gray-800">
                                    {formatDate(appointment.slotDate)} at {appointment.slotTime}
                                </p>
                                <p className="text-gray-800">
                                    Rs. {appointment.doctorData?.fees || 0} • {appointment.payment ? "Online" : "Cash"}
                                </p>
                            </div>
                            <div>
                                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</h3>
                                <p className="text-gray-800">
                                    {appointment.cancelled ? "Cancelled" : appointment.isCompleted ? "Completed" : "Ongoing"}
                                </p>
                                {appointment.followUpRequired && (
                                    <p className="text-yellow-600">Follow-up required</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Left Sidebar */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-xl shadow-md overflow-hidden">
                        <div className="p-4 border-b border-gray-200">
                            <h3 className="text-lg font-medium text-gray-900">Consultation Tools</h3>
                        </div>
                        <nav className="p-2">
                            <button
                                onClick={() => setActiveTab("consultation")}
                                className={`w-full text-left px-4 py-3 rounded-lg mb-1 ${activeTab === "consultation" ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-50"}`}
                            >
                                Consultation Notes
                            </button>
                            <button
                                onClick={() => setActiveTab("labTests")}
                                className={`w-full text-left px-4 py-3 rounded-lg mb-1 ${activeTab === "labTests" ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-50"}`}
                            >
                                Lab Tests
                            </button>
                            <button
                                onClick={() => setActiveTab("actions")}
                                className={`w-full text-left px-4 py-3 rounded-lg ${activeTab === "actions" ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-50"}`}
                            >
                                Appointment Actions
                            </button>
                            <button
                                onClick={() => setActiveTab("labReportsView")}
                                className={`w-full text-left px-4 py-3 rounded-lg mb-1 ${activeTab === "labReportsView" ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-50"}`}
                            >
                                {/* <FiFileText className="inline mr-2" /> */}
                                Lab Reports
                            </button>
                            <button
                                onClick={() => setActiveTab("prescription")}
                                className={`w-full text-left px-4 py-3 rounded-lg mb-1 ${activeTab === "prescription" ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-50"}`}
                            >
                                {/* <FiFileMedical className="inline mr-2" /> */}
                                Prescription
                            </button>
                            <button
                                onClick={() => setActiveTab("comments")}
                                className={`w-full text-left px-4 py-3 rounded-lg mb-1 ${activeTab === "comments" ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-50"}`}
                            >
                                Comments
                            </button>
                        </nav>
                    </div>
                </div>

                {/* Main Content */}
                <div className="lg:col-span-3 space-y-6">
                    {activeTab === "consultation" && (
                        <div className="bg-white rounded-xl shadow-md overflow-hidden">
                            <div className="p-6">
                                <h2 className="text-xl font-semibold mb-4">Consultation Notes</h2>
                                <textarea
                                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    placeholder="Document your clinical findings, diagnosis, and treatment plan..."
                                    rows={8}
                                />
                                <div className="mt-4 flex justify-end">
                                    <button
                                        onClick={handleSaveNotes}
                                        className="bg-[#0288d1ff] rounded-lg hover:bg-[#0289d1df] transition text-white px-6 py-2 flex items-center"
                                    >
                                        <FiEdit2 className="mr-2" /> Save Notes
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "labTests" && (
                        <div className="bg-white rounded-xl shadow-md overflow-hidden">
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-xl font-semibold">Lab Tests</h2>
                                    {labTests.some(test => test.status === "requested") && (
                                        <button
                                            onClick={handleSaveTests}
                                            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition flex items-center"
                                        >
                                            <FiCheck className="mr-2" /> Save All Tests
                                        </button>
                                    )}
                                </div>

                                {labTests.length > 0 ? (
                                    <div className="mb-8">
                                        <div className="overflow-x-auto">
                                            <table className="min-w-full divide-y divide-gray-200">
                                                <thead className="bg-gray-50">
                                                    <tr>
                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Test Type</th>
                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
                                                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200">
                                                    {labTests.map((test, index) => (
                                                        <tr key={index}>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{test.testType}</td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{test.testCode || "-"}</td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${test.status === 'completed' ? 'bg-green-100 text-green-800' : test.status === 'requested' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                                    {test.status.replace('_', ' ')}
                                                                </span>
                                                            </td>
                                                            <td className="px-6 py-4 text-sm text-gray-500">
                                                                {test.doctorNotes ? (
                                                                    <button
                                                                        onClick={() => toast.info(test.doctorNotes, { autoClose: false })}
                                                                        className="text-blue-600 hover:text-blue-800 flex items-center"
                                                                    >
                                                                        <FiInfo className="mr-1" /> View
                                                                    </button>
                                                                ) : "-"}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                                {test.status === 'requested' && (
                                                                    <button
                                                                        onClick={() => {
                                                                            if (window.confirm('Are you sure you want to delete this test request?')) {
                                                                                handleDeleteTest(test._id);
                                                                            }
                                                                        }}
                                                                        className="text-red-600 hover:text-red-900 mr-4"
                                                                        title="Delete test request"
                                                                    >
                                                                        <FiTrash2 />
                                                                    </button>
                                                                )}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center py-8">
                                        <p className="text-gray-500">No lab tests requested yet</p>
                                    </div>
                                )}

                                <div className="bg-gray-50 p-6 rounded-lg">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Request New Test</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Test Type*
                                            </label>
                                            <input
                                                type="text"
                                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                                value={newTest.testType}
                                                onChange={(e) => setNewTest({ ...newTest, testType: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Test Code
                                            </label>
                                            <input
                                                type="text"
                                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                                value={newTest.testCode}
                                                onChange={(e) => setNewTest({ ...newTest, testCode: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Notes
                                            </label>
                                            <input
                                                type="text"
                                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                                value={newTest.notes}
                                                onChange={(e) => setNewTest({ ...newTest, notes: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <button
                                            onClick={handleAddTest}
                                            className="flex items-center bg-[#0288d1ff] rounded-md hover:bg-[#0289d1df] transition text-white px-4 py-2"
                                            disabled={!newTest.testType.trim()}
                                        >
                                            <FiPlus className="mr-2" /> Add Test
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "actions" && (
                        <div className="bg-white rounded-xl shadow-md overflow-hidden">
                            <div className="p-6">
                                <h2 className="text-xl font-semibold mb-6">Appointment Actions</h2>
                                <div className="space-y-4">
                                    <div className="flex items-start p-4 border border-gray-200 rounded-lg">
                                        <div className="flex-1">
                                            <h3 className="font-medium text-gray-900">Complete Appointment</h3>
                                            <p className="text-sm text-gray-500">Mark this consultation as completed</p>
                                        </div>
                                        <button
                                            onClick={handleCompleteAppointment}
                                            className="flex items-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                                        >
                                            <FiCheck className="mr-2" /> Complete
                                        </button>
                                    </div>

                                    <div className="flex items-start p-4 border border-gray-200 rounded-lg">
                                        <div className="flex-1">
                                            <h3 className="font-medium text-gray-900">Request Follow-up</h3>
                                            <p className="text-sm text-gray-500">Schedule a follow-up appointment</p>
                                        </div>
                                        <button
                                            onClick={handleMarkFollowUp}
                                            className="flex items-center bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
                                        >
                                            <FiFileText className="mr-2" /> Mark Follow-up
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "labReportsView" && (
                        <PatientLabReports
                            patientId={patient._id}
                            getPatientLabReports={getPatientLabReports}
                        />
                    )}

                    {activeTab === "prescription" && (
                        <Prescription
                            appointment={appointment}
                            updatePrescription={updatePrescription}
                        />
                    )}

                    {activeTab === "comments" && (
                        <div className="bg-white rounded-xl shadow-md overflow-hidden">
                            <div className="p-6">
                                <h2 className="text-xl font-semibold mb-4">Appointment Comments</h2>

                                {/* Doctor's comment section */}
                                <div className="mb-6">
                                    <h3 className="text-lg font-medium text-gray-800 mb-2">Your Comment</h3>
                                    {appointment.doctorComment ? (
                                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                                            <p className="text-gray-800 whitespace-pre-line">{appointment.doctorComment}</p>
                                            <p className="text-xs text-gray-500 mt-2">
                                                Posted on: {new Date(appointment.doctorCommentAt).toLocaleString()}
                                            </p>
                                        </div>
                                    ) : (
                                        <>
                                            <textarea
                                                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                value={doctorComment}
                                                onChange={(e) => setDoctorComment(e.target.value)}
                                                placeholder="Add your comment about this appointment..."
                                                rows={4}
                                            />
                                            <div className="mt-2 flex justify-end">
                                                <button
                                                    onClick={handleSubmitDoctorComment}
                                                    className="bg-[#0288D1] text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                                                    disabled={!doctorComment.trim()}
                                                >
                                                    Post Comment
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </div>

                                {/* Patient's reply section */}
                                {appointment.doctorComment && (
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-800 mb-2">Patient's Reply</h3>
                                        {appointment.patientComment ? (
                                            <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                                                <p className="text-gray-800 whitespace-pre-line">{appointment.patientComment}</p>
                                                <p className="text-xs text-gray-500 mt-2">
                                                    Replied on: {new Date(appointment.patientCommentAt).toLocaleString()}
                                                </p>
                                            </div>
                                        ) : (
                                            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                                <p className="text-gray-500 italic">Patient has not replied yet</p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PatientAppointmentDetail;