"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs-custom"

export function OrderForm() {
  return (
    <div className="rounded border border-gray-800 bg-[#2b2b2b]">
      <Tabs defaultValue="regular" className="w-full">
        <div className="border-b border-gray-800 px-3">
          <TabsList className="h-12 bg-transparent">
            <TabsTrigger
              value="regular"
              className="data-[state=active]:bg-transparent data-[state=active]:text-white"
            >
              Regular
            </TabsTrigger>
            <TabsTrigger
              value="cover"
              className="data-[state=active]:bg-transparent data-[state=active]:text-white"
            >
              Cover
            </TabsTrigger>
            <TabsTrigger
              value="amo"
              className="data-[state=active]:bg-transparent data-[state=active]:text-white"
            >
              AMO
            </TabsTrigger>
            <TabsTrigger
              value="iceberg"
              className="data-[state=active]:bg-transparent data-[state=active]:text-white"
            >
              Iceberg
            </TabsTrigger>
          </TabsList>
        </div>
        <div className="p-4">
          <div className="space-y-4">
            <RadioGroup defaultValue="buy" className="flex gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="buy" id="buy" />
                <Label
                  htmlFor="buy"
                  className="text-green-500 hover:text-green-400"
                >
                  Buy
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="sell" id="sell" />
                <Label
                  htmlFor="sell"
                  className="text-red-500 hover:text-red-400"
                >
                  Sell
                </Label>
              </div>
            </RadioGroup>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  placeholder="Qty."
                  className="bg-[#383838] text-white placeholder:text-gray-500"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  placeholder="Price"
                  className="bg-[#383838] text-white placeholder:text-gray-500"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="product">Product</Label>
                <Select>
                  <SelectTrigger
                    id="product"
                    className="bg-[#383838] text-white [&_svg]:text-gray-500"
                  >
                    <SelectValue placeholder="Select product" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#2b2b2b] text-white">
                    <SelectItem value="CNC">CNC</SelectItem>
                    <SelectItem value="MIS">MIS</SelectItem>
                    <SelectItem value="NRML">NRML</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="type">Order Type</Label>
                <Select>
                  <SelectTrigger
                    id="type"
                    className="bg-[#383838] text-white [&_svg]:text-gray-500"
                  >
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#2b2b2b] text-white">
                    <SelectItem value="market">MARKET</SelectItem>
                    <SelectItem value="limit">LIMIT</SelectItem>
                    <SelectItem value="sl">SL</SelectItem>
                    <SelectItem value="sl-m">SL-M</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              Place Order
            </Button>
          </div>
        </div>
      </Tabs>
    </div>
  )
}

