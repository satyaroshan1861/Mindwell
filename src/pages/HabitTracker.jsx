import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useStore } from '../store/useStore'
import { HABIT_CATEGORIES } from '../data/database'
import { Target, Plus, Check, Flame, Calendar } from 'lucide-react'
import { format, isToday } from 'date-fns'
import toast from 'react-hot-toast'

export default function HabitTracker() {
  const { habits, addHabit, updateHabitStreak } = useStore()
  const [showForm, setShowForm] = useState(false)
  const [newHabit, setNewHabit] = useState({
    name: '',
    category: '',
    target: 1,
    streak: 0
  })

  const handleAddHabit = async (e) => {
    e.preventDefault()
    if (!newHabit.name || !newHabit.category) {
      toast.error('Please fill in all fields')
      return
    }

    await addHabit({
      ...newHabit,
      lastCompleted: null,
      createdAt: new Date().toISOString()
    })

    toast.success('Habit added successfully!')
    setNewHabit({ name: '', category: '', target: 1, streak: 0 })
    setShowForm(false)
  }

  const handleCompleteHabit = async (habitId) => {
    await updateHabitStreak(habitId)
    toast.success('Great job! Habit completed! 🎉')
  }

  const isCompletedToday = (habit) => {
    return habit.lastCompleted && isToday(new Date(habit.lastCompleted))
  }

  return (
    <div className="space-y-16">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 uppercase tracking-wider">
          HABIT
          <br />
          <span className="text-accent-green">TRACKER</span>
        </h1>
        <p className="text-xl text-gray-400">Build positive habits for better mental health</p>
      </motion.div>

      {/* Add Habit Button */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex justify-center"
      >
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-primary flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          ADD NEW HABIT
        </button>
      </motion.div>

      {/* Add Habit Form */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="card-dark"
        >
          <h2 className="text-3xl font-bold text-white mb-8 uppercase tracking-wider">Create New Habit</h2>
          <form onSubmit={handleAddHabit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Habit Name
              </label>
              <input
                type="text"
                value={newHabit.name}
                onChange={(e) => setNewHabit({ ...newHabit, name: e.target.value })}
                placeholder="e.g., Morning meditation, Daily walk"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={newHabit.category}
                onChange={(e) => setNewHabit({ ...newHabit, category: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              >
                <option value="">Select a category</option>
                {Object.entries(HABIT_CATEGORIES).map(([key, value]) => (
                  <option key={key} value={key}>{value}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Daily Target
              </label>
              <input
                type="number"
                min="1"
                value={newHabit.target}
                onChange={(e) => setNewHabit({ ...newHabit, target: parseInt(e.target.value) })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div className="flex space-x-3">
              <button
                type="submit"
                className="flex-1 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors"
              >
                Add Habit
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Habits List */}
      {habits.length > 0 ? (
        <div className="space-y-4">
          {Object.entries(HABIT_CATEGORIES).map(([categoryKey, categoryName]) => {
            const categoryHabits = habits.filter(habit => habit.category === categoryKey)
            
            if (categoryHabits.length === 0) return null

            return (
              <motion.div
                key={categoryKey}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-effect p-6 rounded-xl"
              >
                <h2 className="text-lg font-semibold mb-4 text-gray-800">
                  {categoryName}
                </h2>
                <div className="space-y-3">
                  {categoryHabits.map((habit) => (
                    <div
                      key={habit.id}
                      className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() => handleCompleteHabit(habit.id)}
                          disabled={isCompletedToday(habit)}
                          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                            isCompletedToday(habit)
                              ? 'bg-green-500 text-white'
                              : 'border-2 border-gray-300 hover:border-green-500 hover:bg-green-50'
                          }`}
                        >
                          {isCompletedToday(habit) && <Check className="w-5 h-5" />}
                        </button>
                        
                        <div>
                          <h3 className="font-medium text-gray-900">{habit.name}</h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center">
                              <Flame className="w-4 h-4 mr-1 text-orange-500" />
                              {habit.streak} day streak
                            </div>
                            {habit.lastCompleted && (
                              <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-1" />
                                Last: {format(new Date(habit.lastCompleted), 'MMM d')}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-lg font-semibold text-gray-900">
                          {isCompletedToday(habit) ? '✅' : '⏳'}
                        </div>
                        <div className="text-xs text-gray-500">
                          Target: {habit.target}/day
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <Target className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No habits yet</h3>
          <p className="text-gray-500 mb-6">Start building positive habits for better mental health</p>
          <button
            onClick={() => setShowForm(true)}
            className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
          >
            Add Your First Habit
          </button>
        </motion.div>
      )}

      {/* Habit Suggestions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-effect p-6 rounded-xl"
      >
        <h2 className="text-lg font-semibold mb-4">Suggested Mental Health Habits</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { name: '10-minute meditation', category: 'Mental Health' },
            { name: '30-minute walk', category: 'Physical Health' },
            { name: 'Gratitude journaling', category: 'Mental Health' },
            { name: 'Call a friend', category: 'Social Connection' },
            { name: 'Deep breathing exercises', category: 'Mental Health' },
            { name: 'Read for 20 minutes', category: 'Self Care' }
          ].map((suggestion, index) => (
            <div key={index} className="p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="font-medium text-blue-900">{suggestion.name}</div>
              <div className="text-sm text-blue-600">{suggestion.category}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}