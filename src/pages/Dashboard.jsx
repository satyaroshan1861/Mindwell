import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useStore } from '../store/useStore'
import { 
  Heart, 
  Target, 
  BookOpen, 
  TrendingUp,
  Calendar,
  Smile,
  AlertTriangle
} from 'lucide-react'
import { format, isToday } from 'date-fns'
import { MOOD_TYPES } from '../data/database'

export default function Dashboard() {
  const { moodHistory, habits, journalEntries, user } = useStore()
  
  const todaysMood = moodHistory.find(mood => 
    isToday(new Date(mood.date))
  )
  
  const activeHabits = habits.filter(habit => 
    habit.lastCompleted && isToday(new Date(habit.lastCompleted))
  ).length
  
  const weeklyMoodAvg = moodHistory
    .slice(0, 7)
    .reduce((acc, mood) => acc + mood.intensity, 0) / Math.min(moodHistory.length, 7)

  return (
    <div className="space-y-32">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-center min-h-screen flex flex-col justify-center"
      >
        <h1 className="hero-text mb-8">
          MENTAL
          <br />
          <span className="text-accent-green">WELLNESS</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
          Track your journey. Build better habits. Transform your mind.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Link to="/mood" className="btn-primary">
            START NOW
          </Link>
          <Link to="/resources" className="btn-secondary">
            GET HELP
          </Link>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        <div className="card-dark text-center">
          <div className="text-6xl font-bold text-accent-green mb-4">
            {todaysMood ? MOOD_TYPES[todaysMood.mood]?.emoji : '—'}
          </div>
          <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-wider">Today's Mood</h3>
          <p className="text-gray-400 text-lg">
            {todaysMood ? `${todaysMood.intensity}/10` : 'Not tracked'}
          </p>
        </div>
        
        <div className="card-dark text-center">
          <div className="text-6xl font-bold text-accent-green mb-4">
            {activeHabits}/{habits.length}
          </div>
          <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-wider">Habits Today</h3>
          <p className="text-gray-400 text-lg">Completed</p>
        </div>
        
        <div className="card-dark text-center">
          <div className="text-6xl font-bold text-accent-green mb-4">
            {weeklyMoodAvg ? weeklyMoodAvg.toFixed(1) : '—'}
          </div>
          <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-wider">Weekly Average</h3>
          <p className="text-gray-400 text-lg">Mood score</p>
        </div>
      </motion.div>

      {/* Features Grid */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        <Link to="/mood" className="card-dark group">
          <h3 className="text-3xl font-bold text-white mb-6 uppercase tracking-wider">MOOD<br/>TRACKING</h3>
          <p className="text-gray-400 mb-8 text-lg leading-relaxed">Log emotions with intensity levels. Identify patterns over time.</p>
          <div className="text-sm font-bold text-accent-green group-hover:text-white transition-colors uppercase tracking-wider">
            START TRACKING →
          </div>
        </Link>
        
        <Link to="/habits" className="card-dark group">
          <h3 className="text-3xl font-bold text-white mb-6 uppercase tracking-wider">HABIT<br/>BUILDING</h3>
          <p className="text-gray-400 mb-8 text-lg leading-relaxed">Create positive mental health habits. Track progress with streaks.</p>
          <div className="text-sm font-bold text-accent-green group-hover:text-white transition-colors uppercase tracking-wider">
            BUILD HABITS →
          </div>
        </Link>
        
        <Link to="/journal" className="card-dark group">
          <h3 className="text-3xl font-bold text-white mb-6 uppercase tracking-wider">DIGITAL<br/>JOURNAL</h3>
          <p className="text-gray-400 mb-8 text-lg leading-relaxed">Express thoughts and feelings. Private, searchable entries.</p>
          <div className="text-sm font-bold text-accent-green group-hover:text-white transition-colors uppercase tracking-wider">
            START WRITING →
          </div>
        </Link>
      </motion.div>

      {/* Recent Activity */}
      {moodHistory.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="card p-8"
        >
          <h2 className="text-2xl font-medium text-slate-900 mb-6">
            Recent Activity
          </h2>
          <div className="space-y-4">
            {moodHistory.slice(0, 3).map((mood, index) => (
              <div key={mood.id} className="flex items-center justify-between py-4 border-b border-slate-100 last:border-0">
                <div className="flex items-center space-x-4">
                  <span className="text-2xl">{MOOD_TYPES[mood.mood]?.emoji}</span>
                  <div>
                    <div className="font-medium text-slate-900">{MOOD_TYPES[mood.mood]?.name}</div>
                    <div className="text-sm text-slate-600">
                      {format(new Date(mood.date), 'MMM d, h:mm a')}
                    </div>
                  </div>
                </div>
                <div className="text-lg font-medium text-slate-900">
                  {mood.intensity}/10
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}