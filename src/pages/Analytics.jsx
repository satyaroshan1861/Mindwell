import React, { useMemo } from 'react'
import { motion } from 'framer-motion'
import { useStore } from '../store/useStore'
import { MOOD_TYPES } from '../data/database'
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts'
import { BarChart3, TrendingUp, Calendar, Target } from 'lucide-react'
import { format, subDays, isWithinInterval } from 'date-fns'

export default function Analytics() {
  const { moodHistory, habits, journalEntries } = useStore()

  // Mood trend data for the last 30 days
  const moodTrendData = useMemo(() => {
    const last30Days = Array.from({ length: 30 }, (_, i) => {
      const date = subDays(new Date(), 29 - i)
      const dayMoods = moodHistory.filter(mood => 
        format(new Date(mood.date), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
      )
      
      const avgIntensity = dayMoods.length > 0 
        ? dayMoods.reduce((sum, mood) => sum + mood.intensity, 0) / dayMoods.length
        : null

      return {
        date: format(date, 'MMM d'),
        intensity: avgIntensity,
        count: dayMoods.length
      }
    })
    
    return last30Days
  }, [moodHistory])

  // Mood distribution
  const moodDistribution = useMemo(() => {
    const distribution = {}
    moodHistory.forEach(mood => {
      distribution[mood.mood] = (distribution[mood.mood] || 0) + 1
    })
    
    return Object.entries(distribution).map(([mood, count]) => ({
      name: MOOD_TYPES[mood]?.name || mood,
      value: count,
      color: MOOD_TYPES[mood]?.color || '#8884d8'
    }))
  }, [moodHistory])

  // Habit completion rates
  const habitStats = useMemo(() => {
    return habits.map(habit => {
      const last7Days = Array.from({ length: 7 }, (_, i) => subDays(new Date(), i))
      const completedDays = last7Days.filter(day => {
        return habit.lastCompleted && 
               format(new Date(habit.lastCompleted), 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd')
      }).length

      return {
        name: habit.name,
        completionRate: (completedDays / 7) * 100,
        streak: habit.streak || 0
      }
    })
  }, [habits])

  // Weekly mood average
  const weeklyAverage = useMemo(() => {
    const lastWeekMoods = moodHistory.filter(mood => 
      isWithinInterval(new Date(mood.date), {
        start: subDays(new Date(), 7),
        end: new Date()
      })
    )
    
    return lastWeekMoods.length > 0
      ? lastWeekMoods.reduce((sum, mood) => sum + mood.intensity, 0) / lastWeekMoods.length
      : 0
  }, [moodHistory])

  // Journal activity
  const journalActivity = useMemo(() => {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = subDays(new Date(), 6 - i)
      const dayEntries = journalEntries.filter(entry =>
        format(new Date(entry.date), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
      )
      
      return {
        date: format(date, 'EEE'),
        entries: dayEntries.length,
        wordCount: dayEntries.reduce((sum, entry) => sum + entry.content.split(' ').length, 0)
      }
    })
    
    return last7Days
  }, [journalEntries])

  const stats = [
    {
      title: 'Weekly Mood Average',
      value: weeklyAverage.toFixed(1),
      subtitle: 'out of 10',
      icon: TrendingUp,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Total Mood Entries',
      value: moodHistory.length,
      subtitle: 'all time',
      icon: Calendar,
      color: 'from-purple-500 to-violet-500'
    },
    {
      title: 'Active Habits',
      value: habits.length,
      subtitle: 'being tracked',
      icon: Target,
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Journal Entries',
      value: journalEntries.length,
      subtitle: 'total written',
      icon: BarChart3,
      color: 'from-orange-500 to-red-500'
    }
  ]

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 uppercase tracking-wider">
          MENTAL
          <br />
          <span className="text-accent-green">ANALYTICS</span>
        </h1>
        <p className="text-xl text-gray-400">Insights into your mental wellness journey</p>
      </motion.div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-effect p-6 rounded-xl"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg bg-gradient-to-r ${stat.color}`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500">
                  {stat.subtitle}
                </div>
              </div>
            </div>
            <h3 className="font-semibold text-gray-700">
              {stat.title}
            </h3>
          </motion.div>
        ))}
      </div>

      {/* Mood Trend Chart */}
      {moodHistory.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-effect p-6 rounded-xl"
        >
          <h2 className="text-xl font-semibold mb-6">30-Day Mood Trend</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={moodTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[1, 10]} />
                <Tooltip 
                  formatter={(value) => [value ? value.toFixed(1) : 'No data', 'Mood Intensity']}
                />
                <Line 
                  type="monotone" 
                  dataKey="intensity" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                  connectNulls={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      )}

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Mood Distribution */}
        {moodDistribution.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass-effect p-6 rounded-xl"
          >
            <h2 className="text-xl font-semibold mb-6">Mood Distribution</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={moodDistribution}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {moodDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        )}

        {/* Journal Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass-effect p-6 rounded-xl"
        >
          <h2 className="text-xl font-semibold mb-6">Weekly Journal Activity</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={journalActivity}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="entries" fill="#8b5cf6" name="Entries" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Habit Performance */}
      {habits.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="glass-effect p-6 rounded-xl"
        >
          <h2 className="text-xl font-semibold mb-6">Habit Performance (Last 7 Days)</h2>
          <div className="space-y-4">
            {habitStats.map((habit, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">{habit.name}</h3>
                  <div className="text-sm text-gray-500">
                    {habit.streak} day streak
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-lg font-semibold text-gray-900">
                      {habit.completionRate.toFixed(0)}%
                    </div>
                    <div className="text-xs text-gray-500">completion</div>
                  </div>
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full transition-all"
                      style={{ width: `${habit.completionRate}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="glass-effect p-6 rounded-xl"
      >
        <h2 className="text-xl font-semibold mb-4">Insights</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="font-medium text-blue-900 mb-2">Most Common Mood</h3>
            <p className="text-blue-700 text-sm">
              {moodDistribution.length > 0 
                ? `${moodDistribution.sort((a, b) => b.value - a.value)[0]?.name} appears most frequently`
                : 'Not enough data yet'
              }
            </p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <h3 className="font-medium text-green-900 mb-2">Habit Success</h3>
            <p className="text-green-700 text-sm">
              {habits.length > 0
                ? `Average completion rate: ${(habitStats.reduce((sum, h) => sum + h.completionRate, 0) / habitStats.length).toFixed(0)}%`
                : 'Start tracking habits to see insights'
              }
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}