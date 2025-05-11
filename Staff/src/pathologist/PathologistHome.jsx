import React, { useContext, useEffect, useState } from 'react';
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import { PathologistContext } from '../context/PathologistContext';
import HealthSolutionLogo from '../assets/HealthSolutionLogo.svg';
import { Link } from 'react-router-dom';
import PendingLabRequests from './PendingLabRequests';
import UploadLabReport from './UploadLabReport';
import PathologistProfile from './PathologistProfile';

const PathologistHome = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { pathologist_token, setPathologistToken } = useContext(PathologistContext);
    const [notificationCount, setNotificationCount] = useState(0);

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('pathologist_token');
        setPathologistToken(null);
        navigate('/login');
    };

    useEffect(() => {
        const path = window.location.pathname;
        if (path.includes('pending-requests')) setActiveIndex(0);
        else if (path.includes('upload-report')) setActiveIndex(1);
        else if (path.includes('report-history')) setActiveIndex(2);
        else if (path.includes('profile')) setActiveIndex(3);
    }, []);

    const handleItemClick = (index) => {
        const routes = [
            "/pathologist/pending-requests",
            "/pathologist/upload-report",
            "/pathologist/profile",
        ];
        navigate(routes[index]);
        setActiveIndex(index);
        setIsSidebarOpen(false);
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#F5F6FA]">
            {/* Header */}
            <div className="flex h-16 items-center justify-between px-6 bg-white shadow-sm sticky top-0 z-50">
                <div className="flex items-center space-x-4">
                    {/* Mobile menu button */}
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="md:hidden text-gray-600"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>

                    {/* Logo */}
                    <div className="flex items-center justify-center h-20 px-4 border-b border-gray-200">
                        <img
                            src={HealthSolutionLogo}
                            alt="HealthSolution Logo"
                            className="h-12"
                            onClick={() => navigate("/")}
                        />
                    </div>
                    <span className="text-sm bg-[#0288D1]/10 text-[#0288D1] px-2.5 py-0.5 rounded-full">Pathologist</span>
                </div>

                <div className="flex items-center space-x-6">
                    {/* Notifications */}
                    <Link
                        to="/pathologist/notifications"
                        className="p-1 text-gray-400 hover:text-gray-500 relative"
                    >
                        <span className="sr-only">Notifications</span>
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                        {notificationCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                                {notificationCount}
                            </span>
                        )}
                    </Link>
                    <div className="hidden md:flex items-center space-x-2">
                        <div className="h-8 w-8 rounded-full bg-[#0288D1] flex items-center justify-center text-white font-medium">
                            {pathologist_token?.name?.charAt(0) || 'P'}
                        </div>
                        <span className="text-sm font-medium text-gray-700">{pathologist_token?.name || 'Pathologist'}</span>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="text-sm font-medium text-gray-600 hover:text-[#0288D1] transition flex items-center gap-1"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                        </svg>
                        Logout
                    </button>
                </div>
            </div>

            {/* Main container for sidebar and content */}
            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <div
                    className={`h-full w-64 bg-white p-4 flex flex-col shadow-sm transition-all duration-300 ${isSidebarOpen ? 'fixed inset-y-0 z-40 md:relative' : 'hidden md:block'
                        }`}
                >
                    {/* Sidebar menu items */}
                    <div className="space-y-1 mt-4">
                        {[
                            {
                                index: 0,
                                label: "Pending Requests",
                                icon: (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                    </svg>
                                )
                            },
                            {
                                index: 1,
                                label: "Upload Report",
                                icon: (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                )
                            },
                            {
                                index: 2,
                                label: "Profile",
                                icon: (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                    </svg>
                                )
                            }
                        ].map((item) => (
                            <button
                                key={item.index}
                                onClick={() => handleItemClick(item.index)}
                                className={`w-full flex items-center space-x-3 p-3 rounded-lg transition ${activeIndex === item.index
                                    ? 'bg-[#0288D1]/10 text-[#0288D1] font-medium'
                                    : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                            >
                                <span className={`${activeIndex === item.index ? 'text-[#0288D1]' : 'text-gray-500'}`}>
                                    {item.icon}
                                </span>
                                <span>{item.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Main Content Area */}
                <div className={`flex-1 overflow-y-auto p-6 transition-all duration-300 ${isSidebarOpen ? 'ml-64 md:ml-0' : 'ml-0'
                    }`}>
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <Routes>
                            <Route path="/pending-requests" element={<PendingLabRequests />} />
                            <Route path="/upload-report" element={<UploadLabReport />} />
                            <Route path="/profile" element={<PathologistProfile />} />
                            <Route path="*" element={<Navigate to="/pathologist/pending-requests" replace />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PathologistHome;