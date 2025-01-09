// app/habits/[habitId]/page.tsx
import HabitView from '@/components/HabitView'
import { getHabitById } from '@/app/actions/habits'
import { notFound } from 'next/navigation'

interface HabitPageProps {
  params: {
    habitId: string
  }
}

export default async function HabitPage({ params }: HabitPageProps) {
  try {
    // Pre-fetch the habit data on the server
    const habit = await getHabitById(params.habitId)
    
    if (!habit) {
      return notFound()
    }

    return <HabitView initialHabit={habit} />
  } catch (error) {
    return notFound()
  }
}