"use client"

import { getMonthName } from "@/lib/dateUtils";
import { format } from "date-fns";
import { Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";

interface Habit {
  id: string;
  name: string;
  checkedDays: Set<string>;
}

const getDaysInMonth = (date: Date): Date[] => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  return Array.from({ length: daysInMonth }, (_, i) => 
    new Date(year, month, i + 1)
  );
};

export const HabitCard = ({
  habit,
  onToggleDay,
  onDelete
}: {
  habit: Habit;
  onToggleDay: (habitId: string, date: string) => void;
  onDelete: (habitId: string) => void;
}) => {
  const currentDate = new Date();
  const daysInMonth = getDaysInMonth(currentDate);
  const monthName = getMonthName(currentDate);

  return (
    <Card className="mb-4">
      <CardHeader className="py-2 flex flex-row items-center justify-between">
        <CardTitle className="text-lg">{habit.name}</CardTitle>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => onDelete(habit.id)}
          className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-100"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="py-2">
        <div className="text-sm font-medium mb-2">{monthName}</div>
        <div className="grid grid-cols-7 gap-1">
          {daysInMonth.map(day => {
            const dateStr = format(day, 'yyyy-MM-dd');
            const dayNum = day.getDate();
            const isToday = format(currentDate, 'yyyy-MM-dd') === dateStr;
            
            return (
              <Button
                key={dateStr}
                variant={habit.checkedDays.has(dateStr) ? "default" : "outline"}
                size="sm"
                className={`aspect-square ${
                  isToday ? 'ring-2 ring-offset-1 ring-blue-500' : ''
                }`}
                onClick={() => onToggleDay(habit.id, dateStr)}
              >
                {dayNum}
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};