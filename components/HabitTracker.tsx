'use client'

import React, { startTransition } from "react"
import { HabitCard } from "./HabitCard"
import { HabitForm } from "./HabitForm"
import { createHabit, updateHabitDay, deleteHabit } from "@/app/actions/habits"
import { useOptimistic } from "react"

interface Habit {
  id: string
  name: string
  checkedDays: Set<string>
}

interface Props {
  initialHabits: Habit[]
}

type OptimisticAction = 
  | { type: 'add'; habit: Habit }
  | { type: 'toggle'; habitId: string; date: string }
  | { type: 'delete'; habitId: string }

export function HabitTracker({ initialHabits }: Props) {
  const [newHabitName, setNewHabitName] = React.useState('')
  
  const [optimisticHabits, addOptimisticAction] = useOptimistic<
    Habit[],OptimisticAction>(initialHabits, (state, action) => {
    switch (action.type) {
      case 'add':
        return [...state, action.habit]
      case 'toggle':
        return state.map(habit => {
          if (habit.id === action.habitId) {
            const newCheckedDays = new Set(habit.checkedDays)
            if (newCheckedDays.has(action.date)) {
              newCheckedDays.delete(action.date)
            } else {
              newCheckedDays.add(action.date)
            }
            return { ...habit, checkedDays: newCheckedDays }
          }
          return habit
        })
      case 'delete':
        return state.filter(h => h.id !== action.habitId)
      default:
        return state
    }
  })

  const addHabit = async () => {
    if (newHabitName.trim()) {
      const newHabit: Habit = {
        id: Date.now().toString(),
        name: newHabitName.trim(),
        checkedDays: new Set(),
      }
      
      startTransition(() => {
        addOptimisticAction({ type: 'add', habit: newHabit })
      })
      
      try {
        await createHabit(newHabitName.trim())
        setNewHabitName('')
      } catch (error) {
        console.error('Failed to create habit:', error)
        // You might want to add error handling UI here
      }
    }
  }

  const toggleDay = async (habitId: string, date: string) => {
    startTransition(() => {
      addOptimisticAction({ type: 'toggle', habitId, date })
    })

    try {
      const habit = optimisticHabits.find(h => h.id === habitId)
      if (!habit) return
      
      const isChecked = habit.checkedDays.has(date)
      await updateHabitDay(habitId, date, !isChecked)
    } catch (error) {
      console.error('Failed to update habit:', error)
      // Revert the optimistic update if needed
    }
  }

  const removeHabit = async (habitId: string) => {
    startTransition(() => {
      addOptimisticAction({ type: 'delete', habitId })
    })
    
    try {
      await deleteHabit(habitId)
    } catch (error) {
      console.error('Failed to delete habit:', error)
      // You might want to add error handling UI here
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Habit Tracker</h1>
      <HabitForm
        newHabitName={newHabitName}
        setNewHabitName={setNewHabitName}
        addHabit={addHabit}
      />
    
      <div className="grid grid-cols-2 md:grid-cols-2 gap-8">
      {optimisticHabits.map(habit => (
        <HabitCard
          key={habit.id}
          habit={habit}
          onToggleDay={toggleDay}
          onDelete={removeHabit}
        />
      ))}
      </div>
    </div> 
  )
}