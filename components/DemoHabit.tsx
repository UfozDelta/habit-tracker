"use client"
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

const getDaysInMonth = (date: Date): Date[] => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  return Array.from({ length: daysInMonth }, (_, i) => 
    new Date(year, month, i + 1)
  );
};

const getMonthName = (date: Date) => {
  return date.toLocaleString('default', { month: 'long' });
};

export default function DemoHabit() {
  const [checkedDays, setCheckedDays] = React.useState(new Set([
    format(new Date(new Date().getFullYear(), new Date().getMonth(), 1), 'yyyy-MM-dd'),
    format(new Date(new Date().getFullYear(), new Date().getMonth(), 3), 'yyyy-MM-dd'),
    format(new Date(new Date().getFullYear(), new Date().getMonth(), 4), 'yyyy-MM-dd'),
    format(new Date(new Date().getFullYear(), new Date().getMonth(), 7), 'yyyy-MM-dd'),
  ]));

  const currentDate = new Date();
  const daysInMonth = getDaysInMonth(currentDate);
  const monthName = getMonthName(currentDate);

  const toggleDay = (dateStr: string) => {
    const newCheckedDays = new Set(checkedDays);
    if (newCheckedDays.has(dateStr)) {
      newCheckedDays.delete(dateStr);
    } else {
      newCheckedDays.add(dateStr);
    }
    setCheckedDays(newCheckedDays);
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <Card className="bg-white shadow-lg">
        <CardHeader className="py-2 flex flex-row items-center justify-between bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardTitle className="text-lg font-semibold text-gray-800">🏃‍♂️ Daily Exercise (Example)</CardTitle>
          <div className="text-sm text-blue-600 bg-blue-100 px-2 py-1 rounded-full">Demo</div>
        </CardHeader>
        <CardContent className="py-4">
          <div className="text-sm font-medium mb-2 text-gray-600">{monthName}</div>
          <div className="grid grid-cols-7 gap-1">
            {daysInMonth.map(day => {
              const dateStr = format(day, 'yyyy-MM-dd');
              const dayNum = day.getDate();
              const isToday = format(currentDate, 'yyyy-MM-dd') === dateStr;
              const isChecked = checkedDays.has(dateStr);
              
              return (
                <Button
                  key={dateStr}
                  variant={isChecked ? "default" : "outline"}
                  size="sm"
                  className={`
                    ${isToday ? 'ring-2 ring-offset-1 ring-blue-500' : ''}
                    ${isChecked ? 'bg-black hover:bg-black': ''}
                  `}
                  onClick={() => toggleDay(dateStr)}
                >
                  {dayNum}
                </Button>
              );
            })}
          </div>
          <div className="mt-4 text-sm text-gray-500">
            Click on any date to see how habit tracking works!
          </div>
        </CardContent>
      </Card>
    </div>
  );
}