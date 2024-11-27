"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"

interface Alert {
  id: number
  symbol: string
  price: number
}

export function AlertsWidget() {
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [newSymbol, setNewSymbol] = useState("")
  const [newPrice, setNewPrice] = useState("")

  const addAlert = () => {
    if (newSymbol && newPrice) {
      setAlerts([...alerts, { id: Date.now(), symbol: newSymbol, price: parseFloat(newPrice) }])
      setNewSymbol("")
      setNewPrice("")
    }
  }

  const removeAlert = (id: number) => {
    setAlerts(alerts.filter(alert => alert.id !== id))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Price Alerts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2 mb-4">
          <Input
            placeholder="Symbol"
            value={newSymbol}
            onChange={(e) => setNewSymbol(e.target.value.toUpperCase())}
          />
          <Input
            placeholder="Price"
            type="number"
            value={newPrice}
            onChange={(e) => setNewPrice(e.target.value)}
          />
          <Button onClick={addAlert}>Add Alert</Button>
        </div>
        <ul className="space-y-2">
          {alerts.map((alert) => (
            <li key={alert.id} className="flex justify-between items-center">
              <span>{alert.symbol} @ ${alert.price}</span>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="sm" onClick={() => removeAlert(alert.id)}>
                    ✕
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Remove alert</TooltipContent>
              </Tooltip>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

