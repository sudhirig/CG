import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"

interface TradeModalProps {
  isOpen: boolean
  onClose: () => void
  type: "buy" | "sell"
  symbol: string
  price: number
}

export function TradeModal({ isOpen, onClose, type, symbol, price }: TradeModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <span className="text-lg">{symbol}</span>
            <span className="text-sm text-muted-foreground">BSE ₹{price} NSE ₹{price}</span>
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <Tabs defaultValue="quick">
            <TabsList className="w-full">
              <TabsTrigger value="quick">Quick</TabsTrigger>
              <TabsTrigger value="regular">Regular</TabsTrigger>
              <TabsTrigger value="cover">Cover</TabsTrigger>
              <TabsTrigger value="amo">AMO</TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="qty">Qty.</Label>
              <Input id="qty" type="number" defaultValue={1} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input id="price" type="number" defaultValue={price} />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="intraday" />
              <Label htmlFor="intraday">Intraday</Label>
            </div>
            <div className="flex justify-between text-sm">
              <span>Amount</span>
              <span>₹{price}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Charges</span>
              <span>₹1.79</span>
            </div>
            <Button 
              className="w-full" 
              variant={type === "buy" ? "default" : "destructive"}
            >
              {type === "buy" ? "Buy" : "Sell"}
            </Button>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={onClose}
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

