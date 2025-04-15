// App.jsx
import { Route, Routes, useLocation } from "react-router-dom";
import './App.css';
import AppContextProvider from './context/AppContext';
import Login from "./User/UserPages/Login";
import UserHome from './User/UserHome';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const location = useLocation();

  return (
    <AppContextProvider>
      <Routes>
        <Route path="/*" element={<UserHome />} />
        <Route path="/auth" element={<Login />} />
      </Routes>
      <ToastContainer />
    </AppContextProvider>
  );
}

export default App;