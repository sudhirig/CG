"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatNumber } from "@/lib/utils"

interface WatchlistItem {
  symbol: string;
  ltp: number;
  change: number;
  changePercent: number;
  volume: number;
}

const mockWatchlist: WatchlistItem[] = [
  { symbol: "AAPL", ltp: 150.25, change: 2.5, changePercent: 1.69, volume: 1000000 },
  { symbol: "GOOGL", ltp: 2800.75, change: -15.25, changePercent: -0.54, volume: 500000 },
  { symbol: "MSFT", ltp: 300.50, change: 5.75, changePercent: 1.95, volume: 750000 },
]

export function WatchlistComponent() {
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>(mockWatchlist)

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Watchlist</CardTitle>
        <Button variant="outline" size="sm">Add Symbol</Button>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Input placeholder="Search watchlist" />
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Symbol</TableHead>
              <TableHead className="text-right">LTP</TableHead>
              <TableHead className="text-right">Change</TableHead>
              <TableHead className="text-right">Volume</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {watchlist.map((item) => (
              <TableRow key={item.symbol}>
                <TableCell>{item.symbol}</TableCell>
                <TableCell className="text-right">{formatNumber(item.ltp)}</TableCell>
                <TableCell className={`text-right ${item.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {formatNumber(item.change)} ({item.changePercent.toFixed(2)}%)
                </TableCell>
                <TableCell className="text-right">{formatNumber(item.volume)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

