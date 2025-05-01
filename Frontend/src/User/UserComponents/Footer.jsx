import React from 'react'
import HealthSolutionLogo from "../../assets/HealthSolutionLogo.png";

import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaShieldAlt, FaFileMedical } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#ffffff] text-black">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">

          <div className="space-y-4">
            <div className="flex items-center">
              <img
                src={HealthSolutionLogo}
                alt="HealthSolution Logo"
                className="h-20 w-25 mr-3"
              />
              
            </div>
            <p className="text-gray-800 text-sm">
              Your trusted healthcare partner for seamless doctor appointments and medical care.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/healthsolution" className="text-[#1877F2]" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>

              <a href="https://x.com/@healthsolution" className="text-black" aria-label="X (formerly Twitter)" target="_blank" rel="noopener noreferrer">
                <span className="sr-only">X (formerly Twitter)</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-[#4CAF50] pb-2">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/doctors" className="transition-colors flex items-center">
                <span className="mr-2">•</span> Find a Doctor
              </a></li>
              <li><a href="/specialties" className="transition-colors flex items-center">
                <span className="mr-2">•</span> Specialties
              </a></li>
              <li><a href="/appointments" className="transition-colors flex items-center">
                <span className="mr-2">•</span> My Appointments
              </a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-[#4CAF50] pb-2">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FaMapMarkerAlt className="text-[#4CAF50] mt-1 mr-3 flex-shrink-0" />
                <span>123 Medical Plaza, Kathmandu, Nepal</span>
              </li>
              <li className="flex items-center">
                <FaPhone className="text-[#4CAF50] mr-3" />
                <span>+977 9841234567</span>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="text-[#4CAF50] mr-3" />
                <span>info@healthsolution.com</span>
              </li>
              <li className="flex items-center">
                <FaClock className="text-[#4CAF50] mr-3" />
                <span>Sun-Fri: 7AM - 7PM</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-[#4CAF50] pb-2">Important</h3>
            <ul className="space-y-2">
              <li><a href="/privacy" className="transition-colors flex items-center">
                <FaShieldAlt className="text-[#4CAF50] mr-2" />
                Privacy Policy
              </a></li>
              <li><a href="/terms" className="transition-colors flex items-center">
                <FaFileMedical className="text-[#4CAF50] mr-2" />
                Terms of Service
              </a></li>
              <li><a href="/faq" className="transition-colors flex items-center">
                <span className="mr-2">•</span> FAQ
              </a></li>
              <li><a href="/feedback" className="transition-colors flex items-center">
                <span className="mr-2">•</span> Patient Feedback
              </a></li>
            </ul>
          </div>
        </div>

        <div className="p-4 mb-8 flex items-center justify-between">
          <div className="flex items-center">
            <FaPhone className="text-[#4CAF50] mr-3 text-xl" />
            <div>
              <h4 className="font-bold text-[#4CAF50]">Medical Emergency</h4>
              <p className="text-[#4CAF50] text-sm">24/7 Emergency Services</p>
            </div>
          </div>
          <a href="tel:+9779801234567" className="bg-white text-red-600 px-4 py-2 rounded-md font-semibold hover:bg-gray-100 transition-colors">
            Dial: +977 9801234567
          </a>
        </div>

        <div className="pt-6 flex flex-col md:flex-row justify-center items-center">
          <p className="text-gray-800 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} HealthSolution. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;