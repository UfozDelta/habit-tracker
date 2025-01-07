import Guest from "@/components/Guest";
import { HabitTracker } from "@/components/HabitTracker";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import { getHabits } from "./actions/habits";

export default async function Home() {
  const user = await currentUser();
  

  if (!user) {
    return <Guest />;
  }

  // If valid user was found continue ..... 
  const habits = await getHabits()
  return (
    <main className="container mx-auto p-4">
      <HabitTracker initialHabits={habits}/>
    </main>
  );
}
