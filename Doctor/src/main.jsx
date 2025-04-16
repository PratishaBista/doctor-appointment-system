import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"
import App from './App.jsx'
import DoctorContextProvider from './doctorContext/DoctorContext.jsx'
import './index.css'
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <DoctorContextProvider>
  <App />
  </DoctorContextProvider>

  </BrowserRouter>,
)
