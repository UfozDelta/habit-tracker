'use server'

import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"

export async function getHabits() {
  const { userId: clerkId } = await auth()
  if (!clerkId) throw new Error("Unauthorized")

  const habits = await db.habit.findMany({
    where: {
      userId: clerkId // Using clerkId to match the schema
    },
    orderBy: {
      createdAt: 'asc'
    }
  })

  return habits.map(habit => ({
    ...habit,
    checkedDays: new Set(habit.checkedDays)
  }))
}

export async function createHabit(name: string) {
  const { userId: clerkId } = await auth()
  if (!clerkId) throw new Error("Unauthorized")

  await db.habit.create({
    data: {
      name,
      checkedDays: [],
      userId: clerkId // Using clerkId to match the schema
    }
  })

  revalidatePath('/habits')
}

export async function updateHabitDay(habitId: string, date: string, checked: boolean) {
  const { userId: clerkId } = await auth()
  if (!clerkId) throw new Error("Unauthorized")

  const habit = await db.habit.findFirst({
    where: {
      id: habitId,
      userId: clerkId // Add userId check in the query
    }
  })

  if (!habit) throw new Error("Unauthorized")

  const newCheckedDays = checked 
    ? [...habit.checkedDays, date]
    : habit.checkedDays.filter(d => d !== date)

  await db.habit.update({
    where: {
      id: habitId,
    },
    data: {
      checkedDays: newCheckedDays
    }
  })

  revalidatePath('/habits')
}

export async function deleteHabit(habitId: string) {
  const { userId: clerkId } = await auth()
  if (!clerkId) throw new Error("Unauthorized")

  await db.habit.delete({
    where: {
      id: habitId,
      userId: clerkId // Add userId check in the query
    }
  })

  revalidatePath('/habits')
}