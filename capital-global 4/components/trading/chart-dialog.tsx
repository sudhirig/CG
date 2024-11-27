"use client"

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { BarChart3, CandlestickChart, LineChart, Mountain, Settings, ChevronDown, Activity, Layout, Eye, Calendar, PenTool, Camera, Maximize2, ZoomIn, Search, BarChart2 } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Scatter, ComposedChart } from 'recharts'

interface ChartDialogProps {
  isOpen: boolean
  onClose: () => void
  symbol: string
}

const data = [
  { date: '2023-11-01', open: 1680, high: 1720, low: 1670, close: 1715, volume: 86019 },
  { date: '2023-11-02', open: 1715, high: 1740, low: 1710, close: 1725, volume: 92450 },
  { date: '2023-11-03', open: 1725, high: 1745, low: 1715, close: 1735, volume: 78230 },
  { date: '2023-11-04', open: 1735, high: 1760, low: 1730, close: 1750, volume: 84120 },
  { date: '2023-11-05', open: 1750, high: 1775, low: 1745, close: 1760, volume: 95670 },
  { date: '2023-11-06', open: 1760, high: 1780, low: 1755, close: 1765, volume: 88340 },
  { date: '2023-11-07', open: 1765, high: 1785, low: 1760, close: 1775, volume: 90780 },
  { date: '2023-11-08', open: 1775, high: 1790, low: 1770, close: 1780, volume: 87650 },
  { date: '2023-11-09', open: 1780, high: 1795, low: 1775, close: 1785, volume: 89230 },
  { date: '2023-11-10', open: 1785, high: 1800, low: 1780, close: 1790, volume: 91450 }
].map(item => ({
  ...item,
  candleColor: item.close >= item.open ? '#26A69A' : '#EF5350'
}))

const timeIntervals = ['1 Min', '2 Min', '3 Min', '4 Min', '5 Min', '10 Min', '15 Min', '30 Min', '1 Hour', '2 Hours', '3 Hours', '4 Hours', '1 D', '1 W', '1 Mo']

const studies = [
  'ADX/DMS', 'ATR Bands', 'ATR Trailing Stops', 'Accumulation/Distribution',
  'Accumulative Swing Index', 'Alligator', 'Anchored VWAP', 'Aroon',
  'Aroon Oscillator', 'Average True Range', 'Awesome Oscillator',
  'Balance of Power', 'Bollinger %b', 'Bollinger Bands', 'Bollinger Bandwidth',
  'Candlestick Patterns', 'Center Of Gravity', 'Central Pivot Range',
  'Chaikin Money Flow', 'Chaikin Volatility', 'Chande Forecast Oscillator',
  'Chande Momentum Oscillator', 'Choppiness Index', 'Commodity Channel Index',
  'Coppock Curve', 'Correlation Coefficient', 'Darvas Box',
  'Detrended Price Oscillator'
]

