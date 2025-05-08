import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import HealthSolutionLogo from "../../assets/HealthSolutionLogo.svg";

const ResetPassword = () => {
    const { backendUrl } = useContext(AppContext);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [token, setToken] = useState('');
    const [loading, setLoading] = useState(false);

    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        setToken(params.get('token'));
    }, [location]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        setLoading(true);
        try {
            const { data } = await axios.post(`${backendUrl}/api/user/reset-password`, { token, newPassword });
            if (data.success) {
                toast.success(data.message);
                setNewPassword('');
                setConfirmPassword('');
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
                <div className="flex justify-center mb-6">
                    <img
                        onClick={() => window.location.href = '/'}
                        src={HealthSolutionLogo}
                        alt="Health Solution Logo"
                        className="h-20 w-25 hover:cursor-pointer"
                    />
                </div>

                <h2 className="text-2xl font-semibold mb-2 text-[#0288D1]">Reset Password</h2>
                <p className="text-gray-600 mb-6 text-sm">Enter your new password below.</p>

                <form onSubmit={handleSubmit} className="space-y-4 text-left">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0288D1]"
                            placeholder="Enter new password"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0288D1]"
                            placeholder="Confirm new password"
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
                        {loading ? 'Resetting...' : 'Reset Password'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
