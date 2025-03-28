import { Route, Routes, useLocation } from "react-router-dom";
import './App.css';
import AppContextProvider from './context/AppContext';
import UserAuth from "./User/userAuth";
import UserHome from './User/UserHome';

function App() {
  const location = useLocation();
  return (
    <AppContextProvider>
       <Routes>
        <Route path="/auth" element={<UserAuth />} />
      </Routes>

      {/* Render AdminHome only if the path is NOT "/login" */}
      {location.pathname !== "/auth" && <UserHome />}

    

    </AppContextProvider>
  )}
export default App;
