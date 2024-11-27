import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { formatNumber } from "@/lib/utils"

type Depth = {
  price: number
  quantity: number
  orders: number
}

export function MarketDepth() {
  // Mock data - replace with real data
  const bids: Depth[] = [
    { price: 19425.20, quantity: 225, orders: 12 },
    { price: 19424.85, quantity: 150, orders: 8 },
    { price: 19424.50, quantity: 325, orders: 15 },
    { price: 19424.15, quantity: 125, orders: 6 },
    { price: 19423.80, quantity: 475, orders: 20 },
  ]

  const asks: Depth[] = [
    { price: 19425.55, quantity: 175, orders: 10 },
    { price: 19425.90, quantity: 250, orders: 14 },
    { price: 19426.25, quantity: 125, orders: 7 },
    { price: 19426.60, quantity: 375, orders: 18 },
    { price: 19426.95, quantity: 225, orders: 11 },
  ]

  return (
    <div className="rounded border border-gray-800 bg-[#2b2b2b]">
      <div className="border-b border-gray-800 p-3">
        <h3 className="font-medium">Market Depth</h3>
      </div>
      <div className="grid grid-cols-2 divide-x divide-gray-800">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="text-xs text-gray-400">Qty</TableHead>
              <TableHead className="text-center text-xs text-gray-400">
                Orders
              </TableHead>
              <TableHead className="text-right text-xs text-gray-400">
                Bid
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bids.map((bid) => (
              <TableRow
                key={bid.price}
                className="hover:bg-transparent [&_td]:text-green-500"
              >
                <TableCell>{formatNumber(bid.quantity, 0)}</TableCell>
                <TableCell className="text-center">{bid.orders}</TableCell>
                <TableCell className="text-right">
                  {formatNumber(bid.price, 2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="text-xs text-gray-400">Ask</TableHead>
              <TableHead className="text-center text-xs text-gray-400">
                Orders
              </TableHead>
              <TableHead className="text-right text-xs text-gray-400">
                Qty
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {asks.map((ask) => (
              <TableRow
                key={ask.price}
                className="hover:bg-transparent [&_td]:text-red-500"
              >
                <TableCell>{formatNumber(ask.price, 2)}</TableCell>
                <TableCell className="text-center">{ask.orders}</TableCell>
                <TableCell className="text-right">
                  {formatNumber(ask.quantity, 0)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

