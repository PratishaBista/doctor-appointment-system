import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import axios from 'axios';
import { toast } from "react-toastify";
import HealthSolutionLogo from "../../assets/HealthSolutionLogo.svg";

const Login = () => {
  const { backendUrl, token, setToken } = useContext(AppContext);
  const [state, setState] = useState('signup');
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (state === "signup") {
      if (name.trim() === "") {
        newErrors.name = "Full name is required.";
      }
      if (!confirmPassword.trim()) {
        newErrors.confirmPassword = "Please confirm your password.";
      } else if (password !== confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match.";
      }
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
      const endpoint = state === 'signup' ? '/api/user/register' : '/api/user/login';
      const payload = state === 'signup' ? { name, password, email } : { password, email };
      const { data } = await axios.post(backendUrl + endpoint, payload);

      if (data.success) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        toast.success("Login successful!");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Login error:", error.message);
      toast.error("Something went wrong! Please try again.");
    }
  };

  useEffect(() => {
    if (token) navigate("/");
  }, [token, navigate]);

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
          {state === "login" ? "Welcome Back" : "Create an Account"}
        </h2>
        <p className="text-gray-600 mb-6 text-sm">
          {state === "login"
            ? "Login to your account"
            : "Join us to access your dashboard"}
        </p>

        <form onSubmit={onSubmitHandler} className="space-y-4 text-left">
          {state === "signup" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full px-4 py-2 border ${errors.name ? "border-red-500" : "border-gray-300"} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0288D1]`}
                placeholder=""
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-2 border ${errors.email ? "border-red-500" : "border-gray-300"} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0288D1]`}
              placeholder=""
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-4 py-2 border ${errors.password ? "border-red-500" : "border-gray-300"} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0288D1]`}
              placeholder=""
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            {state === "login" && (
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

          {state === "signup" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`w-full px-4 py-2 border ${errors.confirmPassword ? "border-red-500" : "border-gray-300"} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0288D1]`}
                placeholder=""
              />
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-2 px-4 text-white rounded-lg transition
            bg-[#0288D1] hover:bg-[#0277bd] shadow-md"
          >
            {state === "login" ? "Login" : "Sign Up"}
          </button>
        </form>

        {state === "signup" && (
          <p className="text-xs text-gray-500 text-center mt-3">
            By signing up, you agree to Health Solution’s{" "}
            <span
              className="text-[#0288D1] cursor-pointer hover:underline"
              onClick={() => navigate("/terms")}
            >
              Terms & Conditions
            </span>.
          </p>
        )}

        <p className="text-gray-600 text-sm text-center mt-4">
          {state === "login" ? (
            <>
              New here?{" "}
              <span
                onClick={() => {
                  setState("signup");
                  setConfirmPassword("");
                }}
                className="text-[#0288D1] font-medium cursor-pointer hover:underline"
              >
                Create an Account
              </span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span
                onClick={() => {
                  setState("login");
                  setConfirmPassword("");
                }}
                className="text-[#0288D1] font-medium cursor-pointer hover:underline"
              >
                Login
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default Login;
