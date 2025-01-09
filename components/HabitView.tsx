'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { Card, CardHeader, CardTitle, CardContent } from './ui/card'
import { Button } from './ui/button'
import { Calendar, Trophy, TrendingUp, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface Habit {
  id: string
  name: string
  checkedDays: Set<string>
  createdAt: Date
  userId: string
}

interface HabitViewProps {
  initialHabit: Habit
}

const HabitView = ({ initialHabit }: HabitViewProps) => {
  const [habit] = useState(initialHabit)

  // Convert checkedDays Set to sorted array
  const checkedDaysArray = Array.from(habit.checkedDays)
    .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())

  const totalCompletions = checkedDaysArray.length
  const lastCompleted = checkedDaysArray.length > 0 
    ? new Date(checkedDaysArray[0])
    : null

  // Calculate completion rate
  const daysSinceCreation = Math.ceil(
    (new Date().getTime() - new Date(habit.createdAt).getTime()) / (1000 * 60 * 60 * 24)
  )
  const completionRate = Math.round((totalCompletions / daysSinceCreation) * 100)

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          size="sm" 
          asChild 
          className="mr-4"
        >
          <Link href="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Habits
          </Link>
        </Button>
      </div>

      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">{habit.name}</h1>
        <p className="text-gray-600">
          Started on {format(new Date(habit.createdAt), 'MMMM d, yyyy')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Completions</CardTitle>
            <Trophy className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCompletions}</div>
            <p className="text-sm text-gray-600">
              {completionRate}% completion rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {calculateStreak(checkedDaysArray)} days
            </div>
            <p className="text-sm text-gray-600">Keep it going!</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Last Completed</CardTitle>
            <Calendar className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {lastCompleted 
                ? format(lastCompleted, 'MMM d')
                : 'Never'}
            </div>
            {lastCompleted && (
              <p className="text-sm text-gray-600">
                {format(lastCompleted, 'EEEE')}
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Completions</CardTitle>
        </CardHeader>
        <CardContent>
          {checkedDaysArray.length === 0 ? (
            <p className="text-gray-500 text-center py-4">
              No completions recorded yet. Start building your streak!
            </p>
          ) : (
            <div className="space-y-2">
              {checkedDaysArray.slice(0, 30).map((date) => (
                <div 
                  key={date} 
                  className="flex items-center justify-between border-b py-2"
                >
                  <span className="font-medium">
                    {format(new Date(date), 'EEEE, MMMM d')}
                  </span>
                  <span className="text-green-500 font-medium">
                    Completed
                  </span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

// Helper function to calculate current streak
function calculateStreak(dates: string[]): number {
  if (dates.length === 0) return 0
  
  let streak = 1
  let currentDate = new Date(dates[0])
  currentDate.setHours(0, 0, 0, 0)
  
  for (let i = 1; i < dates.length; i++) {
    const nextDate = new Date(dates[i])
    nextDate.setHours(0, 0, 0, 0)
    
    const diffInDays = Math.round(
      (currentDate.getTime() - nextDate.getTime()) / (1000 * 60 * 60 * 24)
    )
    
    if (diffInDays === 1) {
      streak++
      currentDate = nextDate
    } else {
      break
    }
  }
  
  return streak
}

export default HabitView