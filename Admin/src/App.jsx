import { Route, Routes, useLocation } from "react-router-dom";
import AdminHome from "./AdminMain/AdminHome";
import AdminLogin from "./AdminMain/AdminLogin";

function App() {
  const location = useLocation();

  return (
    <>
      <Routes>
        <Route path="/login" element={<AdminLogin />} />
      </Routes>

      {/* Render AdminHome only if the path is NOT "/login" */}
      {location.pathname !== "/login" && <AdminHome />}
    </>
  );
}

export default App;
