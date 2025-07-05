import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useStore } from '../store/useStore'
import { MOOD_TYPES } from '../data/database'
import { BookOpen, Plus, Search, Calendar, Heart } from 'lucide-react'
import { format } from 'date-fns'
import toast from 'react-hot-toast'

export default function Journal() {
  const { journalEntries, addJournalEntry } = useStore()
  const [showForm, setShowForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [newEntry, setNewEntry] = useState({
    content: '',
    mood: '',
    tags: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!newEntry.content.trim()) {
      toast.error('Please write something in your journal')
      return
    }

    await addJournalEntry({
      ...newEntry,
      date: new Date().toISOString(),
      tags: newEntry.tags.split(',').map(tag => tag.trim()).filter(Boolean)
    })

    toast.success('Journal entry saved!')
    setNewEntry({ content: '', mood: '', tags: '' })
    setShowForm(false)
  }

  const filteredEntries = journalEntries.filter(entry =>
    entry.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const journalPrompts = [
    "What am I grateful for today?",
    "What challenged me today and how did I handle it?",
    "What made me smile today?",
    "What would I tell my younger self?",
    "What are three things I accomplished today?",
    "How am I feeling right now and why?",
    "What do I need more of in my life?",
    "What patterns do I notice in my thoughts/feelings?"
  ]

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 uppercase tracking-wider">
          DIGITAL
          <br />
          <span className="text-accent-green">JOURNAL</span>
        </h1>
        <p className="text-xl text-gray-400">Express your thoughts and track your mental wellness journey</p>
      </motion.div>

      {/* Action Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-4 items-center justify-between"
      >
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search entries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          New Entry
        </button>
      </motion.div>

      {/* New Entry Form */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="glass-effect p-6 rounded-xl"
        >
          <h2 className="text-xl font-semibold mb-4">New Journal Entry</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                How are you feeling? (optional)
              </label>
              <div className="flex flex-wrap gap-2">
                {Object.entries(MOOD_TYPES).map(([key, mood]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setNewEntry({ ...newEntry, mood: key })}
                    className={`px-3 py-2 rounded-full text-sm border transition-all ${
                      newEntry.mood === key
                        ? 'bg-blue-500 text-white border-blue-500'
                        : 'border-gray-300 hover:border-blue-500'
                    }`}
                  >
                    {mood.emoji} {mood.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your thoughts
              </label>
              <textarea
                value={newEntry.content}
                onChange={(e) => setNewEntry({ ...newEntry, content: e.target.value })}
                placeholder="What's on your mind? How was your day? What are you feeling?"
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows="6"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags (comma-separated)
              </label>
              <input
                type="text"
                value={newEntry.tags}
                onChange={(e) => setNewEntry({ ...newEntry, tags: e.target.value })}
                placeholder="work, family, anxiety, gratitude"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex space-x-3">
              <button
                type="submit"
                className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Save Entry
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

      {/* Journal Prompts */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card-dark"
      >
        <h2 className="text-3xl font-bold text-white mb-8 uppercase tracking-wider">Writing Prompts</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {journalPrompts.map((prompt, index) => (
            <button
              key={index}
              onClick={() => {
                setNewEntry({ ...newEntry, content: prompt + '\n\n' })
                setShowForm(true)
              }}
              className="p-6 text-left bg-dark-700 border border-dark-700 hover:border-accent-green transition-all duration-300 text-white"
            >
              <div className="text-lg leading-relaxed">{prompt}</div>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Journal Entries */}
      {filteredEntries.length > 0 ? (
        <div className="space-y-6">
          {filteredEntries.map((entry, index) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="glass-effect p-6 rounded-xl"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-gray-500" />
                  <span className="text-sm text-gray-600">
                    {format(new Date(entry.date), 'EEEE, MMMM d, yyyy h:mm a')}
                  </span>
                  {entry.mood && (
                    <div className="flex items-center space-x-2">
                      <Heart className="w-4 h-4 text-red-500" />
                      <span className="text-sm">
                        {MOOD_TYPES[entry.mood]?.emoji} {MOOD_TYPES[entry.mood]?.name}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="prose prose-gray max-w-none mb-4">
                <p className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                  {entry.content}
                </p>
              </div>
              
              {entry.tags && entry.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {entry.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {searchTerm ? 'No entries found' : 'No journal entries yet'}
          </h3>
          <p className="text-gray-500 mb-6">
            {searchTerm 
              ? 'Try adjusting your search terms'
              : 'Start writing to track your thoughts and feelings'
            }
          </p>
          {!searchTerm && (
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Write Your First Entry
            </button>
          )}
        </motion.div>
      )}
    </div>
  )
}