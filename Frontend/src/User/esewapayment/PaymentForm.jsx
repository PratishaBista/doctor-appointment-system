import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import Captcha from './Captcha';

const PaymentForm = () => {
    const { esewaId, setEsewaId, esewaPassword, setEsewaPassword, verified } = useContext(AppContext);
    const [darkMode, setDarkMode] = useState(false);
    const [idError, setIdError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [formValid, setFormValid] = useState(false);

    // Check system preference on initial load
    useEffect(() => {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setDarkMode(prefersDark);
    }, []);

    // Validate form whenever inputs change
    useEffect(() => {
        // Ensure esewaId and esewaPassword are defined
        const id = esewaId || '';
        const password = esewaPassword || '';
        
        // Validate eSewa ID (must be 10 digits)
        if (id.length > 0 && (!(/^\d+$/.test(id)) || id.length !== 10)) {
            setIdError('eSewa ID must be exactly 10 numbers');
        } else {
            setIdError('');
        }

        // Validate password (must be at least 4 characters)
        if (password.length > 0 && password.length < 4) {
            setPasswordError('Password/MPIN must be at least 4 characters');
        } else {
            setPasswordError('');
        }

        // Check if form is valid
        setFormValid(
            id.length === 10 && 
            /^\d+$/.test(id) && 
            password.length >= 4 && 
            verified
        );
    }, [esewaId, esewaPassword, verified]);

    const navigate = useNavigate();

    // Toggle theme
    const toggleTheme = () => {
        setDarkMode(!darkMode);
    };

    return (
        <div className={`transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
        {/* Theme Toggle Button */}
        <div className="absolute top-4 right-4">
            <button 
            onClick={toggleTheme} 
            className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-yellow-300' : 'bg-gray-200 text-gray-700'}`}
            >
            {darkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
            )}
            </button>
        </div>

        {/* Logo */}
        <div className="flex justify-center pt-8">
            <img
            className="h-16"
            src="https://www.cogenthealth.com.np/images/esewa.png"
            alt="eSewa Logo"
            />
        </div>

        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className={`flex flex-col md:flex-row justify-center gap-6 rounded-lg shadow-xl w-full max-w-6xl overflow-hidden ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}>
            {/* Left Section */}
            <div className={`flex flex-col gap-6 w-full md:w-1/2 p-8 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
                {/* Payment Summary */}
                <div className={`rounded-lg shadow-md ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} p-6`}>
                <div className="flex items-center gap-3 mb-4">
                    <img className="h-8" src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Esewa_logo.webp/1200px-Esewa_logo.webp.png" alt="icon" />
                    <p className="text-2xl font-semibold">Payment Summary</p>
                </div>

                <div className="mb-6">
                    <h2 className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Total amount to be paid</h2>
                    <h1 className="text-2xl font-bold text-green-500">NPR. 1,000</h1>
                </div>

                <div className={`${darkMode ? 'bg-gray-600' : 'bg-gray-200'} p-3 flex justify-between rounded-md mb-2`}>
                    <span className={`${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>Product Amount</span>
                    <span className="font-bold">1,000.00</span>
                </div>
                <div className={`${darkMode ? 'bg-gray-600' : 'bg-gray-200'} p-3 flex justify-between rounded-md mb-2`}>
                    <span className={`${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>Extra Charge</span>
                    <span className="font-bold">0.00</span>
                </div>
                <div className="bg-green-600 text-white p-3 flex justify-between rounded-md">
                    <span>Total Amount</span>
                    <span className="font-bold">1,000.00</span>
                </div>
                </div>

                {/* Banner */}
                <div className="w-full h-48 overflow-hidden rounded-lg shadow-md">
                <img
                    className="w-full h-full object-cover"
                    src="https://thumbs.dreamstime.com/b/advertising-word-cloud-business-concept-56936998.jpg"
                    alt="Ad"
                />
                </div>
            </div>

            {/* Right Section */}
            <div className={`w-full md:w-1/2 p-8 flex flex-col gap-6 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
                <h1 className="text-2xl font-semibold text-center">Sign in to your account</h1>

                <div className="w-full max-w-md mx-auto">
                {/* eSewa ID */}
                <div className="mb-4">
                    <div className={`flex items-center rounded-md px-4 py-3 gap-3 ${darkMode ? 'bg-gray-700 border border-gray-600' : 'bg-gray-50 border border-gray-200'} ${idError ? 'border-red-500' : ''}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${darkMode ? 'text-gray-300' : 'text-gray-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <input
                        type="text"
                        placeholder="eSewa ID"
                        className={`w-full outline-none ${darkMode ? 'bg-gray-700 text-white placeholder-gray-400' : 'bg-gray-50 text-gray-800 placeholder-gray-500'}`}
                        value={esewaId}
                        onChange={(e) => setEsewaId(e.target.value)}
                        />
                    </div>
                    {idError && <p className="text-red-500 text-xs mt-1">{idError}</p>}
                </div>

                {/* Password */}
                <div className="mb-6">
                    <div className={`flex items-center rounded-md px-4 py-3 gap-3 ${darkMode ? 'bg-gray-700 border border-gray-600' : 'bg-gray-50 border border-gray-200'} ${passwordError ? 'border-red-500' : ''}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${darkMode ? 'text-gray-300' : 'text-gray-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        <input
                        type="password"
                        placeholder="Password / MPIN"
                        className={`w-full outline-none ${darkMode ? 'bg-gray-700 text-white placeholder-gray-400' : 'bg-gray-50 text-gray-800 placeholder-gray-500'}`}
                        value={esewaPassword}
                        onChange={(e) => setEsewaPassword(e.target.value)}
                        />
                    </div>
                    {passwordError && <p className="text-red-500 text-xs mt-1">{passwordError}</p>}
                </div>
                <Captcha/>

                {/* Login Button */}
                <button
                    className={`mb-4 ${!formValid ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"} text-white py-3 rounded-md transition w-full font-medium shadow-md mt-4`}
                    disabled={!formValid}
                    onClick={()=>
                        navigate('/paymentSuccess')
                    }
                    >
                    Login
                </button>


                <p className="mb-4 text-sm text-right">
                    <a className="text-blue-500 hover:underline cursor-pointer">
                    Forgot password?
                    </a>
                </p>

        <p className="text-sm text-center mb-6">
            Don't have an account?{' '}
            <a
                href="https://esewa.com.np/#/home"
                className="text-green-500 font-semibold cursor-pointer hover:underline"
                target="_blank" 
                rel="noopener noreferrer"
            >
                Register
            </a>
        </p>


                <button onClick={()=>navigate('/dashboard')}
                className={`font-semibold py-2 hover:underline block mx-auto ${darkMode ? 'text-red-400' : 'text-red-600'}`}>
                    CANCEL PAYMENT
                </button>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
};

export default PaymentForm;