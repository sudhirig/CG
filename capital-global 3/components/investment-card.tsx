import { Card, CardContent } from "@/components/ui/card"
import { LineChart } from 'lucide-react'

export function InvestmentCard() {
  return (
    <Card className="w-[400px] bg-white/90 backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-2xl font-bold">$137,672</h3>
            <p className="text-sm text-muted-foreground">Total Portfolio Value</p>
          </div>
          <div className="text-primary">
            <LineChart className="h-6 w-6" />
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <LineChart className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">AI-Driven Portfolio</p>
                <p className="text-xs text-muted-foreground">Balanced Growth</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">$40,324.00</p>
              <p className="text-xs text-green-600">+12.5%</p>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <LineChart className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">Global Markets</p>
                <p className="text-xs text-muted-foreground">Diversified</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">$66,656.00</p>
              <p className="text-xs text-green-600">+8.3%</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

