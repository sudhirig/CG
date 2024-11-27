import { cn } from "@/lib/utils"

interface MarketStatusProps extends React.HTMLAttributes<HTMLDivElement> {
  status?: "open" | "closed" | "pre-open"
}

export function MarketStatus({ status = "open", className, ...props }: MarketStatusProps) {
  return (
    <div className={cn("flex items-center gap-2", className)} {...props}>
      <div
        className={cn(
          "h-2 w-2 rounded-full",
          status === "open" && "bg-green-500",
          status === "closed" && "bg-red-500",
          status === "pre-open" && "bg-yellow-500"
        )}
      />
      <span className="text-sm font-medium">
        {status === "open" && "Market Open"}
        {status === "closed" && "Market Closed"}
        {status === "pre-open" && "Pre-Open Session"}
      </span>
    </div>
  )
}

