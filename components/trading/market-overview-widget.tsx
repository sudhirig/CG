import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const mockMarketData = {
  indices: [
    { name: "S&P 500", value: 4185.47, change: 0.75 },
    { name: "Dow Jones", value: 33875.40, change: -0.32 },
    { name: "NASDAQ", value: 12153.41, change: 2.25 },
  ],
  sectors: [
    { name: "Technology", performance: 2.5 },
    { name: "Healthcare", performance: -0.8 },
    { name: "Financials", performance: 1.2 },
  ],
}

export function MarketOverviewWidget() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Market Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h4 className="mb-2 font-semibold">Major Indices</h4>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Index</TableHead>
                  <TableHead className="text-right">Value</TableHead>
                  <TableHead className="text-right">Change</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockMarketData.indices.map((index) => (
                  <TableRow key={index.name}>
                    <TableCell>{index.name}</TableCell>
                    <TableCell className="text-right">{index.value.toFixed(2)}</TableCell>
                    <TableCell className={`text-right ${index.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {index.change.toFixed(2)}%
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div>
            <h4 className="mb-2 font-semibold">Sector Performance</h4>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Sector</TableHead>
                  <TableHead className="text-right">Performance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockMarketData.sectors.map((sector) => (
                  <TableRow key={sector.name}>
                    <TableCell>{sector.name}</TableCell>
                    <TableCell className={`text-right ${sector.performance >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {sector.performance.toFixed(2)}%
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

