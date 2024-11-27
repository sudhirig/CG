"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/trading/dashboard-layout"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs-custom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { formatMoney } from "@/lib/utils"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function FundsPage() {
  const [activeTab, setActiveTab] = useState("balance")

  const balanceData = {
    equity: {
      available: 100000,
      used: 25000,
      total: 125000
    },
    commodity: {
      available: 50000,
      used: 10000,
      total: 60000
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Funds</h1>
          <Button>Add funds</Button>
        </div>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="balance">Balance</TabsTrigger>
            <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
          </TabsList>
          <TabsContent value="balance" className="mt-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-4 rounded-lg bg-gray-800 p-4">
                <h2 className="text-lg font-semibold">Equity</h2>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-sm text-gray-400">Available margin</p>
                    <p className="text-lg font-bold">{formatMoney(balanceData.equity.available)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Used margin</p>
                    <p className="text-lg font-bold">{formatMoney(balanceData.equity.used)}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-gray-400">Total margin</p>
                    <p className="text-lg font-bold">{formatMoney(balanceData.equity.total)}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4 rounded-lg bg-gray-800 p-4">
                <h2 className="text-lg font-semibold">Commodity</h2>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-sm text-gray-400">Available margin</p>
                    <p className="text-lg font-bold">{formatMoney(balanceData.commodity.available)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Used margin</p>
                    <p className="text-lg font-bold">{formatMoney(balanceData.commodity.used)}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-gray-400">Total margin</p>
                    <p className="text-lg font-bold">{formatMoney(balanceData.commodity.total)}</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="withdraw" className="mt-4">
            <div className="max-w-md space-y-4 rounded-lg bg-gray-800 p-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <Input id="amount" type="number" placeholder="Enter amount" />
              </div>
              <Button className="w-full">Withdraw</Button>
              <p className="text-sm text-gray-400">
                Withdrawals are processed within 24 hours during bank working days.
              </p>
            </div>
          </TabsContent>
        </Tabs>
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Transaction History</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { date: "2023-06-15", type: "Deposit", amount: 10000, status: "Completed" },
                { date: "2023-06-10", type: "Withdrawal", amount: -5000, status: "Completed" },
                { date: "2023-06-05", type: "Deposit", amount: 15000, status: "Completed" },
                { date: "2023-05-28", type: "Withdrawal", amount: -2000, status: "Completed" },
                { date: "2023-05-20", type: "Deposit", amount: 5000, status: "Completed" },
              ].map((transaction, index) => (
                <TableRow key={index}>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>{transaction.type}</TableCell>
                  <TableCell className={transaction.amount >= 0 ? "text-green-600" : "text-red-600"}>
                    {formatMoney(Math.abs(transaction.amount))}
                  </TableCell>
                  <TableCell>{transaction.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  )
}

