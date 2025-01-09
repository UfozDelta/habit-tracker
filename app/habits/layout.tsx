// app/habit/layout.tsx
export default function HabitLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return <div className="container mx-auto">{children}</div>
  }