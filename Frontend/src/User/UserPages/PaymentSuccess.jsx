import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle } from 'react-feather';

const PaymentSuccess = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const appointmentId = searchParams.get('appointmentId');

    useEffect(() => {
        if (!appointmentId) {
            navigate('/dashboard/appointments');
        }
    }, [appointmentId, navigate]);

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center"
            >
                <div className="flex justify-center mb-6">
                    <div className="bg-green-100 p-4 rounded-full">
                        <CheckCircle className="h-12 w-12 text-green-600" />
                    </div>
                </div>

                <h1 className="text-2xl font-bold text-gray-800 mb-2">
                    Payment Successful!
                </h1>

                <p className="text-gray-600 mb-6">
                    Your payment has been processed successfully.
                </p>

                <div className="mb-8">
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 text-left rounded">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                                </svg>
                            </div>
                            {/* <div className="ml-3">
                <p className="text-sm text-blue-700">
                  A receipt has been sent to your email. Please bring this ID to your appointment.
                </p>
              </div> */}
                        </div>
                    </div>
                </div>

                <button
                    onClick={() => navigate('/dashboard/appointments')}
                    className="w-full bg-[#2a4365] hover:bg-[#1e365d] text-white py-3 px-4 rounded-lg font-medium"
                >
                    Back to Appointments
                </button>

            </motion.div>
        </div>
    );
};

export default PaymentSuccess;