import { HabitTracker } from "@/components/HabitTracker";
import Image from "next/image";

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <HabitTracker />
    </main>
  );
}
