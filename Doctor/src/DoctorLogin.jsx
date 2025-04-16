import React, { useState } from "react";

const DoctorLogin = () => {
  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  // Email validation
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  // Password validation
  const validatePassword = (password) => {
    return password.length >= 6; // Password should be at least 6 characters long
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let formErrors = {};
    // Validate email
    if (!email || !validateEmail(email)) {
      formErrors.email = "Please enter a valid email address.";
    }

    // Validate password
    if (!password || !validatePassword(password)) {
      formErrors.password = "Password must be at least 6 characters long.";
    }

    // If errors exist, set them in state
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      // If no errors, proceed with login (for now, just log it)
      console.log("Login attempted for:", state);
      // Reset form and errors
      setEmail("");
      setPassword("");
      setErrors({});
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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

export default DoctorLogin;
