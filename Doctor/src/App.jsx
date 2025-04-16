import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import DoctorHome from './DoctorHome';
import DoctorContextProvider from './doctorContext/DoctorContext';

import Login from './Login';


function App() {
  const location = useLocation();
  return (
    <>
      <DoctorContextProvider>
       <Routes>
        <Route path="/Login" element={<Login />} />
      </Routes>

      {location.pathname !== "/Login" && <DoctorHome />}

    

    </DoctorContextProvider>

    </>
  )
}

export default App