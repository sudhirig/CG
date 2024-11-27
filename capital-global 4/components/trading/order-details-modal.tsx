import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { formatMoney } from "@/lib/utils"

interface OrderDetailsModalProps {
  order: any
  onClose: () => void
}

export function OrderDetailsModal({ order, onClose }: OrderDetailsModalProps) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Order Details</DialogTitle>
          <DialogDescription>
            Order ID: {order.id}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 items-center gap-4">
            <span className="font-medium">Instrument:</span>
            <span>{order.instrument}</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <span className="font-medium">Type:</span>
            <span>{order.type}</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <span className="font-medium">Quantity:</span>
            <span>{order.quantity}</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <span className="font-medium">Price:</span>
            <span>{formatMoney(order.price)}</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <span className="font-medium">Total Value:</span>
            <span>{formatMoney(order.price * order.quantity)}</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <span className="font-medium">Status:</span>
            <span>{order.status}</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <span className="font-medium">Time:</span>
            <span>{order.time}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

