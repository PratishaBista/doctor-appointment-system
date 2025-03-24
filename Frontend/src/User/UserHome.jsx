import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Footer from './UserComponents/Footer';
import HomeBody from './UserComponents/HomeBody';
import Navbar from './UserComponents/Navbar';
import OurServices from './UserPages/OurServices';
import UserAbout from './UserPages/UserAbout';
import UserContact from './UserPages/UserContact';

function App() {
  return (
    <>
  <Navbar/>
    <Routes>
 
      <Route path="/" element={<HomeBody />} />
      <Route path="/user/ourServices" element={<OurServices />} />
      <Route path="/user/userAbout" element={<UserAbout />} />
      <Route path="/user/userContact" element={<UserContact />} />
    </Routes>
    <Footer/>

    </>
  );
}

export default App;
