import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatMoney } from "@/lib/utils"

const mockPortfolioData = {
  currentValue: 150000,
  dayPnL: 2500,
  overallPnL: 15000,
  investedValue: 135000,
}

export function PortfolioSummaryCard() {
  const { currentValue, dayPnL, overallPnL,
investedValue } = mockPortfolioData

  return (
    <Card>
      <CardHeader>
        <CardTitle>Portfolio Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Current Value</p>
            <p className="text-2xl font-bold">{formatMoney(currentValue)}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Day's P&L</p>
            <p className={`text-2xl font-bold ${dayPnL >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {formatMoney(dayPnL)}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Overall P&L</p>
            <p className={`text-2xl font-bold ${overallPnL >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {formatMoney(overallPnL)}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Invested Value</p>
            <p className="text-2xl font-bold">{formatMoney(investedValue)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

