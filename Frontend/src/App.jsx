
import { Route, Routes } from 'react-router-dom';
import AdminHome from './Admin/AdminHome';
import AdminLogin from './Admin/AdminLogin';
import './App.css';


function App() {
  return (
    <Routes>
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/*" element={<AdminHome />} /> {/* This is the main route */}
    </Routes>


  )}
export default App;