export function ChartDialog({ isOpen, onClose, symbol }: ChartDialogProps) {
  const [chartType, setChartType] = useState<'candle' | 'bar' | 'line' | 'mountain' | 'baseline'>('candle')
  const [timeInterval, setTimeInterval] = useState('1 D')
  const [showStudies, setShowStudies] = useState(false)
  const [showChartTypes, setShowChartTypes] = useState(false)
  const [searchStudy, setSearchStudy] = useState('')

  const renderChart = () => {
    switch (chartType) {
      case 'candle':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data}>
              <XAxis dataKey="date" />
              <YAxis domain={['auto', 'auto']} />
              <Tooltip />
              <CartesianGrid strokeDasharray="3 3" />
              <Bar dataKey="volume" fill="#B2DFDB" opacity={0.5} />
              <Scatter
                dataKey="close"
                fill={(entry) => (entry.close >= entry.open ? '#26A69A' : '#EF5350')}
                shape={(props) => {
                  const { x, y, width, height, fill } = props
                  return (
                    <rect
                      x={x - width / 2}
                      y={y - height / 2}
                      width={width}
                      height={height}
                      fill={fill}
                    />
                  )
                }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        )
      case 'line':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <XAxis dataKey="date" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Area type="monotone" dataKey="close" stroke="#8884d8" fill="#8884d8" />
            </AreaChart>
          </ResponsiveContainer>
        )
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="date" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Bar dataKey="volume" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        )
      case 'area':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <XAxis dataKey="date" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Area type="monotone" dataKey="close" stroke="#8884d8" fill="#8884d8" />
            </AreaChart>
          </ResponsiveContainer>
        )
      case 'mountain':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <XAxis dataKey="date" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Area type="monotone" dataKey="close" stroke="#8884d8" fill="#8884d8" />
            </AreaChart>
          </ResponsiveContainer>
        )
      case 'baseline':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <XAxis dataKey="date" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Area type="monotone" dataKey="close" stroke="#8884d8" fill="#8884d8" />
            </AreaChart>
          </ResponsiveContainer>
        )
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl p-0">
        <div className="flex flex-col h-[80vh]">
          <div className="flex justify-between items-center px-4 h-12 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" onClick={() => setShowChartTypes(!showChartTypes)}>
                <BarChart2 size={16} className="mr-1" />
                Chart Types
                <ChevronDown size={14} className="ml-1" />
              </Button>

              <div className="h-4 w-px bg-gray-300 mx-2" />

              <Button variant="ghost" size="icon" onClick={() => setShowStudies(!showStudies)}>
                <Activity size={16} />
              </Button>

              <Button variant="ghost" size="icon">
                <Layout size={16} />
              </Button>

              <Button variant="ghost" size="icon">
                <Eye size={16} />
              </Button>

              <Button variant="ghost" size="icon">
                <Calendar size={16} />
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon">
                <Settings size={16} />
              </Button>

              <Button variant="ghost" size="icon">
                <PenTool size={16} />
              </Button>

              <Button variant="ghost" size="icon">
                <Camera size={16} />
              </Button>

              <Button variant="ghost" size="icon">
                <Maximize2 size={16} />
              </Button>

              <Button variant="ghost" size="icon">
                <ZoomIn size={16} />
              </Button>
            </div>
          </div>
          <div className="flex items-center space-x-1 px-4 py-2 overflow-x-auto border-b border-gray-200">
            {timeIntervals.map((interval) => (
              <Button
                key={interval}
                variant={timeInterval === interval ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setTimeInterval(interval)}
              >
                {interval}
              </Button>
            ))}
          </div>
          <div className="flex-1 p-4">
            {renderChart()}
          </div>
          {showStudies && (
            <div className="absolute top-12 right-0 w-64 bg-white border rounded-lg shadow-lg p-4 z-50">
              <div className="relative mb-4">
                <Input
                  type="text"
                  placeholder="Search studies..."
                  value={searchStudy}
                  onChange={(e) => setSearchStudy(e.target.value)}
                />
                <Search size={16} className="absolute right-3 top-2.5 text-gray-400" />
              </div>

              <div className="space-y-1 max-h-96 overflow-y-auto">
                {studies.filter(study =>
                  study.toLowerCase().includes(searchStudy.toLowerCase())
                ).map((study) => (
                  <Button
                    key={study}
                    variant="ghost"
                    className="w-full justify-start"
                  >
                    {study}
                  </Button>
                ))}
              </div>
            </div>
          )}
          {showChartTypes && (
            <div className="absolute top-12 left-4 bg-white border rounded-lg shadow-lg p-4 z-50 w-64">
              <h3 className="text-xs text-gray-500 mb-2">Chart Types</h3>
              <div className="space-y-1">
                {["Candle", "Bar", "Line", "Mountain", "Baseline"].map((type) => (
                  <Button
                    key={type}
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => setChartType(type.toLowerCase() as any)}
                  >
                    <BarChart2 size={16} className="mr-2" />
                    {type}
                  </Button>
                ))}
              </div>

              <h3 className="text-xs text-gray-500 mt-4 mb-2">Aggregated Types</h3>
              <div className="space-y-1">
                {["Heikin Ashi", "Kagi", "Renko"].map((type) => (
                  <Button
                    key={type}
                    variant="ghost"
                    className="w-full justify-between"
                  >
                    <span className="flex items-center">
                      <BarChart2 size={16} className="mr-2" />
                      {type}
                    </span>
                    <Settings size={14} className="text-gray-400" />
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

