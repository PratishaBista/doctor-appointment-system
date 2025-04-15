import { motion } from "framer-motion";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

const UserAllDoctors = () => {
    const { doctors, getDoctorsData } = useContext(AppContext);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                await getDoctorsData();
            } catch (error) {
                console.error("Failed to load doctors:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDoctors();
    }, [getDoctorsData]);

    if (loading) {
        return (
            <div className="container mx-auto px-4 text-center mt-20">
                <h1 className="text-5xl font-bold">Loading Doctors...</h1>
            </div>
        );
    }

    if (!doctors || doctors.length === 0) {
        return (
            <div className="container mx-auto px-4 text-center mt-20">
                <h1 className="text-5xl font-bold">No Doctors Available</h1>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4">
            <h1 className="text-5xl font-bold mt-20 text-center text-gray-800">
                All Doctors
            </h1>

            <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 mt-12">
                {doctors.map((doctors, index) => (
                    <motion.div
                        onClick={() => navigate(`/my-appointment/${doctors._id}`)}
                        key={index}
                        className="border border-gray-300 shadow-lg rounded-xl p-6 bg-white transition-all duration-300 hover:bg-slate-50 hover:text-black m-2"
                        whileHover={{ scale: 1.05 }}
                    >
                        <img
                            className="w-full h-48 object-cover rounded-lg mb-4"
                            src={doctors.image}
                            alt={doctors.name}
                        />

                        <h2 className="text-xl font-bold text-center">{doctors.name}</h2>
                        <p className="text-center text-gray-600 transition-all duration-300 hover:text-white">
                            {doctors.speciality}
                        </p>
                        <p className="text-sm mt-2">Degree: {doctors.degree}</p>
                        <p className="text-sm">Description: {doctors.about}</p>
                        <p className="text-sm font-semibold mt-2">Fees: Rs. {doctors.fees}</p>

                        <div className="flex items-center justify-center mt-4">
                            <div className="flex items-center gap-2">
                                <span
                                    className={`h-3 w-3 rounded-full ${doctors.available ? "bg-green-500" : "bg-red-400"
                                        }`}
                                ></span>
                                <span className="text-sm font-semibold">
                                    {doctors.available ? "Available" : "Unavailable"}
                                </span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default UserAllDoctors;