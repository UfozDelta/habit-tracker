"use client"

import React from "react";
import { HabitCard } from "./HabitCard";
import { HabitForm } from "./HabitForm";

interface Habit {
    id: string;
    name: string;
    checkedDays: Set<string>;
  }
  
export function HabitTracker() {
    const [habits, setHabits] = React.useState<Habit[]>([]);
    const [newHabitName, setNewHabitName] = React.useState('');
  
    const addHabit = () => {
      if (newHabitName.trim()) {
        const newHabit: Habit = {
          id: Date.now().toString(),
          name: newHabitName.trim(),
          checkedDays: new Set(),
        };
        setHabits([...habits, newHabit]);
        setNewHabitName('');
      }
    };
  
    const toggleDay = (habitId: string, date: string) => {
      setHabits(habits.map(habit => {
        if (habit.id === habitId) {
          const newCheckedDays = new Set(habit.checkedDays);
          if (newCheckedDays.has(date)) {
            newCheckedDays.delete(date);
          } else {
            newCheckedDays.add(date);
          }
          return { ...habit, checkedDays: newCheckedDays };
        }
        return habit;
      }));
    };
  
    const deleteHabit = (habitId: string) => {
      setHabits(habits.filter(habit => habit.id !== habitId));
    };
  
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Habit Tracker</h1>
        <HabitForm
          newHabitName={newHabitName}
          setNewHabitName={setNewHabitName}
          addHabit={addHabit}
        />
        {habits.map(habit => (
          <HabitCard
            key={habit.id}
            habit={habit}
            onToggleDay={toggleDay}
            onDelete={deleteHabit}
          />
        ))}
      </div>
    );
  }
  
  export default HabitTracker;