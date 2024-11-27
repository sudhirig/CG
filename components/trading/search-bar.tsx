"use client"

import { useState } from "react"
import { Search } from 'lucide-react'
import { Input } from "@/components/ui/input"

export function SearchBar() {
  const [query, setQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement search functionality
    console.log("Searching for:", query)
  }

  return (
    <form onSubmit={handleSearch} className="relative w-64">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
      <Input
        type="search"
        placeholder="Search stocks..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="bg-[#383838] pl-8 text-sm text-white placeholder:text-gray-500 focus-visible:ring-1 focus-visible:ring-gray-700"
      />
    </form>
  )
}

