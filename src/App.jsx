import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
// import Dashboard from './components/Dashbord'

function App() {
  return (
   <>
    <Navbar />
    <Outlet/>
    
   </>
  )
}

export default App
