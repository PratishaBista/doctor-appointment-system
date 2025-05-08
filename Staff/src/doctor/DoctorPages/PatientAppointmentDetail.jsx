import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { FiArrowLeft, FiCheck, FiFileText, FiPlus } from "react-icons/fi";

const PatientAppointmentDetail = () => {
    const { appointmentId } = useParams();
    const navigate = useNavigate();
    const {
        getPatientDetails,
        requestLabTest,
        addDoctorNotes,
        markFollowUp,
        completeAppointment
    } = useContext(DoctorContext);
    const { formatDate, calculateAge } = useContext(AppContext);

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
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [appointmentId]);

    const handleAddTest = () => {
        if (!newTest.testType) return;

        setLabTests([...labTests, {
            ...newTest,
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
            await requestLabTest(appointmentId, labTests);
            toast.success("Tests saved successfully");
        } catch (error) {
            toast.error("Failed to save tests");
            console.error("Error saving tests:", error);
        }
    };

    const handleSaveNotes = async () => {
        try {
            await addDoctorNotes(appointmentId, notes);
            toast.success("Notes saved successfully");
        } catch (error) {
            toast.error("Failed to save notes");
            console.error("Error saving notes:", error);
        }
    };

    const handleMarkFollowUp = async () => {
        try {
            await markFollowUp(appointmentId);
            toast.success("Follow-up marked successfully");
        } catch (error) {
            toast.error("Failed to mark follow-up");
            console.error("Error marking follow-up:", error);
        }
    };

    const handleCompleteAppointment = async () => {
        try {
            await completeAppointment(appointmentId);
            toast.success("Appointment completed");
            navigate("/doctor/appointments");
        } catch (error) {
            toast.error("Failed to complete appointment");
            console.error("Error completing appointment:", error);
        }
    };

    if (loading) {
        return (
            <div className="p-6 flex justify-center items-center h-64">
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
        <div className="p-6">
            <button
                onClick={() => navigate("/doctor/appointments")}
                className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
            >
                <FiArrowLeft className="mr-2" /> Back to Appointments
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Patient Info Card */}
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center space-x-4 mb-4">
                        <img
                            src={patient.image || "https://via.placeholder.com/80"}
                            alt="Patient"
                            className="w-16 h-16 rounded-full object-cover"
                        />
                        <div>
                            <h2 className="text-xl font-semibold">{patient.name}</h2>
                            <p className="text-gray-600">{calculateAge(patient.dob)} years • {patient.gender}</p>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <div>
                            <h3 className="text-sm font-medium text-gray-500">Contact</h3>
                            <p className="text-gray-800">{patient.email}</p>
                            <p className="text-gray-800">{patient.phone || "Not provided"}</p>
                        </div>

                        <div>
                            <h3 className="text-sm font-medium text-gray-500">Appointment</h3>
                            <p className="text-gray-800">
                                {formatDate(appointment.slotDate)} at {appointment.slotTime}
                            </p>
                            <p className="text-gray-800">
                                Rs. {appointment.doctorData?.fees || 0} • {appointment.payment ? "Online" : "Cash"}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Lab Tests Section */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-xl font-semibold mb-4">Lab Tests</h2>

                        {labTests.length > 0 ? (
                            <div className="mb-6 overflow-x-auto">
                                <table className="min-w-full">
                                    <thead>
                                        <tr className="text-left text-sm text-gray-500">
                                            <th className="pb-2">Test Type</th>
                                            <th className="pb-2">Code</th>
                                            <th className="pb-2">Notes</th>
                                            <th className="pb-2">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {labTests.map((test, index) => (
                                            <tr key={index} className="border-t">
                                                <td className="py-2">{test.testType}</td>
                                                <td className="py-2">{test.testCode || "-"}</td>
                                                <td className="py-2">{test.notes || "-"}</td>
                                                <td className="py-2 capitalize">
                                                    <span className={`px-2 py-1 rounded-full text-xs ${test.status === 'completed' ? 'bg-green-100 text-green-800' :
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
                            <p className="text-gray-500 mb-6">No lab tests requested</p>
                        )}

                        <div className="space-y-4">
                            <h3 className="font-medium">Request New Test</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Test Type*
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                                        className="w-full p-2 border rounded"
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
                                        className="w-full p-2 border rounded"
                                        value={newTest.notes}
                                        onChange={(e) => setNewTest({ ...newTest, notes: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="flex space-x-3">
                                <button
                                    onClick={handleAddTest}
                                    className="flex items-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                                    disabled={!newTest.testType}
                                >
                                    <FiPlus className="mr-2" /> Add Test
                                </button>

                                {labTests.length > 0 && (
                                    <button
                                        onClick={handleSaveTests}
                                        className="flex items-center bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                                    >
                                        <FiCheck className="mr-2" /> Save Tests
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Doctor Notes Section */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-xl font-semibold mb-4">Doctor Notes</h2>
                        <textarea
                            className="w-full p-3 border rounded mb-4 min-h-[150px] focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="Enter your clinical notes here..."
                        />
                        <button
                            onClick={handleSaveNotes}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                        >
                            Save Notes
                        </button>
                    </div>

                    {/* Actions Section */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-xl font-semibold mb-4">Actions</h2>
                        <div className="flex flex-wrap gap-3">
                            <button
                                onClick={handleCompleteAppointment}
                                className="flex items-center bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                            >
                                <FiCheck className="mr-2" /> Complete Appointment
                            </button>

                            <button
                                onClick={handleMarkFollowUp}
                                className="flex items-center bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
                            >
                                <FiFileText className="mr-2" /> Mark Follow-up
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PatientAppointmentDetail;