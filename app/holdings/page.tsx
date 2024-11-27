"use client"

import { DashboardLayout } from "@/components/trading/dashboard-layout"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { formatMoney, formatNumber } from "@/lib/utils"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { CSVLink } from "react-csv";
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const holdings = [
  { instrument: "RELIANCE", quantity: 10, avgCost: 2400, ltp: 2500, currentValue: 25000, pnl: 1000, dayChange: 2.5, overallReturn: 4.17 },
  { instrument: "TCS", quantity: 5, avgCost: 3100, ltp: 3200, currentValue: 16000, pnl: 500, dayChange: 1.8, overallReturn: 3.23 },
  { instrument: "INFY", quantity: 15, avgCost: 1250, ltp: 1300, currentValue: 19500, pnl: 750, dayChange: -0.5, overallReturn: 4.00 },
]

const AssetDetails = ({ asset }) => (
  <Dialog>
    <DialogTrigger asChild>
      <Button variant="link">{asset.instrument}</Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{asset.instrument} Details</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4">
        <div className="grid grid-cols-2 items-center gap-4">
          <span className="font-medium">Quantity:</span>
          <span>{asset.quantity}</span>
        </div>
        <div className="grid grid-cols-2 items-center gap-4">
          <span className="font-medium">Average Cost:</span>
          <span>{formatMoney(asset.avgCost)}</span>
        </div>
        <div className="grid grid-cols-2 items-center gap-4">
          <span className="font-medium">Current Value:</span>
          <span>{formatMoney(asset.currentValue)}</span>
        </div>
        <div className="grid grid-cols-2 items-center gap-4">
          <span className="font-medium">P&L:</span>
          <span className={asset.pnl >= 0 ? 'text-green-500' : 'text-red-500'}>
            {formatMoney(asset.pnl)}
          </span>
        </div>
      </div>
    </DialogContent>
  </Dialog>
);

export default function HoldingsPage() {
  const [sortBy, setSortBy] = useState("instrument");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filter, setFilter] = useState("");

  const sortedAndFilteredHoldings = holdings
    .filter(holding => holding.instrument.toLowerCase().includes(filter.toLowerCase()))
    .sort((a, b) => {
      if (a[sortBy] < b[sortBy]) return sortOrder === "asc" ? -1 : 1;
      if (a[sortBy] > b[sortBy]) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

  const totalCurrentValue = sortedAndFilteredHoldings.reduce((sum, holding) => sum + holding.currentValue, 0)
  const totalPnL = sortedAndFilteredHoldings.reduce((sum, holding) => sum + holding.pnl, 0)
  const totalInvestment = sortedAndFilteredHoldings.reduce((sum, holding) => sum + holding.avgCost * holding.quantity, 0)
  const overallReturn = (totalPnL / totalInvestment) * 100

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Holdings</h1>
          <Button>Add funds</Button>
          <CSVLink
            data={holdings}
            filename={"holdings.csv"}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
          >
            Export CSV
          </CSVLink>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg bg-gray-800 p-4">
            <h2 className="text-sm text-gray-400">Current value</h2>
            <p className="text-2xl font-bold">{formatMoney(totalCurrentValue)}</p>
          </div>
          <div className="rounded-lg bg-gray-800 p-4">
            <h2 className="text-sm text-gray-400">Total investment</h2>
            <p className="text-2xl font-bold">{formatMoney(totalInvestment)}</p>
          </div>
          <div className="rounded-lg bg-gray-800 p-4">
            <h2 className="text-sm text-gray-400">P&L</h2>
            <p className={`text-2xl font-bold ${totalPnL >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {formatMoney(totalPnL)}
            </p>
          </div>
          <div className="rounded-lg bg-gray-800 p-4">
            <h2 className="text-sm text-gray-400">Overall return</h2>
            <p className={`text-2xl font-bold ${overallReturn >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {formatNumber(overallReturn, 2)}%
            </p>
          </div>
        </div>
        <div className="flex space-x-2 mb-4">
          <Input
            placeholder="Filter holdings..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="instrument">Instrument</SelectItem>
              <SelectItem value="quantity">Quantity</SelectItem>
              <SelectItem value="currentValue">Current Value</SelectItem>
              <SelectItem value="pnl">P&L</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
            {sortOrder === "asc" ? "▲" : "▼"}
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Instrument</TableHead>
              <TableHead>Qty.</TableHead>
              <TableHead>Avg. cost</TableHead>
              <TableHead>LTP</TableHead>
              <TableHead>Current value</TableHead>
              <TableHead>P&L</TableHead>
              <TableHead>Day change</TableHead>
              <TableHead>Overall return</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedAndFilteredHoldings.map((holding) => (
              <TableRow key={holding.instrument}>
                <TableCell>
                  <AssetDetails asset={holding} />
                </TableCell>
                <TableCell>{holding.quantity}</TableCell>
                <TableCell>{formatMoney(holding.avgCost)}</TableCell>
                <TableCell>{formatMoney(holding.ltp)}</TableCell>
                <TableCell>{formatMoney(holding.currentValue)}</TableCell>
                <TableCell className={holding.pnl >= 0 ? 'text-green-500' : 'text-red-500'}>
                  {formatMoney(holding.pnl)}
                </TableCell>
                <TableCell className={holding.dayChange >= 0 ? 'text-green-500' : 'text-red-500'}>
                  {formatNumber(holding.dayChange, 2)}%
                </TableCell>
                <TableCell className={holding.overallReturn >= 0 ? 'text-green-500' : 'text-red-500'}>
                  {formatNumber(holding.overallReturn, 2)}%
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </DashboardLayout>
  )
}

