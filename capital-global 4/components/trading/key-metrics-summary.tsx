import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatMoney, formatPercentage } from "@/lib/utils"

const metrics = [
  { title: "Current Value", value: 15463.77, change: 16.90 },
  { title: "Total P&L", value: 2240, change: 16.90 },
  { title: "Total Investment", value: 13230, change: 0 },
  { title: "Holdings", value: 17, change: 0, prefix: "" },
]

export function KeyMetricsSummary() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => (
        <Card key={metric.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {metric.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatMoney(metric.value)}</div>
            <p className={`text-xs ${metric.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {metric.change !==0 ? `${formatPercentage(metric.change)}` : metric.prefix}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

