import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';

const Captcha = ({ onVerify }) => {
    const {verified, setVerified ,loading, setLoading,checked, setChecked}=useContext(AppContext)

  const handleCheck = () => {
    if (!checked && !verified) {
      setChecked(true);
      setLoading(true);
      
      // Simulate verification process
      setTimeout(() => {
        setLoading(false);
        setVerified(true);
        if (onVerify) onVerify(true);
      }, 1500);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex flex-col">
        <div className="captcha-container border border-gray-300 rounded-md shadow-sm p-4 bg-white">
          <div className="flex items-center">
            <div 
              className={`captcha-checkbox relative flex items-center justify-center w-6 h-6 border-2 rounded cursor-pointer transition-all ${
                loading ? 'border-gray-400 bg-gray-100' : 
                verified ? 'border-green-500 bg-green-50' : 
                'border-gray-400 hover:border-gray-500'
              }`}
              onClick={handleCheck}
            >
              {loading && (
                <div className="loading-spinner absolute inset-0 flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
              )}
              
              {verified && (
                <svg className="h-4 w-4 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
            
            <span className="ml-3 text-lg font-semibold text-gray-700">I'm not a robot</span>
            
            <div className="ml-auto flex flex-col items-end">
              <img src="https://www.gstatic.com/recaptcha/api2/logo_48.png" alt="reCAPTCHA" className="w-6 h-6"/>
              <span className="text-xs text-gray-500 mt-1">reCAPTCHA</span>
              <span className="text-xs text-gray-400">Privacy - Terms</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Captcha;
