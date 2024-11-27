"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function QuickTradePanel() {
  const [action, setAction] = useState("buy")

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Trade</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex space-x-2">
            <Button 
              variant={action === "buy" ? "default" : "outline"}
              onClick={() => setAction("buy")}
              className="flex-1"
            >
              Buy
            </Button>
            <Button 
              variant={action === "sell" ? "default" : "outline"}
              onClick={() => setAction("sell")}
              className="flex-1"
            >
              Sell
            </Button>
          </div>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select stock" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="AAPL">AAPL</SelectItem>
              <SelectItem value="GOOGL">GOOGL</SelectItem>
              <SelectItem value="MSFT">MSFT</SelectItem>
            </SelectContent>
          </Select>
          <Input type="number" placeholder="Quantity" />
          <Input type="number" placeholder="Price" />
          <Button className="w-full">Place Order</Button>
        </div>
      </CardContent>
    </Card>
  )
}

