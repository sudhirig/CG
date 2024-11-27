import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { formatMoney } from "@/lib/utils"

interface AccountSummaryProps {
  type: "equity" | "commodity"
  marginAvailable: number
  marginsUsed: number
  openingBalance: number
}

export function AccountSummary({ type, marginAvailable, marginsUsed, openingBalance }: AccountSummaryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="capitalize">{type}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-2">
          <div className="text-3xl font-bold">
            {formatMoney(marginAvailable)}
          </div>
          <div className="text-sm text-muted-foreground">
            Margin available
          </div>
        </div>
        <div className="grid gap-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Margins used</span>
            <span>{formatMoney(marginsUsed)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Opening balance</span>
            <span>{formatMoney(openingBalance)}</span>
          </div>
        </div>
        <Button variant="outline" className="w-full">
          View statement
        </Button>
      </CardContent>
    </Card>
  )
}

