import axios from "axios";
import { useContext, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { AppContext } from "../../context/AppContext";

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const appointmentId = searchParams.get("appointmentId");
    const data = searchParams.get("data");
    const { backendUrl, token } = useContext(AppContext);
    const navigate = useNavigate();

    useEffect(() => {
        const verify = async () => {
            if (data && appointmentId) {
                try {
                    await axios.post(`${backendUrl}/api/user/verify-payment`, 
                        { data }, 
                        { headers: { token } }
                    );
                    toast.success("Payment verified successfully");
                } catch (error) {
                    toast.error("Payment verification failed");
                }
            }
        };

        verify();
    }, [data, appointmentId, backendUrl, token, navigate]);

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                <svg
                    className="w-16 h-16 text-green-500 mx-auto mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                    />
                </svg>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    eSewa Payment Successful!
                </h2>
                <p className="text-gray-600 mb-6">
                    Your appointment has been confirmed. You can view the details in your
                    appointments section.
                </p>
                <button
                    onClick={() => navigate("/dashboard/appointments")}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                    View Appointments
                </button>
            </div>
        </div>
    );
};

export default PaymentSuccess;