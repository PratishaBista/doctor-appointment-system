import { AlertCircle, CheckCircle, Home } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const [status, setStatus] = useState("COMPLETED"); // or "ERROR"
  const [animate, setAnimate] = useState(false);
  const navigate = useNavigate();

  

  const mockProductId = "txn_123456789";
  const mockAmount = 1000;

  // Animation and sound effect on component mount
  useEffect(() => {
    if (status === "COMPLETED") {
      // Play success sound
      const audio = new Audio("https://cdnjs.cloudflare.com/ajax/libs/soundjs/1.0.1/soundjs.min.js");
      
      // Create and play a simple success sound
      const successSound = () => {
        try {
          const context = new (window.AudioContext || window.webkitAudioContext)();
          const oscillator = context.createOscillator();
          const gainNode = context.createGain();
          
          oscillator.connect(gainNode);
          gainNode.connect(context.destination);
          
          oscillator.type = "sine";
          oscillator.frequency.value = 800;
          gainNode.gain.value = 0.1;
          
          oscillator.start();
          
          // First note
          setTimeout(() => {
            oscillator.frequency.value = 1000;
          }, 100);
          
          // Second note
          setTimeout(() => {
            oscillator.frequency.value = 1200;
          }, 200);
          
          // Stop after sound completes
          setTimeout(() => {
            oscillator.stop();
          }, 300);
        } catch (e) {
          console.log("Audio playback failed:", e);
        }
      };
      
      // Trigger animation
      setTimeout(() => {
        setAnimate(true);
        successSound();
      }, 300);
    }
  }, [status]);

  if (status === "ERROR") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 sm:p-8">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center">
                <AlertCircle className="w-8 h-8 text-amber-500" />
              </div>
            </div>

            <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">
              Oops! Error occurred on confirming payment
            </h1>
            <h2 className="text-lg font-medium text-center text-gray-700 mb-4">
              We will resolve it soon.
            </h2>

            <div className="space-y-3 text-gray-600 mb-8">
              <p>Your transaction is being processed, but we couldn't verify its status.</p>
              <p>If the amount was deducted from your account, please contact our support team.</p>
              <p className="bg-gray-50 p-3 rounded-lg text-sm font-mono">
                Reference ID: {mockProductId}
              </p>
            </div>

            <button
              onClick={() => navigate("/")}
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 flex items-center justify-center"
            >
              <Home className="w-4 h-4 mr-2" />
              Go to Homepage
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-green-400 to-green-500 h-2"></div>
        <div className="p-6 sm:p-8">
          <div className="flex justify-center mb-6">
            <div className={`w-20 h-20 bg-green-100 rounded-full flex items-center justify-center ${animate ? 'scale-110' : 'scale-100'} transition-all duration-500`}>
              <div className={`${animate ? 'animate-bounce' : ''}`}>
                <CheckCircle className={`w-10 h-10 text-green-500 ${animate ? 'animate-pulse' : ''}`} />
              </div>
            </div>
          </div>

          <h1 className={`text-2xl font-bold text-center text-gray-800 mb-2 ${animate ? 'animate-pulse' : ''}`}>
            Payment Successful!
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Thank you for your payment. Your transaction was successful.
          </p>

          <div className={`bg-gray-50 rounded-lg p-5 mb-8 ${animate ? 'opacity-100' : 'opacity-0'} transition-opacity duration-700`}>
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Transaction Details</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Amount Paid:</span>
                <span className="font-medium text-gray-800">NPR {mockAmount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Transaction ID:</span>
                <span className="font-medium text-gray-800 text-sm font-mono">
                  {mockProductId}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Payment Method:</span>
                <span className="font-medium text-gray-800">
                  {"eSewa"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Completed
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => navigate("/")}
              className={`flex-1 py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-all duration-500 flex items-center justify-center ${animate ? 'opacity-100 transform-none' : 'opacity-0 translate-y-4'}`}
            >
              <Home className="w-4 h-4 mr-2" />
              Go to Homepage
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;