import Dexie from 'dexie';

export const db = new Dexie('MindWellDB');

db.version(1).stores({
  moods: '++id, date, mood, intensity, notes, triggers, activities',
  habits: '++id, name, category, streak, lastCompleted, target',
  journal: '++id, date, content, mood, tags',
  goals: '++id, title, description, category, progress, deadline, completed'
});

export const MOOD_TYPES = {
  HAPPY: { name: 'Happy', color: '#f97316', emoji: '😊' },
  SAD: { name: 'Sad', color: '#6366f1', emoji: '😢' },
  ANXIOUS: { name: 'Anxious', color: '#f59e0b', emoji: '😰' },
  CALM: { name: 'Calm', color: '#10b981', emoji: '😌' },
  ANGRY: { name: 'Angry', color: '#ef4444', emoji: '😠' },
  EXCITED: { name: 'Excited', color: '#8b5cf6', emoji: '🤩' }
};

export const HABIT_CATEGORIES = {
  PHYSICAL: 'Physical Health',
  MENTAL: 'Mental Health',
  SOCIAL: 'Social Connection',
  PRODUCTIVITY: 'Productivity',
  SELF_CARE: 'Self Care'
};

export const CRISIS_RESOURCES = [
  {
    name: 'National Suicide Prevention Lifeline',
    phone: '988',
    description: '24/7 crisis support'
  },
  {
    name: 'Crisis Text Line',
    phone: 'Text HOME to 741741',
    description: 'Free 24/7 crisis counseling'
  },
  {
    name: 'SAMHSA National Helpline',
    phone: '1-800-662-4357',
    description: 'Mental health and substance abuse'
  }
];