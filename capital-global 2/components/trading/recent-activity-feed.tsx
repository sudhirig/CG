import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDownRight, ArrowUpRight, DollarSign } from "lucide-react"

const activities = [
  { type: "buy", description: "Bought 10 shares of AAPL", time: "2 hours ago", icon: ArrowUpRight },
  { type: "sell", description: "Sold 5 shares of GOOGL", time: "5 hours ago", icon: ArrowDownRight },
  { type: "dividend", description: "Received dividend from MSFT", time: "1 day ago", icon: DollarSign },
  { type: "buy", description: "Bought 20 shares of AMZN", time: "2 days ago", icon: ArrowUpRight },
  { type: "sell", description: "Sold 15 shares of TSLA", time: "3 days ago", icon: ArrowDownRight },
]

export function RecentActivityFeed() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-center">
              <div className={`mr-4 rounded-full p-2 ${
                activity.type === 'buy' ? 'bg-green-100' :
                activity.type === 'sell' ? 'bg-red-100' : 'bg-blue-100'
              }`}>
                <activity.icon className={`h-4 w-4 ${
                  activity.type === 'buy' ? 'text-green-600' :
                  activity.type === 'sell' ? 'text-red-600' : 'text-blue-600'
                }`} />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">{activity.description}</p>
                <p className="text-sm text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

