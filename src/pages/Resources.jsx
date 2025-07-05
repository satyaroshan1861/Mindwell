import React from 'react'
import { motion } from 'framer-motion'
import { 
  Phone, 
  MessageCircle, 
  ExternalLink, 
  Heart,
  AlertTriangle,
  BookOpen,
  Users,
  Brain
} from 'lucide-react'
import { CRISIS_RESOURCES } from '../data/database'

const mentalHealthResources = [
  {
    category: 'Crisis Support',
    icon: AlertTriangle,
    color: 'from-red-500 to-pink-500',
    resources: CRISIS_RESOURCES
  },
  {
    category: 'Therapy & Counseling',
    icon: Brain,
    color: 'from-blue-500 to-cyan-500',
    resources: [
      {
        name: 'BetterHelp',
        description: 'Online therapy platform',
        link: 'https://betterhelp.com'
      },
      {
        name: 'Psychology Today',
        description: 'Find local therapists',
        link: 'https://psychologytoday.com'
      },
      {
        name: 'NAMI',
        description: 'National Alliance on Mental Illness',
        link: 'https://nami.org'
      }
    ]
  },
  {
    category: 'Self-Help & Education',
    icon: BookOpen,
    color: 'from-green-500 to-emerald-500',
    resources: [
      {
        name: 'Headspace',
        description: 'Meditation and mindfulness',
        link: 'https://headspace.com'
      },
      {
        name: 'Calm',
        description: 'Sleep stories and meditation',
        link: 'https://calm.com'
      },
      {
        name: 'MindShift',
        description: 'Anxiety management app',
        link: 'https://anxietycanada.com/resources/mindshift-app'
      }
    ]
  },
  {
    category: 'Support Communities',
    icon: Users,
    color: 'from-purple-500 to-violet-500',
    resources: [
      {
        name: '7 Cups',
        description: 'Free emotional support',
        link: 'https://7cups.com'
      },
      {
        name: 'Reddit Mental Health',
        description: 'Community support forums',
        link: 'https://reddit.com/r/mentalhealth'
      },
      {
        name: 'Support Groups Central',
        description: 'Find local support groups',
        link: 'https://supportgroupscentral.com'
      }
    ]
  }
]

const copingStrategies = [
  {
    title: 'Deep Breathing',
    description: '4-7-8 technique: Inhale for 4, hold for 7, exhale for 8',
    icon: '🫁'
  },
  {
    title: 'Grounding (5-4-3-2-1)',
    description: '5 things you see, 4 you touch, 3 you hear, 2 you smell, 1 you taste',
    icon: '🌱'
  },
  {
    title: 'Progressive Muscle Relaxation',
    description: 'Tense and release muscle groups from toes to head',
    icon: '💪'
  },
  {
    title: 'Mindful Walking',
    description: 'Focus on each step and your surroundings',
    icon: '🚶'
  },
  {
    title: 'Journaling',
    description: 'Write down thoughts and feelings without judgment',
    icon: '📝'
  },
  {
    title: 'Cold Water',
    description: 'Splash cold water on face or hold ice cubes',
    icon: '❄️'
  }
]

export default function Resources() {
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
          <span className="text-accent-green">RESOURCES</span>
        </h1>
        <p className="text-xl text-gray-400">Support and tools for your mental wellness journey</p>
      </motion.div>

      {/* Crisis Alert */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg"
      >
        <div className="flex items-center mb-3">
          <AlertTriangle className="w-6 h-6 text-red-500 mr-2" />
          <h2 className="text-lg font-semibold text-red-800">
            In Crisis? Get Immediate Help
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-3">
            <Phone className="w-5 h-5 text-red-600" />
            <div>
              <div className="font-semibold text-red-800">Call 988</div>
              <div className="text-red-700 text-sm">Suicide & Crisis Lifeline</div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <MessageCircle className="w-5 h-5 text-red-600" />
            <div>
              <div className="font-semibold text-red-800">Text HOME to 741741</div>
              <div className="text-red-700 text-sm">Crisis Text Line</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Resource Categories */}
      <div className="space-y-8">
        {mentalHealthResources.map((category, categoryIndex) => (
          <motion.div
            key={category.category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + categoryIndex * 0.1 }}
            className="glass-effect p-6 rounded-xl"
          >
            <div className="flex items-center mb-6">
              <div className={`p-3 rounded-lg bg-gradient-to-r ${category.color} mr-4`}>
                <category.icon className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-xl font-semibold">{category.category}</h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {category.resources.map((resource, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">{resource.name}</h3>
                    {resource.link && (
                      <a
                        href={resource.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{resource.description}</p>
                  {resource.phone && (
                    <div className="flex items-center text-sm text-gray-700">
                      <Phone className="w-4 h-4 mr-1" />
                      {resource.phone}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Coping Strategies */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="glass-effect p-6 rounded-xl"
      >
        <h2 className="text-xl font-semibold mb-6 flex items-center">
          <Brain className="w-6 h-6 mr-2" />
          Quick Coping Strategies
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {copingStrategies.map((strategy, index) => (
            <motion.div
              key={strategy.title}
              className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border border-blue-100"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="text-2xl mb-2">{strategy.icon}</div>
              <h3 className="font-semibold text-gray-900 mb-2">{strategy.title}</h3>
              <p className="text-gray-600 text-sm">{strategy.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Disclaimer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-yellow-800"
      >
        <strong>Disclaimer:</strong> This app is not a substitute for professional medical advice, diagnosis, or treatment. 
        If you're experiencing a mental health crisis or having thoughts of self-harm, please contact emergency services 
        or a mental health professional immediately.
      </motion.div>
    </div>
  )
}