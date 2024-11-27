"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/trading/dashboard-layout"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { formatMoney } from "@/lib/utils"
import { OrderDetailsModal } from "@/components/trading/order-details-modal"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"

const orderTypes = ["Market", "Limit", "Stop", "Stop Limit", "Trailing Stop"];

const initialOrders = [
  { id: 1, time: "2023-06-10 10:30", type: "BUY", instrument: "AAPL", product: "CNC", quantity: 10, price: 150.25, status: "COMPLETED" },
  { id: 2, time: "2023-06-10 11:15", type: "SELL", instrument: "GOOGL", product: "MIS", quantity: 5, price: 2800.75, status: "PENDING" },
  { id: 3, time: "2023-06-10 13:45", type: "BUY", instrument: "MSFT", product: "CNC", quantity: 15, price: 300.50, status: "CANCELED" },
]

export default function OrdersPage() {
  const [orders, setOrders] = useState(initialOrders);
  const [activeTab, setActiveTab] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [orderAction, setOrderAction] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setOrders(prevOrders => prevOrders.map(order => ({
        ...order,
        status: Math.random() > 0.8 ? "COMPLETED" : order.status
      })));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const filteredOrders = orders.filter(order =>
    order.instrument.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.status.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleOrderAction = (action: string, orderId: number) => {
    setSelectedOrder(orders.find(order => order.id === orderId));
    setOrderAction(action);
    setShowConfirmDialog(true);
  };

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Orders</h1>
          <Button>Place New Order</Button>
        </div>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">All Orders</TabsTrigger>
            <TabsTrigger value="open">Open (1)</TabsTrigger>
            <TabsTrigger value="completed">Completed (1)</TabsTrigger>
            <TabsTrigger value="canceled">Canceled (1)</TabsTrigger>
          </TabsList>
          <div className="mt-4 flex items-center gap-4">
            <Input
              type="search"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Input type="date" className="w-auto" />
            <Button variant="outline">Export CSV</Button>
          </div>
          <TabsContent value={activeTab} className="mt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Time</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Instrument</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Qty.</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.time}</TableCell>
                    <TableCell>{order.type}</TableCell>
                    <TableCell>{order.instrument}</TableCell>
                    <TableCell>{order.product}</TableCell>
                    <TableCell>{order.quantity}</TableCell>
                    <TableCell>{formatMoney(order.price)}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        order.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                          order.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                      }`}>
                        {order.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" onClick={() => handleOrderAction("View", order.id)}>
                        View
                      </Button>
                      {order.status === 'PENDING' && (
                        <Button variant="ghost" className="ml-2" onClick={() => handleOrderAction("Cancel", order.id)}>
                          Cancel
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </div>
      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
      {showConfirmDialog && selectedOrder && (
        <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm {orderAction}</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to {orderAction.toLowerCase()} the order for {selectedOrder.instrument}?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => {
                // Implement the action here
                console.log(`${orderAction} order ${selectedOrder.id}`);
                setShowConfirmDialog(false);
              }}>Confirm</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </DashboardLayout>
  )
}

