import { SignInButton } from '@clerk/nextjs';
import { HabitTracker } from "@/components/HabitTracker";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import DemoHabit from './DemoHabit';

// const exampleHabit = {
//   id: 'example',
//   name: 'Daily Exercise',
//   checkedDays: new Set(['2023-04-01', '2023-04-02', '2023-04-03', '2023-04-05', '2023-04-07', '2023-04-08', '2023-04-10', '2023-04-12', '2023-04-14', '2023-04-15'])
// };

export default function GuestPage() {
  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Welcome to Habit Tracker</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Track your habits and build a better you! Sign in to create and manage your own habits.</p>
          <SignInButton mode="modal">
            <Button>Sign In</Button>
          </SignInButton>
        </CardContent>
      </Card>

      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Example Habit</h2>
        <p className="text-sm text-gray-600 mb-4">Here's an example of how your habit tracker could look:</p>
        <DemoHabit />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Features</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-2">
            <li>Create multiple habits to track</li>
            <li>Mark your progress daily</li>
            <li>View your habits at a glance</li>
            <li>Stay motivated and build consistency</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

