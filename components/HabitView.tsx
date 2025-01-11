'use client'

import { useState } from 'react'
import { format, addDays, subDays, differenceInDays, isWithinInterval } from 'date-fns'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar, Trophy, TrendingUp, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Progress } from '@/components/ui/progress'
import { HabitCardView } from './HabitCardView'

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

  const checkedDaysArray = Array.from(habit.checkedDays)
    .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())

  const generateLastThirtyDays = (): Date[] => {
    const today = new Date()
    return Array.from({ length: 30 }, (_, i) => {
      return subDays(today, 29 - i)
    })
  }

  const thirtyDays = generateLastThirtyDays()
  
  // Calculate completions only within the last 30 days
  const completionsInPeriod = checkedDaysArray.filter(date => {
    const checkDate = new Date(date)
    return isWithinInterval(checkDate, {
      start: thirtyDays[0],
      end: thirtyDays[29]
    })
  }).length

  // Calculate completion rate based on last 30 days
  const completionRate = Math.round((completionsInPeriod / 30) * 100)

  const lastCompleted = checkedDaysArray.length > 0 
    ? new Date(checkedDaysArray[0])
    : null

  return (
    <div className="min-h-screen p-8 bg-background">
      <div className="max-w-4xl mx-auto">
        <Button 
          variant="ghost" 
          size="sm" 
          asChild 
          className="mb-8"
        >
          <Link href="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Habits
          </Link>
        </Button>

        <Card className="mb-8">
          <CardContent className="pt-6">
            <h1 className="text-4xl font-bold mb-2">{habit.name}</h1>
            <p className="text-muted-foreground">
              Started on {format(new Date(habit.createdAt), 'MMMM d, yyyy')}
            </p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <StatsCard
            title="30-Day Completions"
            value={completionsInPeriod}
            icon={<Trophy className="h-5 w-5 text-yellow-500" />}
            subtext={`${completionRate}% completion rate`}
          >
            <Progress value={completionRate} className="mt-2" />
          </StatsCard>

          <StatsCard
            title="Current Streak"
            value={`${calculateStreak(checkedDaysArray)} days`}
            icon={<TrendingUp className="h-5 w-5 text-green-500" />}
            subtext="Keep it going!"
          />

          <StatsCard
            title="Last Completed"
            value={lastCompleted ? format(lastCompleted, 'MMM d') : 'Never'}
            icon={<Calendar className="h-5 w-5 text-blue-500" />}
            subtext={lastCompleted ? format(lastCompleted, 'EEEE') : ''}
          />
        </div>

        <HabitCardView
          habit={{
            id: habit.id,
            name: habit.name,
            checkedDays: habit.checkedDays,
          }}
        />
      </div>
    </div>
  )
}

const StatsCard = ({ title, value, icon, subtext, children }: any) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-sm text-muted-foreground">{subtext}</p>
      {children}
    </CardContent>
  </Card>
)

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