import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import DoctorHome from './DoctorHome';
import DocContextProvider from './doctorContext/DocContext';

import DoctorLogin from './DoctorLogin';


function App() {
  const location = useLocation();
  return (
    <>
      <DocContextProvider>
       <Routes>
        <Route path="/DoctorLogin" element={<DoctorLogin />} />
      </Routes>

      {/* Render DocHome only if the path is NOT "/login" */}
      {location.pathname !== "/DoctorLogin" && <DoctorHome />}

    

    </DocContextProvider>

    </>
  )
}

export default App
