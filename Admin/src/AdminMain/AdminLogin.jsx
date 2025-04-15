import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { AdminContext } from "../context/adminContext";
import axios from "axios";
import { toast } from "react-toastify";

const AdminLogin = () => {
  const [state, setState] = useState("Admin");
  const { setAdminToken, backendUrl } = useContext(AdminContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const onSubmitHandler = async (event) => {
    event.preventDefault();
  
    try {
      const { data } = await axios.post(`${backendUrl}/api/admin/login`, {
        email,
        password,
      });
  
      console.log("Login response:", data);  
  
      if (data.success) {  
        console.log("Storing token:", data.token);  
        localStorage.setItem("admin_token", data.token); 
        setAdminToken(data.token);  
        toast.success("Login successful!");
      } else {
        toast.error(data.message);
      }      
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed. Please try again.");
    }
  };  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={onSubmitHandler}
        className="bg-white p-8 rounded-xl shadow-lg w-96 border border-gray-200"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-[#146A5D]">
          Login as <span>{state}</span>
        </h2>

        {/* Email Input */}
        <div className="mb-5">
          <label className="block text-gray-700 font-medium mb-1">Email:</label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
            className={`w-full p-3 border ${errors.email ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-[#146A5D] focus:outline-none`}
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Password Input */}
        <div className="mb-5">
          <label className="block text-gray-700 font-medium mb-1">Password:</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
            className={`w-full p-3 border ${errors.password ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-[#146A5D] focus:outline-none`}
            placeholder="Enter your password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="w-full bg-[#146A5D] text-white font-semibold px-4 py-3 rounded-lg hover:bg-[#0f5249] transition-all duration-300 shadow-md"
          >
            Login
          </button>

          {/* Toggle between Admin and Doctor */}
          <p className="text-gray-600 text-sm mt-3">
            {state === "Admin" ? (
              <>
                Doctor Login?{" "}
                <span
                  onClick={() => setState("Doctor")}
                  className="text-[#146A5D] font-medium cursor-pointer hover:underline hover:text-[#0f5249] transition duration-300"
                >
                  Click here
                </span>
              </>
            ) : (
              <>
                Admin Login?{" "}
                <span
                  onClick={() => setState("Admin")}
                  className="text-[#146A5D] font-medium cursor-pointer hover:underline hover:text-[#0f5249] transition duration-300"
                >
                  Click here
                </span>
              </>
            )}
          </p>
        </div>
      </form>
    </div>
  );
};

export default AdminLogin;