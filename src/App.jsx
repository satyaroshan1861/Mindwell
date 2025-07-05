import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useStore } from './store/useStore'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import MoodTracker from './pages/MoodTracker'
import HabitTracker from './pages/HabitTracker'
import Journal from './pages/Journal'
import Resources from './pages/Resources'
import Analytics from './pages/Analytics'

function App() {
  const { loadData } = useStore()

  useEffect(() => {
    loadData()
  }, [loadData])

  return (
    <div className="min-h-screen bg-dark-900">
      <Navbar />
      <motion.main 
        className="max-w-7xl mx-auto section-padding"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/mood" element={<MoodTracker />} />
          <Route path="/habits" element={<HabitTracker />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/resources" element={<Resources />} />
        </Routes>
      </motion.main>
    </div>
  )
}

export default App