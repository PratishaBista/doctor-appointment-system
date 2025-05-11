// App.jsx
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import AppContextProvider from './context/AppContext';
import PaymentFailure from "./User/eSewaPayment/PaymentFailure";
import PaymentForm from "./User/eSewaPayment/PaymentForm";
import PaymentSuccess from "./User/eSewaPayment/PaymentSuccess";
import UserHome from './User/UserHome';
import AppointmentsPage from './User/UserPages/Appointments';
import DashboardLayout from "./User/UserPages/Dashboard";
import Login from "./User/UserPages/Login";
import ProfilePage from './User/UserPages/Profile';


function App() {
  return (
    <AppContextProvider>
      <Routes>
        <Route path="/paymentForm" element={<PaymentForm/>} />
        <Route path="/paymentSuccess" element={<PaymentSuccess/>} />
        <Route path="/PaymentFailure" element={<PaymentFailure/>} />
        <Route path="/*" element={<UserHome />} />
        <Route path="/auth" element={<Login />} />
        <Route path="/profile" element={<ProfilePage />} />
        {/* <Route path="/admin" element={<AdminLogin/>}/> */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<AppointmentsPage />} />

          {/* <Route path="notifications" element={<NotificationsPage />} /> */}
          <Route path="appointments" element={<AppointmentsPage />} />
          <Route path="profile" element={<ProfilePage />} />
          
    
          {/* <Route path="settings" element={<SettingsPage />} />
          <Route path="lab-results" element={<LabResultsPage />} /> */}
        </Route>
      </Routes>
      <ToastContainer />
    </AppContextProvider>
  );
}

export default App;