import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './assets/css/index.css'

import Login from './pages/Login'
import Registera from './pages/Registera'
import Registerb from './pages/Registerb'

const App = () => {
  return (
    <Router>
        <div className="container">
          <div className='container-in'>
            <Routes>
               <Route exact path="/" element={<Login />} />
               <Route path="/join" element={<Registera />}/>
               <Route path="/joinend" element={<Registerb />}/>
            </Routes>
          </div> 
        </div>
    </Router>
  )
}

export default App