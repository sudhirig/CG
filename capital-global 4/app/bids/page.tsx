"use client"

import { useState, useEffect } from "react"
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
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"

const BidPlacementForm = () => {
  const [symbol, setSymbol] = useState("")
  const [quantity, setQuantity] = useState("")
  const [price, setPrice] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Placing bid:", { symbol, quantity, price })
    // Implement bid placement logic here
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="symbol">Symbol</Label>
        <Input id="symbol" value={symbol} onChange={(e) => setSymbol(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="quantity">Quantity</Label>
        <Input id="quantity" type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="price">Price</Label>
        <Input id="price" type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} required />
      </div>
      <Button type="submit">Place Bid</Button>
    </form>
  )
}

export default function BidsPage() {
  const [bids, setBids] = useState([
    { id: 1, symbol: "AAPL", quantity: 100, price: 150.25, total: 15025, status: "Open", lastUpdated: "2023-06-10 15:30", expiresAt: "2023-06-11 15:30" },
    { id: 2, symbol: "GOOGL", quantity: 50, price: 2800.75, total: 140037.5, status: "Filled", lastUpdated: "2023-06-10 16:00", expiresAt: "2023-06-11 16:00" },
    { id: 3, symbol: "MSFT", quantity: 75, price: 300.50, total: 22537.5, status: "Partial", lastUpdated: "2023-06-10 16:30", expiresAt: "2023-06-11 16:30" },
  ]);
  const { toast } = useToast()

  useEffect(() => {
    const interval = setInterval(() => {
      setBids(prevBids => prevBids.map(bid => {
        if (bid.status === "Open" && Math.random() > 0.8) {
          const newStatus = Math.random() > 0.5 ? "Filled" : "Partial"
          toast({
            title: "Bid Status Changed",
            description: `Bid for ${bid.symbol} is now ${newStatus}`,
          })
          return { ...bid, status: newStatus }
        }
        return bid
      }))
    }, 10000)
    return () => clearInterval(interval)
  }, [toast])

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Bids</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Place New Bid</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Place New Bid</DialogTitle>
              </DialogHeader>
              <BidPlacementForm />
            </DialogContent>
          </Dialog>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Symbol</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead>Expires At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bids.map((bid) => (
              <TableRow key={bid.id}>
                <TableCell>{bid.symbol}</TableCell>
                <TableCell>{formatNumber(bid.quantity)}</TableCell>
                <TableCell>{formatMoney(bid.price)}</TableCell>
                <TableCell>{formatMoney(bid.total)}</TableCell>
                <TableCell>{bid.status}</TableCell>
                <TableCell>{bid.lastUpdated}</TableCell>
                <TableCell>{bid.expiresAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </DashboardLayout>
  )
}

