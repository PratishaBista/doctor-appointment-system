// UserHome.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Footer from './UserComponents/Footer';
import HomeBody from './UserComponents/HomeBody';
import Navbar from './UserComponents/Navbar';
import OurServices from './UserPages/OurServices';
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
      </Routes>
      <Footer />
    </>
  );
}

export default UserHome;
