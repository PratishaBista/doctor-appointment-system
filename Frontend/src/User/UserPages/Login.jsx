import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import axios from 'axios';
import { toast } from "react-toastify";

const Login = () => {
  const { backendUrl, token, setToken } = useContext(AppContext);
  const [state, setState] = useState('signup');
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (state === "signup" && name.trim() === "") {
      newErrors.name = "Full name is required.";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!email.includes("@")) {
      newErrors.email = "Email must include '@'.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email format is invalid.";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required.";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    try {
      if (state === 'signup') {
        const { data } = await axios.post(backendUrl + "/api/user/register", {
          name,
          password,
          email
        });

        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/user/login", {
          password,
          email
        });

        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
        } else {
          toast.error(data.message);
        }
      }

    } catch (error) {
      toast.error("Something went wrong! Please try again.");
    }
  };

  useEffect(() => { 
    if (token) {
      navigate("/");
    }
}, [token])

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={onSubmitHandler}
        className="bg-white p-8 rounded-xl shadow-lg w-96 border border-gray-200"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-[#146A5D]">
          {state === "login" ? "Login" : "Sign Up"}
        </h2>

        {state === "signup" && (
          <div className="mb-5">
            <label className="block text-gray-700 font-medium mb-1">Full Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full p-3 border ${errors.name ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-[#146A5D] focus:outline-none`}
              placeholder="Enter your full name"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>
        )}

        <div className="mb-5">
          <label className="block text-gray-700 font-medium mb-1">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full p-3 border ${errors.email ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-[#146A5D] focus:outline-none`}
            placeholder="Enter your email"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div className="mb-5">
          <label className="block text-gray-700 font-medium mb-1">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full p-3 border ${errors.password ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-[#146A5D] focus:outline-none`}
            placeholder="Enter your password"
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="w-full bg-[#146A5D] text-white font-semibold px-4 py-3 rounded-lg hover:bg-[#0f5249] transition-all duration-300 shadow-md"
          >
            {state === "login" ? "Login" : "Sign Up"}
          </button>

          <p className="text-gray-600 text-sm mt-3">
            {state === "login" ? (
              <>New user? <span onClick={() => setState("signup")} className="text-[#146A5D] font-medium cursor-pointer hover:underline">Sign Up</span></>
            ) : (
              <>Already have an account? <span onClick={() => setState("login")} className="text-[#146A5D] font-medium cursor-pointer hover:underline">Login</span></>
            )}
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
