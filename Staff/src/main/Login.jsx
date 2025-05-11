import React, { useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { DoctorContext } from "../context/DoctorContext";
import { PathologistContext } from "../context/PathologistContext";
import HealthSolutionLogo from "../assets/HealthSolutionLogo.svg";

const Login = () => {
  const [state, setState] = useState("Admin");
  const { setAdminToken, backendUrl } = useContext(AdminContext);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { setDoctorToken } = useContext(DoctorContext);
  const { setPathologistToken } = useContext(PathologistContext);
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    // Basic validation
    if (!email || !password) {
      setErrors({
        email: !email ? "Email is required" : "",
        password: !password ? "Password is required" : ""
      });
      return;
    }

    try {
      if (state === "Admin") {
        const { data } = await axios.post(`${backendUrl}/api/admin/login`, {
          email,
          password,
        });

        if (data.success) {
          localStorage.setItem("admin_token", data.token);
          setAdminToken(data.token);
          toast.success("Login successful!");
          navigate("/admin/dashboard");
        } else {
          toast.error(data.message);
        }
      } else if (state === "Doctor") {
        const { data } = await axios.post(`${backendUrl}/api/doctor/login`, {
          email,
          password,
        });

        if (data.success) {
          localStorage.setItem("doctor_token", data.token);
          setDoctorToken(data.token);
          toast.success("Login successful!");
          navigate("/doctor/dashboard");
        } else {
          toast.error(data.message);
        }
      } else if (state === "Pathologist") {
        const { data } = await axios.post(`${backendUrl}/api/pathologist/login`, {
          email,
          password,
        });

        if (data.success) {
          localStorage.setItem("pathologist_token", data.pathologist_token);
          setPathologistToken(data.pathologist_token);
          toast.success("Login successful!");
          navigate("/pathologist/pending-requests"); 
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F5F6FA] px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md text-center border border-gray-100">
        <div className="flex justify-center mb-6">
          <img
            onClick={() => navigate("/")}
            src={HealthSolutionLogo}
            alt="Health Solution Logo"
            className="h-20 w-25 hover:cursor-pointer"
          />
        </div>

        <h2 className="text-2xl font-semibold mb-2 text-[#0288D1]">
          Login as <span>{state}</span>
        </h2>

        <form onSubmit={onSubmitHandler} className="space-y-4 text-left">
          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-2 border ${errors.email ? "border-red-500" : "border-gray-300"} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0288D1]`}
              placeholder="Enter your email"
              required
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-4 py-2 border ${errors.password ? "border-red-500" : "border-gray-300"} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0288D1]`}
              placeholder="Enter your password"
              required
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            {(state === "Doctor" || state === "Pathologist") && (
              <p className="text-right mt-2">
                <span
                  className="text-sm text-[#0288D1] font-medium cursor-pointer hover:underline"
                  onClick={() => navigate("/forgot-password")}
                >
                  Forgot Password?
                </span>
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 text-white rounded-lg bg-[#0288D1] hover:bg-[#0277bd] shadow-md transition-all duration-300"
          >
            Login
          </button>

          {/* Toggle between Login Types */}
          <div className="text-gray-600 text-sm text-center mt-4 space-y-2">
            {state === "Admin" ? (
              <>
                <p>
                  Doctor Login?{" "}
                  <span
                    onClick={() => setState("Doctor")}
                    className="text-[#0288D1] font-medium cursor-pointer hover:underline"
                  >
                    Click here
                  </span>
                </p>
                <p>
                  Pathologist Login?{" "}
                  <span
                    onClick={() => setState("Pathologist")}
                    className="text-[#0288D1] font-medium cursor-pointer hover:underline"
                  >
                    Click here
                  </span>
                </p>
              </>
            ) : state === "Doctor" ? (
              <>
                <p>
                  Admin Login?{" "}
                  <span
                    onClick={() => setState("Admin")}
                    className="text-[#0288D1] font-medium cursor-pointer hover:underline"
                  >
                    Click here
                  </span>
                </p>
                <p>
                  Pathologist Login?{" "}
                  <span
                    onClick={() => setState("Pathologist")}
                    className="text-[#0288D1] font-medium cursor-pointer hover:underline"
                  >
                    Click here
                  </span>
                </p>
              </>
            ) : (
              <>
                <p>
                  Admin Login?{" "}
                  <span
                    onClick={() => setState("Admin")}
                    className="text-[#0288D1] font-medium cursor-pointer hover:underline"
                  >
                    Click here
                  </span>
                </p>
                <p>
                  Doctor Login?{" "}
                  <span
                    onClick={() => setState("Doctor")}
                    className="text-[#0288D1] font-medium cursor-pointer hover:underline"
                  >
                    Click here
                  </span>
                </p>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;