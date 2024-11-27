import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const marketData = [
  { index: "S&P 500", value: 4,185.81, change: "+0.75%" },
  { index: "Dow Jones", value: 33,875.40, change: "-0.32%" },
  { index: "NASDAQ", value: 12,153.41, change: "+2.25%" },
  { index: "Russell 2000", value: 1,892.56, change: "+1.45%" },
]

export function MarketOverview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Market Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Index</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Change</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {marketData.map((item) => (
              <TableRow key={item.index}>
                <TableCell>{item.index}</TableCell>
                <TableCell>{item.value.toLocaleString()}</TableCell>
                <TableCell className={item.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}>
                  {item.change}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

