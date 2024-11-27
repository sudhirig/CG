"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/trading/dashboard-layout"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs-custom"
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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useToast } from "@/components/ui/use-toast"

export default function PositionsPage() {
  const [activeTab, setActiveTab] = useState("day")
  const [positions, setPositions] = useState([
    { instrument: "NIFTY 23JUN 18500 CE", product: "MIS", quantity: 50, avgPrice: 80, ltp: 85, pnl: 250, change: 6.25, leverage: 2, marginUsed: 1000, marginAvailable: 4000 },
    { instrument: "BANKNIFTY 23JUN 43000 PE", product: "NRML", quantity: -25, avgPrice: 120, ltp: 110, pnl: 250, change: -8.33, leverage: 1, marginUsed: 2000, marginAvailable: 3000 },
    { instrument: "RELIANCE", product: "MIS", quantity: 100, avgPrice: 2450, ltp: 2500, pnl: 5000, change: 2.04, leverage: 1.5, marginUsed: 5000, marginAvailable: 10000 },
  ])
  const { toast } = useToast()

  const totalPnL = positions.reduce((sum, position) => sum + position.pnl, 0)

  useEffect(() => {
    const interval = setInterval(() => {
      setPositions(prevPositions => prevPositions.map(position => {
        const newLtp = position.ltp * (1 + (Math.random() - 0.5) * 0.01);
        const newPnl = (newLtp - position.avgPrice) * position.quantity;
        const newChange = ((newLtp - position.avgPrice) / position.avgPrice) * 100;

        if (Math.abs(newChange) > 5) {
          toast({
            title: "Significant Price Movement",
            description: `${position.instrument} has moved ${newChange.toFixed(2)}%`,
          })
        }

        return { ...position, ltp: newLtp, pnl: newPnl, change: newChange };
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, [toast]);

  const filteredPositions = activeTab === "all" ? positions : positions.filter(position => activeTab === "long" ? position.quantity > 0 : position.quantity < 0);

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Positions</h1>
          <Button>Convert position</Button>
        </div>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">All Positions</TabsTrigger>
            <TabsTrigger value="long">Long</TabsTrigger>
            <TabsTrigger value="short">Short</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-4">
            <div className="mt-4 flex items-center justify-between">
              <div>
                <span className="text-sm text-gray-400">Total P&L</span>
                <span className={`ml-2 text-lg font-bold ${totalPnL >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {formatMoney(totalPnL)}
                </span>
              </div>
              <Button variant="outline">Download P&L report</Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Instrument</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Qty.</TableHead>
                  <TableHead>Avg. price</TableHead>
                  <TableHead>LTP</TableHead>
                  <TableHead>P&L</TableHead>
                  <TableHead>Change</TableHead>
                  <TableHead>Leverage</TableHead>
                  <TableHead>Margin Used</TableHead>
                  <TableHead>Margin Available</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPositions.map((position) => (
                  <TableRow key={position.instrument}>
                    <TableCell>{position.instrument}</TableCell>
                    <TableCell>{position.product}</TableCell>
                    <TableCell>{position.quantity}</TableCell>
                    <TableCell>{formatMoney(position.avgPrice)}</TableCell>
                    <TableCell>{formatMoney(position.ltp)}</TableCell>
                    <TableCell className={position.pnl >= 0 ? 'text-green-500' : 'text-red-500'}>
                      {formatMoney(position.pnl)}
                    </TableCell>
                    <TableCell className={position.change >= 0 ? 'text-green-500' : 'text-red-500'}>
                      {formatNumber(position.change, 2)}%
                    </TableCell>
                    <TableCell>{position.leverage}x</TableCell>
                    <TableCell>{formatMoney(position.marginUsed)}</TableCell>
                    <TableCell>{formatMoney(position.marginAvailable)}</TableCell>
                    <TableCell>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline">Manage</Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80">
                          <div className="grid gap-4">
                            <h4 className="font-medium leading-none">Manage Position</h4>
                            <div className="grid gap-2">
                              <Button onClick={() => console.log("Close position")}>Close Position</Button>
                              <Button onClick={() => console.log("Adjust stop loss")}>Adjust Stop Loss</Button>
                              <Button onClick={() => console.log("Adjust take profit")}>Adjust Take Profit</Button>
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
          <TabsContent value="long" className="mt-4">
            {/* Long positions content */}
          </TabsContent>
          <TabsContent value="short" className="mt-4">
            {/* Short positions content */}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

