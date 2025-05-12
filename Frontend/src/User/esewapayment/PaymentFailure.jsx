import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PaymentFailure = () => {
  // Mock navigate function for demo
  const navigate=useNavigate()

  const [animate, setAnimate] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  // Trigger animations after component mount
  useEffect(() => {
    // Start main animation
    setTimeout(() => {
      setAnimate(true);
    }, 300);

    // Show details with delay for staggered animation
    setTimeout(() => {
      setShowDetails(true);
    }, 800);

    // Vibration effect for error
 
    
    // Create and play error sound
    const errorSound = () => {
      try {
        const context = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = context.createOscillator();
        const gainNode = context.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(context.destination);
        
        oscillator.type = "sine";
        oscillator.frequency.value = 400;
        gainNode.gain.value = 0.1;
        
        oscillator.start();
        
        // First note
        setTimeout(() => {
          oscillator.frequency.value = 350;
        }, 150);
        
        // Stop sound
        setTimeout(() => {
          oscillator.stop();
        }, 300);
      } catch (e) {
        console.log("Audio playback failed:", e);
      }
    };
    
    errorSound();
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-gray-100 to-gray-200 px-4">
      <div 
        className={`bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center transform transition-all duration-500 ${
          animate ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
        }`}
      >
        <div className="flex justify-center mb-6">
          <div className={`bg-red-100 p-5 rounded-full ${animate ? "animate-pulse" : ""}`}>
            <div className={`relative ${animate ? "animate-spin-once" : ""}`}>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-14 w-14 text-red-600" 
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
                <line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </div>

        <h2 className={`text-3xl font-bold text-red-600 mb-3 transition-all duration-700 ${
          animate ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}>
          Payment Failed
        </h2>
        
        <p className={`text-gray-600 mb-6 transition-all duration-700 delay-100 ${
          animate ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}>
          There was an issue processing your payment.
        </p>
        
        <div className={`text-sm text-gray-700 mb-6 bg-gray-50 p-4 rounded-lg transition-all duration-500 ${
          showDetails ? "opacity-100 max-h-48" : "opacity-0 max-h-0 overflow-hidden"
        }`}>
          <p className="flex justify-between items-center border-b border-gray-200 pb-2 mb-2">
            <span className="font-medium">Transaction ID:</span>
            <span className="font-mono bg-gray-100 py-1 px-2 rounded text-red-500">Not available</span>
          </p>
          <p className="mt-3 text-gray-600">
            If the amount was deducted, it will be refunded within <strong>3–5 business days</strong>.
          </p>
          <div className="mt-4 p-2 bg-red-50 border border-red-100 rounded">
            <p className="text-xs text-red-600">
              For immediate assistance, please contact our support team.
            </p>
          </div>
        </div>
        
        <div className="flex flex-col gap-3">
          <button
            onClick={() => navigate("/")}
            className={`bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 shadow-md ${
              showDetails ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            <span>Return to Home</span>
          </button>
          
          <button
            onClick={() => navigate("/PaymentForm")}
            className={`mt-2 border border-gray-300 hover:bg-gray-100 text-gray-700 px-6 py-2 rounded-lg transition-all duration-300 ${
              showDetails ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Try Again
          </button>
        </div>
      </div>
      


    </div>
  );
};

export default PaymentFailure;