import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import AppContextProvider from "./context/AppContext";
import UserHome from "./User/UserHome";
import AppointmentsPage from "./User/UserPages/Appointments";
import DashboardLayout from "./User/UserPages/Dashboard";
import ForgotPassword from "./User/UserPages/ForgotPassword";
import LabReports from "./User/UserPages/LabReports";
import Login from "./User/UserPages/Login";
import PatientAppointmentDetail from "./User/UserPages/PatientAppointmentDetail";
import PaymentFailed from "./User/UserPages/PaymentFailed";
import PaymentSuccess from "./User/UserPages/PaymentSuccess";
import ProfilePage from "./User/UserPages/Profile";
import ResetPassword from "./User/UserPages/ResetPassword";

function App() {
  return (
    <AppContextProvider>
      <Routes>
        <Route path="/" element={<UserHome />} />
        <Route path="/auth" element={<Login />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<AppointmentsPage />} />

          <Route path="appointments" element={<AppointmentsPage />} />
          <Route
            path="appointments/:appointmentId"
            element={<PatientAppointmentDetail />}
          />
          <Route path="profile" element={<ProfilePage />} />

          <Route path="lab-reports" element={<LabReports />} />
        </Route>
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment-failed" element={<PaymentFailed />} />
      </Routes>
      <ToastContainer />
    </AppContextProvider>
  );
}

export default App;
