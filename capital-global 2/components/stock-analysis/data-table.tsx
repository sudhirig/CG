"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export type Stock = {
  symbol: string
  name: string
  price: number
  change: number
  volume: number
  marketCap: number
  peRatio: number
}

export const columns: ColumnDef<Stock>[] = [
  {
    accessorKey: "symbol",
    header: "Symbol",
    cell: ({ row }) => <div className="font-medium">{row.getValue("symbol")}</div>,
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price)
      return <div className="font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "change",
    header: "Change",
    cell: ({ row }) => {
      const change = parseFloat(row.getValue("change"))
      return (
        <div className={change > 0 ? "text-green-600" : "text-red-600"}>
          {change > 0 ? "+" : ""}
          {change.toFixed(2)}%
        </div>
      )
    },
  },
  {
    accessorKey: "volume",
    header: "Volume",
    cell: ({ row }) => {
      const volume = parseInt(row.getValue("volume"))
      return <div>{volume.toLocaleString()}</div>
    },
  },
  {
    accessorKey: "marketCap",
    header: "Market Cap",
    cell: ({ row }) => {
      const marketCap = parseInt(row.getValue("marketCap"))
      return <div>{(marketCap / 1e9).toFixed(2)}B</div>
    },
  },
  {
    accessorKey: "peRatio",
    header: "P/E Ratio",
    cell: ({ row }) => {
      const peRatio = parseFloat(row.getValue("peRatio"))
      return <div>{peRatio.toFixed(2)}</div>
    },
  },
]

export function DataTable() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  // Mock data - in a real app, this would come from an API
  const data: Stock[] = [
    {
      symbol: "AAPL",
      name: "Apple Inc.",
      price: 175.43,
      change: 1.25,
      volume: 58932102,
      marketCap: 2800000000000,
      peRatio: 28.5,
    },
    {
      symbol: "MSFT",
      name: "Microsoft Corporation",
      price: 338.11,
      change: -0.75,
      volume: 22831092,
      marketCap: 2500000000000,
      peRatio: 35.2,
    },
    {
      symbol: "GOOGL",
      name: "Alphabet Inc.",
      price: 125.23,
      change: 2.15,
      volume: 15789234,
      marketCap: 1600000000000,
      peRatio: 25.1,
    },
    {
      symbol: "AMZN",
      name: "Amazon.com Inc.",
      price: 127.12,
      change: -1.50,
      volume: 35123987,
      marketCap: 1300000000000,
      peRatio: 66.8,
    },
    {
      symbol: "NVDA",
      name: "NVIDIA Corporation",
      price: 432.99,
      change: 3.75,
      volume: 42123456,
      marketCap: 1100000000000,
      peRatio: 112.3,
    },
  ]

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter symbols..."
          value={(table.getColumn("symbol")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("symbol")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

