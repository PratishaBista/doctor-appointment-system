import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import HealthSolutionLogo from "../../assets/HealthSolutionLogo.svg";

const DashboardLayout = () => {
  const { userData, setToken } = useContext(AppContext);
  const location = useLocation();
  const navigate = useNavigate();

  const logout = () => {
    setToken(false);
    localStorage.removeItem("token");
    navigate("/");
  };

  const isActive = (path) => {
    return location.pathname.startsWith(path)
      ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600"
      : "text-gray-600 hover:bg-gray-50";
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64 border-r border-gray-200 bg-white">
          {/* Logo */}
          <div className="flex items-center justify-center h-20 px-4 border-b border-gray-200">
            <img
              src={HealthSolutionLogo}
              alt="HealthSolution Logo"
              className="h-12"
              onClick={() => navigate("/")}
            />
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 space-y-1">
            <Link
              to="/dashboard/appointments"
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${isActive("/dashboard/appointments")}`}
            >
              <svg className="w-5 h-5 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Appointments
            </Link>

            <Link
              to="/dashboard/lab-results"
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${isActive("/dashboard/lab-results")}`}
            >
              <svg className="w-5 h-5 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Lab Results
            </Link>

            <Link
              to="/dashboard/profile"
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${isActive("/dashboard/profile")}`}
            >
              <svg className="w-5 h-5 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              My Profile
            </Link>
          </nav>

          {/* Logout */}
          <div className="px-2 py-4 border-t border-gray-200">
            <button
              onClick={logout}
              className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-red-600"
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top Navigation Bar */}
        <header className="bg-white shadow-sm">
          <div className="flex justify-between items-center h-16 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center md:hidden">
              {/* Mobile menu button would go here */}
            </div>

            <div className="flex items-center space-x-4 ml-auto"> {/* Added ml-auto to push to right */}
              {/* Notifications */}
              <Link
                to="/dashboard/notifications"
                className="p-1 rounded-full text-gray-400 hover:text-gray-500 relative"
              >
                <span className="sr-only">Notifications</span>
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
              </Link>

              {/* Profile dropdown */}
              <div className="flex items-center space-x-2">
                <img
                  className="w-8 h-8 rounded-full"
                  src={userData?.image || "/default-profile.png"}
                  alt="Profile"
                />
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-700">{userData?.name || "User"}</p>
                  <p className="text-xs text-gray-500">Patient</p>
                </div>
              </div>
            </div>
          </div>
        </header>


        {/* Main content area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-white">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;