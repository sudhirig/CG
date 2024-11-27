"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Bell, ChevronDown, Menu, Moon, Search, Settings, Sun, X } from 'lucide-react'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Watchlist } from "./watchlist"
import { MarketStatus } from "./market-status"

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/orders", label: "Orders" },
  { href: "/holdings", label: "Holdings" },
  { href: "/positions", label: "Positions" },
  { href: "/bids", label: "Bids" },
  { href: "/funds", label: "Funds" },
]

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = React.useState(false)
  //const [darkMode, setDarkMode] = React.useState(false)

  //React.useEffect(() => {
  //  if (darkMode) {
  //    document.documentElement.classList.add('dark')
  //  } else {
  //    document.documentElement.classList.remove('dark')
  //  }
  //}, [darkMode])

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground dark">
      <header className="sticky top-0 z-50 flex h-16 items-center border-b bg-background px-4">
        <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
          <Menu className="h-6 w-6" />
        </Button>
        <Link href="/" className="flex items-center gap-2 lg:w-60">
          <div className="h-6 w-6 rounded bg-primary" />
          <span className="font-semibold">Capital Global</span>
        </Link>
        <MarketStatus className="ml-4" />
        <nav className="hidden lg:flex lg:gap-6 lg:px-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium",
                pathname === item.href
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left
-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-[200px] pl-8"
            />
          </div>
          {/*<Button variant="ghost" size="icon" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>*/}
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-2"
              >
                <span>Account</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-48"
            >
              <DropdownMenuItem>
                <Link href="/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem className="text-red-500">
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <div className="flex flex-1">
        <aside className={cn(
          "fixed inset-y-0 left-0 z-50 w-60 transform border-r bg-background transition-transform duration-300 ease-in-out lg:static lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          <div className="flex h-16 items-center justify-between border-b px-4 lg:hidden">
            <span className="font-semibold">Menu</span>
            <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)}>
              <X className="h-6 w-6" />
            </Button>
          </div>
          <Watchlist />
        </aside>
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto py-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

