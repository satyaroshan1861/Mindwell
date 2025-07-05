import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { db } from '../data/database';

export const useStore = create(
  persist(
    (set, get) => ({
      // User preferences
      user: {
        name: '',
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        notifications: true,
        darkMode: false
      },
      
      // Current mood tracking
      currentMood: null,
      moodHistory: [],
      
      // Habits
      habits: [],
      
      // Journal entries
      journalEntries: [],
      
      // Goals
      goals: [],
      
      // Actions
      setUser: (userData) => set((state) => ({
        user: { ...state.user, ...userData }
      })),
      
      addMoodEntry: async (moodData) => {
        const entry = {
          ...moodData,
          date: new Date().toISOString(),
          id: await db.moods.add(moodData)
        };
        set((state) => ({
          currentMood: entry,
          moodHistory: [entry, ...state.moodHistory]
        }));
      },
      
      addHabit: async (habit) => {
        const id = await db.habits.add(habit);
        set((state) => ({
          habits: [...state.habits, { ...habit, id }]
        }));
      },
      
      updateHabitStreak: async (habitId) => {
        const habit = get().habits.find(h => h.id === habitId);
        if (habit) {
          const updatedHabit = {
            ...habit,
            streak: habit.streak + 1,
            lastCompleted: new Date().toISOString()
          };
          await db.habits.update(habitId, updatedHabit);
          set((state) => ({
            habits: state.habits.map(h => 
              h.id === habitId ? updatedHabit : h
            )
          }));
        }
      },
      
      addJournalEntry: async (entry) => {
        const id = await db.journal.add(entry);
        set((state) => ({
          journalEntries: [{ ...entry, id }, ...state.journalEntries]
        }));
      },
      
      loadData: async () => {
        const [moods, habits, journal, goals] = await Promise.all([
          db.moods.orderBy('date').reverse().limit(30).toArray(),
          db.habits.toArray(),
          db.journal.orderBy('date').reverse().limit(20).toArray(),
          db.goals.toArray()
        ]);
        
        set({
          moodHistory: moods,
          habits,
          journalEntries: journal,
          goals
        });
      }
    }),
    {
      name: 'mindwell-storage',
      partialize: (state) => ({ user: state.user })
    }
  )
);