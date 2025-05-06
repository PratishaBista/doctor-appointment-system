// App.jsx
import { Route, Routes } from "react-router-dom";
import './App.css';
import AppContextProvider from './context/AppContext';
import Login from "./User/UserPages/Login";
import UserHome from './User/UserHome';
import DashboardLayout from "./User/UserPages/Dashboard";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProfilePage from './User/UserPages/Profile';
import AppointmentsPage from './User/UserPages/Appointments';

function App() {
  return (
    <AppContextProvider>
      <Routes>
        <Route path="/*" element={<UserHome />} />
        <Route path="/auth" element={<Login />} />
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