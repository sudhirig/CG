"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/trading/dashboard-layout"
import { KeyMetricsSummary } from "@/components/trading/key-metrics-summary"
import { PortfolioChart } from "@/components/trading/portfolio-chart"
import { RecentActivityFeed } from "@/components/trading/recent-activity-feed"
import { NotificationCenter } from "@/components/trading/notification-center"
import { QuickTradePanel } from "@/components/trading/quick-trade-panel"
import { MarketDataWidget } from "@/components/trading/market-data-widget"
import { AlertsWidget } from "@/components/trading/alerts-widget"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { Tooltip } from "@/components/ui/tooltip"
import { TooltipProvider } from "@/components/ui/tooltip"

const defaultLayout = [
  { id: "keyMetrics", component: KeyMetricsSummary },
  { id: "portfolioChart", component: PortfolioChart },
  { id: "quickTrade", component: QuickTradePanel },
  { id: "recentActivity", component: RecentActivityFeed },
  { id: "notifications", component: NotificationCenter },
  { id: "marketData", component: MarketDataWidget },
  { id: "alerts", component: AlertsWidget },
]

export default function DashboardPage() {
  const [layout, setLayout] = useState(defaultLayout)

  const onDragEnd = (result) => {
    if (!result.destination) return
    const items = Array.from(layout)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)
    setLayout(items)
  }

  return (
    <TooltipProvider>
      <DashboardLayout>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="dashboard">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
              >
                {layout.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="relative"
                      >
                        <Tooltip content="Drag to reorder">
                          <div className="absolute top-0 right-0 p-2 cursor-move">
                            ⋮⋮
                          </div>
                        </Tooltip>
                        <item.component />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </DashboardLayout>
    </TooltipProvider>
  )
}

