import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const newsItems = [
  { title: "Tech Stocks Surge Amid Positive Earnings Reports", source: "Financial Times", time: "2 hours ago" },
  { title: "Federal Reserve Hints at Potential Rate Cut", source: "Wall Street Journal", time: "4 hours ago" },
  { title: "Oil Prices Stabilize Following OPEC+ Meeting", source: "Reuters", time: "6 hours ago" },
  { title: "Cryptocurrency Market Sees Increased Institutional Investment", source: "Bloomberg", time: "8 hours ago" },
]

export function NewsWidget() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Market News</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {newsItems.map((item, index) => (
            <li key={index} className="border-b pb-2 last:border-b-0">
              <h3 className="font-medium">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.source} - {item.time}</p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

