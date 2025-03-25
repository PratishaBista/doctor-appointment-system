import { motion } from "framer-motion";
import React from "react";

// Achievements Array
const hospitalAchievements = [
  "🏆 Top-Rated Patient Care – Recognized for excellence in patient satisfaction and medical services.",
  "✅ Accreditations & Certifications – Accredited by leading healthcare organizations for high-quality standards.",
  "⚕️ Advanced Medical Technology – Equipped with state-of-the-art diagnostic and treatment facilities.",
  "🩺 Successful Surgeries & Treatments – Thousands of successful surgeries and life-saving procedures performed.",
  "🏥 Specialized Departments – Leading experts in cardiology, neurology, orthopedics, and more.",
  "❤️ Community Service & Free Health Camps – Regular health checkups, blood donation camps, and awareness programs.",
  "🔬 Medical Research & Innovation – Contributions to medical research, innovative treatments, and clinical trials.",
  "🥇 Awards & Recognition – Honored with prestigious awards for excellence in healthcare and patient safety.",
  "🚑 Emergency & Critical Care Excellence – 24/7 emergency services with high survival rates.",
];

const Achievements = () => {
  return (
    <div className="p-6 mt-12 underline">
      {/* Title Animation */}
      <motion.h1
        className="text-3xl font-bold text-center mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        Our Achievements
      </motion.h1>

      {/* Achievements Grid */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 m-8">
        {hospitalAchievements.map((achievement, index) => (
          <motion.div
            key={index}
            className="p-4 bg-white shadow-md rounded-lg border-l-4 border-green-500 transition-all cursor-pointer m-4"
            initial={{ opacity: 1, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.0001 }}
            whileHover={{
              scale: 1.03, // Slightly increases size
              borderColor: "#1D4ED8", // Changes border to blue
            }}
          >
            <p className="text-lg font-semibold text-gray-800">{achievement}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Achievements;
