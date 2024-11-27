import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bell } from 'lucide-react'

const notifications = [
  { id: 1, message: "Your order for AAPL has been executed", time: "10 minutes ago" },
  { id: 2, message: "TSLA stock has increased by 5%", time: "1 hour ago" },
  { id: 3, message: "Dividend payment received for MSFT", time: "2 hours ago" },
  { id: 4, message: "New market analysis report available", time: "1 day ago" },
]

export function NotificationCenter() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Bell className="mr-2 h-4 w-4" />
          Notifications
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {notifications.map((notification) => (
            <li key={notification.id} className="flex items-start space-x-4">
              <div className="rounded-full bg-blue-500 p-1">
                <Bell className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium">{notification.message}</p>
                <p className="text-xs text-gray-500">{notification.time}</p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

