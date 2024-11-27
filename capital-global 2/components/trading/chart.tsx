"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs-custom"
import { BarChart2, Activity, Settings, Layout, Eye, Calendar, ChevronDown, Maximize2, PenTool, Camera, Plus, Minus, RotateCcw, Hash, LineChartIcon } from 'lucide-react'
import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Line,
  Area
} from 'recharts'

// Sample data - replace with real data in production
const stockData = [
  { time: '09:15', open: 1714.55, high: 1715.55, low: 1714.40, close: 1715.25, volume: 222, orders: 2 },
  { time: '09:16', open: 1714.50, high: 1715.60, low: 1714.35, close: 1715.40, volume: 338, orders: 1 },
  { time: '09:17', open: 1714.45, high: 1715.65, low: 1714.30, close: 1715.50, volume: 31, orders: 1 },
  { time: '09:18', open: 1714.40, high: 1715.70, low: 1714.25, close: 1715.60, volume: 86, orders: 6 },
  { time: '09:19', open: 1714.35, high: 1715.75, low: 1714.20, close: 1715.65, volume: 128, orders: 3 }
].map(candle => ({
  ...candle,
  wickRange: [candle.low, candle.high],
  bodyHeight: Math.abs(candle.close - candle.open),
  bodyBottom: Math.min(candle.close, candle.open),
  isGreen: candle.close >= candle.open,
  color: candle.close >= candle.open ? '#26A69A' : '#EF5350'
}));

const CustomTooltip = ({ active, payload, label, type }) => {
  if (!active || !payload?.[0]) return null;
  const data = payload[0].payload;

  return (
    <div className="bg-white border rounded shadow-lg p-2">
      <div className="text-xs space-y-1">
        <div className="font-semibold">{data.time}</div>
        {type === 'Candle' && (
          <>
            <div>O {data.open?.toFixed(2)}</div>
            <div>H {data.high?.toFixed(2)}</div>
            <div>L {data.low?.toFixed(2)}</div>
            <div>C {data.close?.toFixed(2)}</div>
          </>
        )}
        {type === 'Line' && (
          <div>Price: {data.close?.toFixed(2)}</div>
        )}
        <div className="border-t pt-1 mt-1">Vol: {data.volume}</div>
      </div>
    </div>
  );
};

const RenderChart = ({ type, data }) => {
  const yDomain = [
    Math.min(...data.map(d => d.low)) - 1,
    Math.max(...data.map(d => d.high)) + 1
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
        <XAxis 
          dataKey="time"
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 10 }}
        />
        <YAxis 
          orientation="right"
          domain={yDomain}
          axisLine={false}
          tickLine={false}
          tickFormatter={(value) => value.toFixed(2)}
          tick={{ fontSize: 10 }}
          width={60}
        />
        <Tooltip content={(props) => <CustomTooltip {...props} type={type} />} />

        {type === 'Candle' && data.map((candle, index) => (
          <React.Fragment key={index}>
            <Bar
              dataKey="low"
              data={[{
                time: candle.time,
                low: candle.high - candle.low,
                y: candle.low
              }]}
              fill={candle.color}
              stroke={candle.color}
              barSize={1}
            />
            <Bar
              dataKey="bodyHeight"
              data={[{
                time: candle.time,
                bodyHeight: candle.bodyHeight,
                y: candle.bodyBottom
              }]}
              fill={candle.color}
              stroke={candle.color}
              barSize={6}
            />
          </React.Fragment>
        ))}

        {type === 'Line' && (
          <Line 
            type="monotone" 
            dataKey="close" 
            stroke="#2196F3" 
            dot={false}
            strokeWidth={2}
          />
        )}

        {type === 'Bar' && data.map((item, index) => (
          <Bar
            key={index}
            dataKey="close"
            data={[item]}
            fill={item.color}
            stroke={item.color}
            barSize={6}
          />
        ))}

        {type === 'Area' && (
          <>
            <defs>
              <linearGradient id="colorClose" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2196F3" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#2196F3" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <Area 
              type="monotone" 
              dataKey="close" 
              stroke="#2196F3" 
              fill="url(#colorClose)"
              dot={false}
            />
          </>
        )}
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export function Chart() {
  const [selectedInterval, setSelectedInterval] = useState('1D')
  const [showChartTypes, setShowChartTypes] = useState(false)
  const [chartType, setChartType] = useState('Candle')

  const timeIntervals = [
    "1 Min", "2 Min", "3 Min", "4 Min", "5 Min", 
    "10 Min", "15 Min", "30 Min",
    "1 Hour", "2 Hours", "3 Hours", "4 Hours",
    "1 D", "1 W", "1 Mo", "Custom"
  ];

  const chartTypes = [
    { name: "Candle", icon: BarChart2 },
    { name: "Bar", icon: BarChart2 },
    { name: "Line", icon: LineChartIcon },
    { name: "Area", icon: Hash }
  ];

  return (
    <div className="flex h-full flex-col border rounded-lg overflow-hidden">
      <div className="flex items-center justify-between border-b p-2">
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowChartTypes(!showChartTypes)}
              className="flex items-center"
            >
              <BarChart2 className="mr-2 h-4 w-4" />
              {chartType}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
            {showChartTypes && (
              <div className="absolute top-full left-0 mt-1 bg-white border rounded-lg shadow-lg p-2 w-48 z-50">
                {chartTypes.map(({ name, icon: Icon }) => (
                  <Button
                    key={name}
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => {
                      setChartType(name);
                      setShowChartTypes(false);
                    }}
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    {name}
                  </Button>
                ))}
              </div>
            )}
          </div>
          <Button variant="ghost" size="icon">
            <Activity className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Layout className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Eye className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Calendar className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <PenTool className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Camera className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Maximize2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="flex items-center space-x-1 px-4 py-2 overflow-x-auto border-b">
        <Tabs value={selectedInterval} onValueChange={setSelectedInterval} className="h-8">
          <TabsList className="h-8">
            {timeIntervals.map((interval) => (
              <TabsTrigger
                key={interval}
                value={interval}
                className="px-2 py-1 text-xs"
              >
                {interval}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
      <div className="flex-1 p-4">
        <RenderChart type={chartType} data={stockData} />
      </div>
      <div className="absolute bottom-4 right-4 flex flex-col space-y-2 z-10">
        <Button variant="outline" size="icon" className="rounded-full">
          <Plus className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" className="rounded-full">
          <Minus className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" className="rounded-full">
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>
      <div className="border-t p-2 flex justify-center space-x-4">
        {['1D', '5D', '1M', '3M', '6M', 'YTD', '1Y', '5Y', 'ALL'].map((range) => (
          <Button
            key={range}
            variant="ghost"
            size="sm"
            className="px-3 py-1 text-xs"
          >
            {range}
          </Button>
        ))}
      </div>
    </div>
  )
}

