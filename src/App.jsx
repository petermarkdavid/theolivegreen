import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Homepage from './pages/Homepage'
import Shop from './pages/Shop'
import ShopSuccess from './pages/ShopSuccess'
import Harvest from './pages/Harvest'
import HarvestThankYou from './pages/HarvestThankYou'

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-[4.5rem] md:pt-16">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/shop/success" element={<ShopSuccess />} />
            <Route path="/harvest" element={<Harvest />} />
            <Route path="/thanks" element={<HarvestThankYou />} />
            {/* Old URL — keep redirecting so already-shared links still work */}
            <Route path="/harvest-thank-you" element={<Navigate to="/thanks" replace />} />
            <Route path="/about" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
