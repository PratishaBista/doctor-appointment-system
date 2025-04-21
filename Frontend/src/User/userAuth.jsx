import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const UserAuth = () => {
  const [authMode, setAuthMode] = useState("login"); // "login" or "signup"
  const [state, setState] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("sidd12@gmail.com");
  const [password, setPassword] = useState("SiddhantStha");
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState("");
  const navigate = useNavigate();
  const { account, setAccount } = useContext(AppContext);

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const validateFullName = (fullName) => {
    return fullName.length >= 6;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setGeneralError(""); // Reset general error before submission
    let formErrors = {};

    try {
      if (authMode === "signup" && !fullName.trim()) {
        formErrors.fullName = "Full name is required.";
      }

      if (!email || !validateEmail(email)) {
        formErrors.email = "Please enter a valid email address.";
      }

      if (!password || !validatePassword(password)) {
        formErrors.password = "Password must be at least 6 characters long.";
      }

      if (Object.keys(formErrors).length > 0) {
        setErrors(formErrors);
        return;
      }

      console.log(`${authMode} attempted for:`, { state, email, fullName });

      // Simulate authentication logic
      if (email === "sidd12@gmail.com" && password === "SiddhantStha") {
        setAccount(true);
        navigate("/");
        return;
      }

      if (
        validateEmail(email) &&
        validatePassword(password) &&
        (authMode === "login" || validateFullName(fullName))
      ) {
        setAccount(true);
        navigate("/");
        return;
      }

      setFullName("");
      setEmail("");
      setPassword("");
      setErrors({});
    } catch (error) {
      console.error("Unexpected error during authentication:", error);
      setGeneralError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-96 border border-gray-200"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-[#146A5D]">
          {authMode === "login" ? "Login" : "Sign Up"}
        </h2>

        {generalError && (
          <div className="mb-4 text-red-600 text-sm text-center font-medium">
            {generalError}
          </div>
        )}

        {authMode === "signup" && (
          <div className="mb-5">
            <label className="block text-gray-700 font-medium mb-1">Full Name:</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className={`w-full p-3 border ${errors.fullName ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-[#146A5D] focus:outline-none`}
              placeholder="Enter your full name"
            />
            {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
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
            {authMode === "login" ? "Login" : "Sign Up"}
          </button>

          <p className="text-gray-600 text-sm mt-3">
            {authMode === "login" ? (
              <>New user?{" "}
                <span
                  onClick={() => {
                    setAuthMode("signup");
                    setErrors({});
                    setGeneralError("");
                  }}
                  className="text-[#146A5D] font-medium cursor-pointer hover:underline"
                >
                  Sign Up
                </span>
              </>
            ) : (
              <>Already have an account?{" "}
                <span
                  onClick={() => {
                    setAuthMode("login");
                    setErrors({});
                    setGeneralError("");
                  }}
                  className="text-[#146A5D] font-medium cursor-pointer hover:underline"
                >
                  Login
                </span>
              </>
            )}
          </p>
        </div>
      </form>
    </div>
  );
};

export default UserAuth;
