
import { Route, Routes } from 'react-router-dom';
import AdminHome from './Admin/AdminHome';
import AdminLogin from './Admin/AdminLogin';
import './App.css';
import UserHome from './User/UserHome';


function App() {
  return (
    <Routes>
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/*" element={<AdminHome />} />
      <Route path="/user" element={<UserHome/>}/>
    </Routes>


  )}
export default App;
