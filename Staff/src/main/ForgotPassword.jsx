import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import HealthSolutionLogo from "../assets/HealthSolutionLogo.svg";
import { useContext } from 'react';
import { DoctorContext } from '../context/DoctorContext';

const ForgotPassword = () => {
    const { backendUrl } = useContext(DoctorContext);
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { data } = await axios.post(backendUrl + '/api/doctor/forgot-password', { email });
            if (data.success) {
                toast.success(data.message);
                setEmail('');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#F5F6FA]">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
                {/* Logo */}
                <div className="flex justify-center mb-6">
                    <img
                        onClick={() => window.location.href = '/'}
                        src={HealthSolutionLogo}
                        alt="Health Solution Logo"
                        className="h-20 w-25 hover:cursor-pointer"
                    />
                </div>

                <h2 className="text-2xl font-semibold mb-2 text-[#0288D1]">Forgot Password</h2>
                <p className="text-gray-600 mb-6 text-sm">Enter your email to receive a reset link.</p>

                <form onSubmit={handleSubmit} className="space-y-4 text-left">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0288D1]"
                            placeholder="Enter your email"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-2 px-4 text-white rounded-lg transition 
                            ${loading
                                ? 'bg-[#0288d1]/50 cursor-not-allowed'
                                : 'bg-[#0288D1] hover:bg-[#0277bd]'
                            }`}
                    >
                        {loading ? 'Sending...' : 'Send Reset Link'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
