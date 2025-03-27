import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminHome from './AdminMain/AdminHome';
import AdminLogin from './AdminMain/AdminLogin';
import './App.css';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Routes>
      <Route path="/login" element={<AdminLogin/>}/>
    </Routes>
    <AdminHome/>
    </>
  )
}

export default App
