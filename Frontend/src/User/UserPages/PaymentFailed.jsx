import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { XCircle } from 'react-feather';

const PaymentFailed = () => {
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
          <div className="bg-red-100 p-4 rounded-full">
            <XCircle className="h-12 w-12 text-red-600" />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Payment Failed
        </h1>
        
        <p className="text-gray-600 mb-6">
          We couldn't process your payment.
        </p>
        
        <div className="mb-8">
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 text-left rounded">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  Please check your payment details and try again. Your appointment is still reserved.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => navigate(`/dashboard/appointments/${appointmentId}`)}
            className="w-full bg-[#2a4365] hover:bg-[#1e365d] text-white py-3 px-4 rounded-lg font-medium"
          >
            Try Payment Again
          </button>

          <button
            onClick={() => navigate('/dashboard/appointments')}
            className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium bg-white hover:bg-gray-100"
          >
            Back to Appointments
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentFailed;