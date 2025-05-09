import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export const PathologistContext = createContext();

const PathologistContextProvider = ({ children }) => {
    const [pathologist_token, setPathologistToken] = useState(localStorage.getItem('pathologist_token') || '');
    const [pendingRequests, setPendingRequests] = useState([]);
    const [pathologistData, setPathologistData] = useState(null);
    const [reports, setReports] = useState([]);

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const getHeaders = () => ({
        headers: {
            'pathologist_token': pathologist_token,
            'Content-Type': 'application/json'
        }
    });

    const getPendingRequests = async () => {
        try {
            const { data } = await axios.get(
                `${backendUrl}/api/pathologist/pending-requests`,
                getHeaders()
            );

            if (data.success) {
                setPendingRequests(data.data);
            } else {
                toast.error(data.message);
            }
            return data;
        } catch (error) {
            console.error("Error fetching pending requests:", error);
            toast.error(error.response?.data?.message || "Failed to fetch pending requests");
            throw error;
        }
    };

    const uploadLabReport = async (formData) => {
        try {
            const { data } = await axios.post(
                `${backendUrl}/api/pathologist/upload-report`,
                formData,
                {
                    headers: {
                        'pathologist_token': pathologist_token,
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            if (data.success) {
                toast.success("Report uploaded successfully");
                return data;
            } else {
                toast.error(data.message);
                return null;
            }
        } catch (error) {
            console.error("Error uploading report:", error);
            toast.error(error.response?.data?.message || "Failed to upload report");
            throw error;
        }
    };

    const getPathologistProfile = async () => {
        try {
            const { data } = await axios.get(
                `${backendUrl}/api/pathologist/profile`,
                getHeaders()
            );

            if (data.success) {
                setPathologistData(data.data);
                return data;
            } else {
                toast.error(data.message);
                return null;
            }
        } catch (error) {
            console.error("Error fetching profile:", error);
            toast.error(error.response?.data?.message || "Failed to fetch profile");
            throw error;
        }
    };

    const updatePathologistProfile = async (profileData) => {
        try {
            const dataToSend = {
                ...profileData,
                address: JSON.stringify(profileData.address)
            };

            const { data } = await axios.post(
                `${backendUrl}/api/pathologist/update-profile`,
                dataToSend,
                getHeaders()
            );

            if (data.success) {
                toast.success("Profile updated successfully");
                await getPathologistProfile();
                return data;
            } else {
                toast.error(data.message);
                return null;
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            toast.error(error.response?.data?.message || "Failed to update profile");
            throw error;
        }
    };

    const value = {
        pathologist_token,
        setPathologistToken,
        backendUrl,
        pendingRequests,
        getPendingRequests,
        uploadLabReport,
        pathologistData,
        getPathologistProfile,
        updatePathologistProfile,
        reports,
    };

    return (
        <PathologistContext.Provider value={value}>
            {children}
        </PathologistContext.Provider>
    );
};

export default PathologistContextProvider;