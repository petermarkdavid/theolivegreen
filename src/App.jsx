import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Homepage from './pages/Homepage'
import Shop from './pages/Shop'
import Accommodation from './pages/Accommodation'
import Harvest from './pages/Harvest'
import AboutUs from './pages/AboutUs'

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/accommodation" element={<Accommodation />} />
            <Route path="/harvest" element={<Harvest />} />
            <Route path="/about" element={<AboutUs />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
