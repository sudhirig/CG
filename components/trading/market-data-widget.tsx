"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { formatNumber } from "@/lib/utils"

const data = [
  { name: '9:30', value: 33000 },
  { name: '10:00', value: 33200 },
  { name: '10:30', value: 33100 },
  { name: '11:00', value: 33300 },
  { name: '11:30', value: 33250 },
  { name: '12:00', value: 33400 },
]

export function MarketDataWidget() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Market Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => formatNumber(value as number)} />
              <Line type="monotone" dataKey="value" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

