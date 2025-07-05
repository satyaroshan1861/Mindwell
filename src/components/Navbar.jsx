import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

const navItems = [
  { path: '/', label: 'Dashboard' },
  { path: '/mood', label: 'Mood' },
  { path: '/habits', label: 'Habits' },
  { path: '/journal', label: 'Journal' },
  { path: '/analytics', label: 'Analytics' },
  { path: '/resources', label: 'Resources' }
]

export default function Navbar() {
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-dark-900 border-b border-dark-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="text-2xl font-bold text-white">
            MINDWELL
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-12">
            {navItems.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={`text-sm font-bold uppercase tracking-wider transition-colors duration-300 ${
                  location.pathname === path 
                    ? 'text-accent-green' 
                    : 'text-white hover:text-accent-green'
                }`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            className="md:hidden py-4 border-t border-dark-700"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            {navItems.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className="block px-4 py-4 text-sm font-bold uppercase tracking-wider text-white hover:text-accent-green"
                onClick={() => setIsOpen(false)}
              >
                {label}
              </Link>
            ))}
          </motion.div>
        )}
      </div>
    </nav>
  )
}