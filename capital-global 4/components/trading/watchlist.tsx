"use client"

import { useState } from "react"
import { ChevronDown, Plus, Search, LineChart, BarChart3, Trash2, MoreHorizontal } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs-custom"
import { cn, formatNumber } from "@/lib/utils"
import { TradeModal } from "./trade-modal"
import { ChartDialog } from "./chart-dialog"

type WatchlistItem = {
  symbol: string
  ltp: number
  change: number
  volume: number
  exchange?: string
}

export function Watchlist() {
  const [activeTab, setActiveTab] = useState("1")
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [newSymbol, setNewSymbol] = useState("")
  const [tradeModal, setTradeModal] = useState<{
    isOpen: boolean
    type: "buy" | "sell"
    symbol: string
    price: number
  }>({
    isOpen: false,
    type: "buy",
    symbol: "",
    price: 0
  })
  const [chartDialog, setChartDialog] = useState<{
    isOpen: boolean
    symbol: string
  }>({
    isOpen: false,
    symbol: ""
  })

  const [watchlistItems, setWatchlistItems] = useState<WatchlistItem[]>([
    { symbol: "NIFTY 50", ltp: 19425.20, change: 0.75, volume: 12453789, exchange: "NSE" },
    { symbol: "SENSEX", ltp: 64875.45, change: -0.25, volume: 8745123, exchange: "NSE" },
    { symbol: "BANKNIFTY", ltp: 43750.85, change: 1.25, volume: 5874123, exchange: "NSE" },
    { symbol: "RELIANCE", ltp: 2456.30, change: 2.15, volume: 3254789, exchange: "NSE" },
    { symbol: "TCS", ltp: 3478.90, change: -0.85, volume: 1547896, exchange: "NSE" },
  ])

  const addToWatchlist = () => {
    if (newSymbol && !watchlistItems.find(item => item.symbol === newSymbol)) {
      setWatchlistItems([...watchlistItems, {
        symbol: newSymbol,
        ltp: 0,
        change: 0,
        volume: 0,
        exchange: "NSE"
      }])
      setNewSymbol("")
    }
  }

  const removeFromWatchlist = (symbol: string) => {
    setWatchlistItems(watchlistItems.filter(item => item.symbol !== symbol))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addToWatchlist()
    }
  }

  const filteredItems = watchlistItems.filter(item =>
    item.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col">
      <div className="flex h-14 items-center justify-between border-b border-gray-800 px-4">
        <span className="text-sm font-medium text-white/70">Market Watchlist</span>
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-white/70"
          onClick={() => setNewSymbol(prev => prev ? "" : " ")}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex items-center gap-2 border-b border-gray-800 px-4 py-2">
        {newSymbol !== null ? (
          <div className="flex w-full gap-2">
            <Input
              placeholder="Add symbol"
              value={newSymbol}
              onChange={(e) => setNewSymbol(e.target.value.toUpperCase())}
              onKeyPress={handleKeyPress}
              className="h-8 border-0 bg-transparent text-sm text-white placeholder:text-white/50 focus-visible:ring-0"
            />
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={addToWatchlist}
              className="text-white/70"
            >
              Add
            </Button>
          </div>
        ) : (
          <>
            <Search className="h-4 w-4 text-white/50" />
            <Input
              placeholder="Search eg: INFY, RELIANCE"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-8 border-0 bg-transparent text-sm text-white placeholder:text-white/50 focus-visible:ring-0"
            />
          </>
        )}
      </div>
      <Tabs defaultValue="1" className="flex-1">
        <div className="border-b border-gray-800 px-4">
          <TabsList className="h-12 w-full justify-start gap-4 bg-transparent p-0">
            {["1", "2", "3"].map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "h-full rounded-none border-b-2 border-transparent px-0 font-normal hover:text-white",
                  activeTab === tab && "border-blue-500 text-white"
                )}
              >
                List {tab}
              </TabsTrigger>
            ))}
            <Button variant="ghost" size="sm" className="ml-auto h-8 text-white/70">
              <ChevronDown className="h-4 w-4" />
            </Button>
          </TabsList>
        </div>
        <TabsContent value="1" className="flex-1 overflow-auto p-0">
          <div className="flex flex-col divide-y divide-gray-800">
            {filteredItems.map((item) => (
              <div
                key={item.symbol}
                className="relative flex items-center justify-between px-4 py-3 hover:bg-gray-800/50"
                onMouseEnter={() => setHoveredItem(item.symbol)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div>
                  <div className="font-medium">{item.symbol}</div>
                  <div className="text-sm text-white/50">{item.exchange}</div>
                </div>
                <div className="flex items-center gap-2">
                  {hoveredItem === item.symbol ? (
                    <div className="flex items-center gap-1">
                      <Button
                        size="sm"
                        className="h-7 bg-blue-600 px-2 hover:bg-blue-700"
                        onClick={() => setTradeModal({
                          isOpen: true,
                          type: "buy",
                          symbol: item.symbol,
                          price: item.ltp
                        })}
                      >
                        B
                      </Button>
                      <Button
                        size="sm"
                        className="h-7 bg-red-600 px-2 hover:bg-red-700"
                        onClick={() => setTradeModal({
                          isOpen: true,
                          type: "sell",
                          symbol: item.symbol,
                          price: item.ltp
                        })}
                      >
                        S
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 px-2 text-white/70 hover:bg-gray-700"
                        onClick={() => setChartDialog({
                          isOpen: true,
                          symbol: item.symbol
                        })}
                      >
                        <LineChart className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 px-2 text-white/70 hover:bg-gray-700"
                      >
                        <BarChart3 className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 px-2 text-white/70 hover:bg-gray-700"
                        onClick={() => removeFromWatchlist(item.symbol)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 px-2 text-white/70 hover:bg-gray-700"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="text-right">
                      <div className="tabular-nums">{formatNumber(item.ltp)}</div>
                      <div
                        className={cn(
                          "text-sm tabular-nums",
                          item.change > 0 ? "text-green-500" : "text-red-500"
                        )}
                      >
                        {item.change > 0 ? "+" : ""}
                        {item.change}%
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <TradeModal 
        isOpen={tradeModal.isOpen}
        onClose={() => setTradeModal(prev => ({ ...prev, isOpen: false }))}
        type={tradeModal.type}
        symbol={tradeModal.symbol}
        price={tradeModal.price}
      />

      <ChartDialog
        isOpen={chartDialog.isOpen}
        onClose={() => setChartDialog(prev => ({ ...prev, isOpen: false }))}
        symbol={chartDialog.symbol}
      />
    </div>
  )
}

