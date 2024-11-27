"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs-custom"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { formatMoney } from "@/lib/utils"

const generateData = (days: number) => {
  const data = []
  let value = 100000
  for (let i = 0; i < days; i++) {
    value += Math.random() * 5000 - 2500
    data.push({
      date: new Date(2023, 0, i + 1).toISOString().split('T')[0],
      value: value
    })
  }
  return data
}

const timeframes = {
  "1D": generateData(1),
  "1W": generateData(7),
  "1M": generateData(30),
  "3M": generateData(90),
  "1Y": generateData(365),
  "ALL": generateData(1825)
}

export function PortfolioChart() {
  const [activeTimeframe, setActiveTimeframe] = useState("1M")

  return (
    <Card>
      <CardHeader>
        <CardTitle>Portfolio Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTimeframe} onValueChange={setActiveTimeframe} className="mb-4">
          <TabsList>
            {Object.keys(timeframes).map((tf) => (
              <TabsTrigger key={tf} value={tf}>{tf}</TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={timeframes[activeTimeframe]}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              />
              <YAxis 
                tickFormatter={(value) => formatMoney(value)}
              />
              <Tooltip
                formatter={(value: number) => formatMoney(value)}
                labelFormatter={(label) => new Date(label).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              />
              <Area type="monotone" dataKey="value" stroke="#8884d8" fillOpacity={1} fill="url(#colorValue)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

