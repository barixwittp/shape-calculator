"use client"

import { useRef, useState } from "react"
import type { ShapeResult } from "@/lib/shapes/shape"
import { Button } from "@/components/ui/button"
import { Trash2, Eye, EyeOff, RefreshCw } from "lucide-react"
import ShapeVisualizer from "./shape-visualizer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ComparisonViewProps {
  results: ShapeResult[]
  onClear: () => void
  onReset: () => void
}

export default function ComparisonView({ results, onClear, onReset }: ComparisonViewProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [viewMode, setViewMode] = useState<"all" | "single" | "dual">("all")
  const [selectedIndex, setSelectedIndex] = useState<number>(0)
  const [secondSelectedIndex, setSecondSelectedIndex] = useState<number>(1)

  if (results.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[300px] border rounded-md bg-white dark:bg-slate-800">
        <p className="text-muted-foreground mb-4">No shapes to compare</p>
        <p className="text-sm text-muted-foreground">Select shapes and calculate to add them to comparison</p>
      </div>
    )
  }

  const handleSelectShape = (index: number) => {
    if (viewMode === "dual") {
      if (index === selectedIndex) return
      setSecondSelectedIndex(index)
    } else {
      setSelectedIndex(index)
    }
  }

  const renderShapeCard = (result: ShapeResult, index: number) => {
    const isSelected = index === selectedIndex || index === secondSelectedIndex

    return (
      <Card
        key={index}
        className={`border rounded-md overflow-hidden transition-all ${
          viewMode !== "all" && isSelected ? "ring-2 ring-primary" : viewMode !== "all" ? "opacity-50" : ""
        }`}
        onClick={() => viewMode !== "all" && handleSelectShape(index)}
      >
        <CardHeader className="p-3 bg-slate-50 dark:bg-slate-800">
          <div className="flex justify-between items-center">
            <CardTitle className="text-sm font-medium">{result.shapeName}</CardTitle>
            {viewMode !== "all" && (
              <Badge variant={isSelected ? "default" : "outline"} className="text-xs">
                {isSelected ? "Selected" : "Click to select"}
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-4 bg-white dark:bg-slate-900">
          <div className="flex justify-center mb-2 h-[150px]">
            <ShapeVisualizer result={result} />
          </div>
          <div className="space-y-1 text-sm">
            {Object.entries(result.parameters || {}).map(([key, value]) => (
              <div key={key} className="flex justify-between">
                <span className="text-muted-foreground">{key}:</span>
                <span>{value}</span>
              </div>
            ))}
            <div className="flex justify-between font-medium">
              <span>Area:</span>
              <span>{result.area.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-medium">
              <span>Perimeter:</span>
              <span>{result.perimeter.toFixed(2)}</span>
            </div>
            {result.volume !== undefined && (
              <div className="flex justify-between font-medium">
                <span>Volume:</span>
                <span>{result.volume.toFixed(2)}</span>
              </div>
            )}
            {result.surfaceArea !== undefined && (
              <div className="flex justify-between font-medium">
                <span>Surface Area:</span>
                <span>{result.surfaceArea.toFixed(2)}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }

  const filteredResults = results.filter((_, index) => {
    if (viewMode === "all") return true
    if (viewMode === "single") return index === selectedIndex
    if (viewMode === "dual") return index === selectedIndex || index === secondSelectedIndex
    return true
  })

  return (
    <div className="space-y-4" ref={containerRef}>
      <div className="flex justify-between items-center flex-wrap gap-2">
        <h3 className="text-lg font-medium">Shape Comparison</h3>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onReset}
            className="bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800 dark:hover:bg-amber-900/50"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Reset Current
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onClear}
            className="bg-red-100 text-red-700 border-red-200 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800 dark:hover:bg-red-900/50"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Clear All
          </Button>
        </div>
      </div>

      <div className="bg-slate-100 p-3 rounded-md dark:bg-slate-800">
        <Tabs defaultValue="table" className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="table">Table View</TabsTrigger>
            <TabsTrigger value="cards">Card View</TabsTrigger>
          </TabsList>

          <TabsContent value="table" className="mt-0">
            <div className="overflow-x-auto rounded-md border bg-white dark:bg-slate-900">
              <table className="w-full border-collapse">
                <thead className="bg-slate-50 dark:bg-slate-800">
                  <tr>
                    <th className="text-left p-2 border">Shape</th>
                    <th className="text-left p-2 border">Parameters</th>
                    <th className="text-left p-2 border">Area</th>
                    <th className="text-left p-2 border">Perimeter</th>
                    {results.some((r) => r.volume !== undefined) && <th className="text-left p-2 border">Volume</th>}
                    {results.some((r) => r.surfaceArea !== undefined) && (
                      <th className="text-left p-2 border">Surface Area</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {results.map((result, index) => (
                    <tr key={index} className={index % 2 === 0 ? "bg-slate-50/50 dark:bg-slate-800/50" : ""}>
                      <td className="p-2 border font-medium">{result.shapeName}</td>
                      <td className="p-2 border">
                        {Object.entries(result.parameters || {}).map(([key, value]) => (
                          <div key={key}>
                            {key}: {value}
                          </div>
                        ))}
                      </td>
                      <td className="p-2 border">{result.area.toFixed(2)}</td>
                      <td className="p-2 border">{result.perimeter.toFixed(2)}</td>
                      {results.some((r) => r.volume !== undefined) && (
                        <td className="p-2 border">{result.volume?.toFixed(2) || "N/A"}</td>
                      )}
                      {results.some((r) => r.surfaceArea !== undefined) && (
                        <td className="p-2 border">{result.surfaceArea?.toFixed(2) || "N/A"}</td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          <TabsContent value="cards" className="mt-0">
            <div className="flex justify-end mb-3 gap-2">
              <Button
                variant={viewMode === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("all")}
                className="flex items-center"
              >
                <Eye className="h-4 w-4 mr-2" />
                All Shapes
              </Button>
              <Button
                variant={viewMode === "single" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("single")}
                className="flex items-center"
                disabled={results.length === 0}
              >
                <EyeOff className="h-4 w-4 mr-2" />
                Single View
              </Button>
              <Button
                variant={viewMode === "dual" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("dual")}
                className="flex items-center"
                disabled={results.length < 2}
              >
                <Eye className="h-4 w-4 mr-2" />
                Compare Two
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {viewMode === "all"
                ? results.map((result, index) => renderShapeCard(result, index))
                : filteredResults.map((result, index) => {
                    const originalIndex = results.findIndex((r) => r.id === result.id)
                    return renderShapeCard(result, originalIndex)
                  })}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

