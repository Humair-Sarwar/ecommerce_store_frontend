

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './pages/website/Home'
import Login from './pages/website/Login'
import Signup from './pages/website/Signup'
import { ToastContainer } from 'react-toastify'

function App() {

  return (
  <>
 <ToastContainer/>
 <BrowserRouter>
  <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
     <Route path="/signup" element={<Signup />} />
    </Routes>
    </BrowserRouter>
  </>
  )
}

export default App
