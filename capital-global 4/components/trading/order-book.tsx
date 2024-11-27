import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { formatMoney } from "@/lib/utils"

const mockOrders = [
  { id: '1', time: '10:30 AM', symbol: 'AAPL', type: 'BUY', quantity: 100, price: 150.25, status: 'EXECUTED' },
  { id: '2', time: '11:15 AM', symbol: 'GOOGL', type: 'SELL', quantity: 50, price: 2800.75, status: 'PENDING' },
  { id: '3', time: '12:00 PM', symbol: 'MSFT', type: 'BUY', quantity: 75, price: 300.50, status: 'CANCELLED' },
]

export function OrderBook() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Book</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Time</TableHead>
              <TableHead>Symbol</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.time}</TableCell>
                <TableCell>{order.symbol}</TableCell>
                <TableCell>{order.type}</TableCell>
                <TableCell>{order.quantity}</TableCell>
                <TableCell>{formatMoney(order.price)}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>
                  {order.status === 'PENDING' && (
                    <Button variant="outline" size="sm">Modify</Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

