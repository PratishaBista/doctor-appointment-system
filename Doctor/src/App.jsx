import { useState } from 'react'
import './App.css'
import DoctorHome from './DoctorHome'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <DoctorHome/>
    </>
  )
}

export default App
