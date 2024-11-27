import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <h1 className="mb-8 text-4xl font-bold text-foreground">Welcome to Capital Global</h1>
      <Link href="/dashboard">
        <Button size="lg">Go to Trading Dashboard</Button>
      </Link>
    </div>
  )
}

