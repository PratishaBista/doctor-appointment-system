import React, { useState, useEffect, useContext } from 'react';
import { PathologistContext } from '../context/PathologistContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PathologistProfile = () => {
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        labName: '',
        phone: '',
        address: {
            line1: '',
            line2: '',
        },
    });

    const { pathologistData, getPathologistProfile, updatePathologistProfile } = useContext(PathologistContext);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                await getPathologistProfile();
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [getPathologistProfile]);

    useEffect(() => {
        if (pathologistData) {
            setFormData({
                name: pathologistData.name || '',
                email: pathologistData.email || '',
                labName: pathologistData.labName || '',
                phone: pathologistData.phone || '',
                address: {
                    line1: pathologistData.address?.line1 || '',
                    line2: pathologistData.address?.line2 || '',
                },
            });
        }
    }, [pathologistData]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name.includes('address.')) {
            const addressField = name.split('.')[1];
            setFormData(prev => ({
                ...prev,
                address: {
                    ...prev.address,
                    [addressField]: value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await updatePathologistProfile(formData);
            setEditMode(false);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading && !editMode) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0288D1]"></div>
            </div>
        );
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Profile</h2>
                {!editMode && (
                    <button
                        onClick={() => setEditMode(true)}
                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-[#0288D1] hover:bg-[#0277BD] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0288D1]"
                    >
                        Edit Profile
                    </button>
                )}
            </div>

            <div className="bg-white rounded-lg shadow p-6">
                {editMode ? (
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#0288D1] focus:border-[#0288D1]"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#0288D1] focus:border-[#0288D1] bg-gray-100"
                                    disabled
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Lab Name</label>
                                <input
                                    type="text"
                                    name="labName"
                                    value={formData.labName}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#0288D1] focus:border-[#0288D1]"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#0288D1] focus:border-[#0288D1]"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 1</label>
                                <input
                                    type="text"
                                    name="address.line1"
                                    value={formData.address.line1}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#0288D1] focus:border-[#0288D1]"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 2</label>
                                <input
                                    type="text"
                                    name="address.line2"
                                    value={formData.address.line2}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#0288D1] focus:border-[#0288D1]"
                                />
                            </div>

                            <div className="md:col-span-2 flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={() => setEditMode(false)}
                                    className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0288D1]"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#0288D1] hover:bg-[#0277BD] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0288D1]"
                                >
                                    {loading ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Saving...
                                        </>
                                    ) : 'Save Changes'}
                                </button>
                            </div>
                        </div>
                    </form>
                ) : (
                    <div className="space-y-4">
                        <div className="flex items-center space-x-4">
                            <div className="h-16 w-16 rounded-full bg-[#0288D1]/10 flex items-center justify-center text-[#0288D1] text-2xl font-medium">
                                {pathologistData?.name?.charAt(0) || 'P'}
                            </div>
                            <div>
                                <h3 className="text-lg font-medium text-gray-900">{pathologistData?.name || 'Pathologist'}</h3>
                                <p className="text-sm text-gray-500">{pathologistData?.email || ''}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Lab Name</p>
                                <p className="text-sm text-gray-900 mt-1">{pathologistData?.labName || ''}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">Phone</p>
                                <p className="text-sm text-gray-900 mt-1">{pathologistData?.phone || ''}</p>
                            </div>
                            <div className="md:col-span-2">
                                <p className="text-sm font-medium text-gray-500">Address</p>
                                <p className="text-sm text-gray-900 mt-1">
                                    {pathologistData?.address?.line1 || ''}
                                    {pathologistData?.address?.line2 && <>, {pathologistData.address.line2}</>}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PathologistProfile;