import { useContext, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { AppContext } from "../../context/AppContext";

const PaymentFailed = () => {
    const [searchParams] = useSearchParams();
    const appointmentId = searchParams.get("appointmentId");
    const { backendUrl, token } = useContext(AppContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (appointmentId) {
            toast.error("Payment failed. Please try again.");
        } else {
            navigate("/dashboard/appointments");
        }
    }, [appointmentId, navigate]);

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                <svg
                    className="w-16 h-16 text-red-500 mx-auto mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    Payment Failed
                </h2>
                <p className="text-gray-600 mb-6">
                    We couldn't process your payment. Please try again or contact support.
                </p>
                <div className="flex justify-center space-x-4">
                    {appointmentId && (
                        <button
                            onClick={() => navigate(`/dashboard/appointments/${appointmentId}`)}
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                        >
                            Try Again
                        </button>
                    )}
                    <button
                        onClick={() => navigate("/dashboard/appointments")}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition"
                    >
                        View Appointments
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentFailed;