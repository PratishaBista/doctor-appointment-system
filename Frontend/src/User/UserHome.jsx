// UserHome.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Footer from './UserComponents/Footer';
import HomeBody from './UserComponents/HomeBody';
import MyProfile from './UserComponents/MyProfile';
import Navbar from './UserComponents/Navbar';
import BookedAppointment from './UserPages/BookedAppointment';
import MyAppointment from './UserPages/MyAppointment';
import OurServices from './UserPages/OurServices';
import SelectedSpeciality from './UserPages/SelectedSpeciality';
import UserAbout from './UserPages/UserAbout';
import UserContact from './UserPages/UserContact';

function UserHome() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomeBody />} />
        <Route path="/ourServices" element={<OurServices />} />
        <Route path="/userAbout" element={<UserAbout />} />
        <Route path="/userContact" element={<UserContact />} />
        <Route path="/profile" element={<MyProfile />} />
        <Route path="/bookedAppointment/:docId" element={<BookedAppointment />} />
        <Route path="/selectedSpeciality" element={<SelectedSpeciality/>}/>
        <Route path="/my-appointment/:docId" element={<MyAppointment />} />
      </Routes>
      <Footer />
    </>
  );
}

export default UserHome;
