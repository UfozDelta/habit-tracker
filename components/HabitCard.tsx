'use client'

import { Fullscreen, Trash2 } from "lucide-react"
import { Button } from "./ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card"
import Link from "next/link"
import { addDays, format, subDays } from "date-fns"
import { useState } from "react"

interface Habit {
  id: string
  name: string
  checkedDays: Set<string>
}

const generateLastThirtyDays = (): Date[] => {
  const today = new Date()
  return Array.from({ length: 30 }, (_, i) => {
    return subDays(today, 29 - i)
  })
}

export const HabitCard = ({
  habit,
  onToggleDay,
  onDelete
}: {
  habit: Habit
  onToggleDay: (habitId: string, date: string) => void
  onDelete: (habitId: string) => void
}) => {
  const [isCornerHovered, setIsCornerHovered] = useState(false)
  const thirtyDays = generateLastThirtyDays()

  return (
    <div className="relative mb-4">
      {/* Invisible hover detection area in the corner */}
      <div 
        className="absolute -top-3 -right-8 w-12 h-12 z-10"
        onMouseEnter={() => setIsCornerHovered(true)}
        onMouseLeave={() => setIsCornerHovered(false)}
      >
        <Button
          variant="destructive"
          size="icon"
          onClick={() => onDelete(habit.id)}
          className={`h-8 w-8 rounded-full shadow-lg transition-opacity duration-200 ${
            isCornerHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      <Card>
        <CardHeader className="py-2 flex flex-row items-center justify-between">
          <CardTitle className="text-lg">{habit.name}</CardTitle>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-black-500 hover:text-black-700 hover:bg-gray-200"
            asChild
          >
            <Link href={`/habits/${habit.id}`}><Fullscreen /></Link>
          </Button>
        </CardHeader>
        <CardContent className="py-2">
          <div className="text-sm font-medium mb-2">
            Last 30 Days ({format(thirtyDays[0], 'MMM d')} - {format(thirtyDays[29], 'MMM d')})
          </div>
          <div className="grid grid-cols-6 gap-1">
            {thirtyDays.map((date, index) => {
              const dateStr = format(date, 'yyyy-MM-dd')
              const isChecked = habit.checkedDays.has(dateStr)
              
              return (
                <Button
                  key={dateStr}
                  variant={isChecked ? "default" : "outline"}
                  size="lg"
                  className="p-4"
                  onClick={() => onToggleDay(habit.id, dateStr)}
                >
                  {index + 1}
                </Button>
              )
            })}
          </div>
          <div className="mt-2 text-xs text-gray-500">
            {habit.checkedDays.size} days completed in this period
          </div>
        </CardContent>
      </Card>
    </div>
  )
}