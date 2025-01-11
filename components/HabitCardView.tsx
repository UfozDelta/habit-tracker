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

export const HabitCardView = ({
  habit,
}: {
  habit: Habit
}) => {
  const [isCornerHovered, setIsCornerHovered] = useState(false)
  const thirtyDays = generateLastThirtyDays()

  return (
    <div className="relative mb-4">
      {/* Invisible hover detection area in the corner */}
      <Card>
        <CardHeader className="py-2 flex flex-row items-center justify-between">
          <CardTitle className="text-lg">{habit.name}</CardTitle>
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