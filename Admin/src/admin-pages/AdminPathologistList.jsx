import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { FiUser, FiHome, FiPhone, FiMail, FiCheckCircle, FiXCircle, FiEdit, FiTrash2 } from "react-icons/fi";
import { motion } from "framer-motion";

const AdminPathologistsList = () => {
    const { pathologists, admin_token, getAllPathologists, togglePathologistStatus, deletePathologist } = useContext(AdminContext);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        if (admin_token) {
            getAllPathologists().finally(() => setLoading(false));
        }
    }, [admin_token]);

    const filteredPathologists = (pathologists || []).filter(pathologist =>

        pathologist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pathologist.labName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleStatusChange = async (id, currentStatus) => {
        try {
            await togglePathologistStatus(id);
        } catch (error) {
            console.error("Failed to update pathologist status:", error);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0288D1]"></div>
            </div>
        );
    }

    return (
        <div className="p-6">
            {/* Header and Search Section */}
            <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-[#0288D1]">Pathologists</h1>
                    <p className="text-gray-500">Total {(pathologists || []).length} pathologists registered</p>

                </div>
                <div className="relative w-full md:w-64">
                    <input
                        type="text"
                        placeholder="Search pathologists..."
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0288D1]"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <FiUser className="absolute left-3 top-3 text-gray-400" />
                </div>
            </div>

            {/* Pathologists List */}
            {filteredPathologists.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPathologists.map((pathologist, index) => (
                        <motion.div
                            key={pathologist._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow"
                        >
                            {/* Pathologist Header */}
                            <div className="bg-[#0288D1] p-4 text-white">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-xl font-bold">{pathologist.name}</h2>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${pathologist.isActive
                                        ? "bg-green-100 text-green-800"
                                        : "bg-red-100 text-red-800"
                                        }`}>
                                        {pathologist.isActive ? "Active" : "Inactive"}
                                    </span>
                                </div>
                                <p className="text-[#e3f2fd]">{pathologist.labName}</p>
                            </div>

                            {/* Pathologist Info */}
                            <div className="p-4">
                                <div className="space-y-3 text-sm text-gray-600">
                                    <div className="flex items-start">
                                        <FiHome className="mt-1 mr-2 text-[#0288D1]" />
                                        <div>
                                            <p className="font-medium">Address</p>
                                            <p>{pathologist.address.line1}</p>
                                            {pathologist.address.line2 && <p>{pathologist.address.line2}</p>}
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <FiPhone className="mr-2 text-[#0288D1]" />
                                        <span>{pathologist.phone}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <FiMail className="mr-2 text-[#0288D1]" />
                                        <span>{pathologist.email}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="mr-2 text-[#0288D1]">Joined:</span>
                                        <span>{new Date(pathologist.createdAt).toLocaleDateString()}</span>
                                    </div>
                                </div>


                            </div>
                        </motion.div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-10">
                    <p className="text-gray-500 text-lg">
                        {searchTerm ? "No pathologists match your search." : "No pathologists found."}
                    </p>
                </div>
            )}
        </div>
    );
};

export default AdminPathologistsList;