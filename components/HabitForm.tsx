"use client"
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Habit {
  id: string;
  name: string;
  checkedDays: Set<string>;
}

// HabitForm Component
export const HabitForm = ({ 
  newHabitName, 
  setNewHabitName, 
  addHabit 
}: { 
  newHabitName: string;
  setNewHabitName: (name: string) => void;
  addHabit: () => void;
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addHabit();
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
      <Input
        type="text"
        value={newHabitName}
        onChange={(e) => setNewHabitName(e.target.value)}
        placeholder="Enter new habit name"
        className="flex-grow"
      />
      <Button type="submit">Add Habit</Button>
    </form>
  );
};