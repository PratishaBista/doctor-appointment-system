// App.jsx
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import AppContextProvider from './context/AppContext';
import PaymentFailure from "./User/esewapayment/PaymentFailure";
import PaymentForm from "./User/esewapayment/PaymentForm";
import PaymentSuccess from "./User/esewapayment/PaymentSucess";
import UserHome from './User/UserHome';
import AppointmentsPage from './User/UserPages/Appointments';
import DashboardLayout from "./User/UserPages/Dashboard";
import LabReports from './User/UserPages/LabReports';
import PatientAppointmentDetail from './User/UserPages/PatientAppointmentDetail';
import ProfilePage from './User/UserPages/Profile';

function App() {
  return (
    <AppContextProvider>
      <Routes>
        <Route path="/*" element={<UserHome />} />
        <Route path="/paymentForm" element={<PaymentForm />} />
        <Route path="/PaymentFailure" element={<PaymentFailure />} />
        <Route path="/paymentSuccess" element={<PaymentSuccess />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<AppointmentsPage />} />
          {/* <Route path="notifications" element={<NotificationsPage />} /> */}
          <Route path="appointments" element={<AppointmentsPage />} />
          <Route path="appointments/:appointmentId" element={<PatientAppointmentDetail />} />
          <Route path="profile" element={<ProfilePage />} />
          {/* <Route path="settings" element={<SettingsPage />} /> */}
          <Route path="lab-reports" element={<LabReports />} />
        </Route>
      </Routes>
      <ToastContainer />
    </AppContextProvider>
  );
}

export default App;