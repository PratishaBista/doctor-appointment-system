import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import PaymentForm from './eSewaPayment/PaymentForm';
import Footer from './UserComponents/Footer';
import HomeBody from './UserComponents/HomeBody';
import Navbar from './UserComponents/Navbar';
import UserAbout from './UserPages/AboutUs';
import BookAppointment from './UserPages/BookAppointment';
import UserContact from './UserPages/ContactUs';
import Department from './UserPages/Department';
import FindDoctors from './UserPages/FindDoctors';
import ForgotPassword from './UserPages/ForgotPassword';
import ResetPassword from './UserPages/ResetPassword';
import SelectedSpeciality from './UserPages/SelectedSpeciality';

function UserHome() {
  const location = useLocation();

  const hideHeaderFooterRoutes = ['/forgot-password', '/reset-password'];

  const hideHeaderFooter = hideHeaderFooterRoutes.includes(location.pathname);

  return (
    <>
      <Navbar />
      
      <Routes>
        <Route path="/" element={<HomeBody />} />
        <Route path="/FindDoctors" element={<FindDoctors />} />
        <Route path="/userAbout" element={<UserAbout />} />
        <Route path="/Department" element={<Department />} />
        <Route path="/userContact" element={<UserContact />} />
        <Route path="/selectedSpeciality" element={<SelectedSpeciality />} />
        <Route path="/book-appointment/:docId" element={<BookAppointment />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/paymentForm" element={<PaymentForm/>} />

      </Routes>

      {!hideHeaderFooter && <Footer />}
    </>
  );
}

export default UserHome;
