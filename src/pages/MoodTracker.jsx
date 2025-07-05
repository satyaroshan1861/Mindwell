import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useStore } from '../store/useStore'
import { MOOD_TYPES } from '../data/database'
import { Heart, Plus, Calendar } from 'lucide-react'
import { format } from 'date-fns'
import toast from 'react-hot-toast'

export default function MoodTracker() {
  const { addMoodEntry, moodHistory } = useStore()
  const [selectedMood, setSelectedMood] = useState('')
  const [intensity, setIntensity] = useState(5)
  const [notes, setNotes] = useState('')
  const [triggers, setTriggers] = useState('')
  const [activities, setActivities] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!selectedMood) {
      toast.error('Please select a mood')
      return
    }

    await addMoodEntry({
      mood: selectedMood,
      intensity,
      notes,
      triggers: triggers.split(',').map(t => t.trim()).filter(Boolean),
      activities: activities.split(',').map(a => a.trim()).filter(Boolean)
    })

    toast.success('Mood logged successfully!')
    setSelectedMood('')
    setIntensity(5)
    setNotes('')
    setTriggers('')
    setActivities('')
  }

  return (
    <div className="space-y-16">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 uppercase tracking-wider">
          MOOD
          <br />
          <span className="text-accent-green">TRACKER</span>
        </h1>
        <p className="text-xl text-gray-400">Track your emotional well-being</p>
      </motion.div>

      {/* Mood Entry Form */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card-dark"
      >
        <h2 className="text-3xl font-bold text-white mb-8 uppercase tracking-wider">How are you feeling?</h2>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Mood Selection */}
          <div>
            <label className="block text-lg font-bold text-white mb-6 uppercase tracking-wider">
              Select your mood
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Object.entries(MOOD_TYPES).map(([key, mood]) => (
                <motion.button
                  key={key}
                  type="button"
                  onClick={() => setSelectedMood(key)}
                  className={`p-6 border-2 transition-all duration-300 ${
                    selectedMood === key 
                      ? 'border-accent-green bg-accent-green/10' 
                      : 'border-dark-700 hover:border-accent-green'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="text-center">
                    <div className="text-4xl mb-3">{mood.emoji}</div>
                    <div className="font-bold text-white uppercase tracking-wider">{mood.name}</div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Intensity Slider */}
          <div>
            <label className="block text-lg font-bold text-white mb-4 uppercase tracking-wider">
              Intensity: <span className="text-accent-green">{intensity}/10</span>
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={intensity}
              onChange={(e) => setIntensity(parseInt(e.target.value))}
              className="w-full h-3 bg-dark-700 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #00ff88 0%, #00ff88 ${intensity * 10}%, #2a2a2a ${intensity * 10}%, #2a2a2a 100%)`
              }}
            />
            <div className="flex justify-between text-sm text-gray-400 mt-2 font-bold uppercase tracking-wider">
              <span>Low</span>
              <span>High</span>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-lg font-bold text-white mb-4 uppercase tracking-wider">
              Notes (optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="What's on your mind?"
              className="w-full p-4 bg-dark-700 border border-dark-700 text-white placeholder-gray-400 focus:border-accent-green focus:outline-none transition-colors"
              rows="4"
            />
          </div>

          {/* Triggers */}
          <div>
            <label className="block text-lg font-bold text-white mb-4 uppercase tracking-wider">
              Triggers (comma-separated)
            </label>
            <input
              type="text"
              value={triggers}
              onChange={(e) => setTriggers(e.target.value)}
              placeholder="work stress, lack of sleep, social media"
              className="w-full p-4 bg-dark-700 border border-dark-700 text-white placeholder-gray-400 focus:border-accent-green focus:outline-none transition-colors"
            />
          </div>

          {/* Activities */}
          <div>
            <label className="block text-lg font-bold text-white mb-4 uppercase tracking-wider">
              Recent activities (comma-separated)
            </label>
            <input
              type="text"
              value={activities}
              onChange={(e) => setActivities(e.target.value)}
              placeholder="exercise, meditation, socializing"
              className="w-full p-4 bg-dark-700 border border-dark-700 text-white placeholder-gray-400 focus:border-accent-green focus:outline-none transition-colors"
            />
          </div>

          <motion.button
            type="submit"
            className="w-full btn-primary flex items-center justify-center"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Plus className="w-5 h-5 mr-2" />
            LOG MOOD
          </motion.button>
        </form>
      </motion.div>

      {/* Recent Entries */}
      {moodHistory.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card-dark"
        >
          <h2 className="text-3xl font-bold text-white mb-8 uppercase tracking-wider flex items-center">
            <Calendar className="w-8 h-8 mr-4 text-accent-green" />
            Recent Entries
          </h2>
          <div className="space-y-6">
            {moodHistory.slice(0, 5).map((entry) => (
              <div key={entry.id} className="border-l-4 border-accent-green pl-6 py-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <span className="text-3xl">{MOOD_TYPES[entry.mood]?.emoji}</span>
                    <div>
                      <div className="font-bold text-white text-lg uppercase tracking-wider">{MOOD_TYPES[entry.mood]?.name}</div>
                      <div className="text-sm text-gray-400">
                        {format(new Date(entry.date), 'MMM d, yyyy h:mm a')}
                      </div>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-accent-green">
                    {entry.intensity}/10
                  </div>
                </div>
                {entry.notes && (
                  <p className="text-gray-300 mb-4">{entry.notes}</p>
                )}
                {entry.triggers?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {entry.triggers.map((trigger, idx) => (
                      <span key={idx} className="px-3 py-1 bg-red-900/50 text-red-300 text-xs font-bold uppercase tracking-wider border border-red-700">
                        {trigger}
                      </span>
                    ))}
                  </div>
                )}
                {entry.activities?.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {entry.activities.map((activity, idx) => (
                      <span key={idx} className="px-3 py-1 bg-green-900/50 text-green-300 text-xs font-bold uppercase tracking-wider border border-green-700">
                        {activity}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}