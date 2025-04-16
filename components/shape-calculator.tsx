"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Separator } from "@/components/ui/separator"
import { Search, Download, Moon, Sun, Save, Calculator, RefreshCw } from "lucide-react"
import { useTheme } from "next-themes"
import type { Shape, ShapeResult } from "@/lib/shapes/shape"
import ShapeSelector from "@/components/shapes/shape-selector"
import ShapeVisualizer from "@/components/shapes/shape-visualizer"
import ThreeDShapeVisualizer from "@/components/shapes/three-d-shape-visualizer"
import ComparisonView from "@/components/shapes/comparison-view"
import { exportToPDF, exportToCSV, exportToImage } from "@/lib/export-utils"
import { saveToHistory, getHistory, getSavedResults, saveResult } from "@/lib/history-utils"
import ScientificCalculator from "@/components/scientific-calculator"
import { TooltipProvider } from "@/components/ui/tooltip"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { useMediaQuery } from "@/hooks/use-media-query"
import { SavedResults } from "@/components/saved-results"

export default function ShapeCalculator() {
  const [activeTab, setActiveTab] = useState("2d")
  const [searchQuery, setSearchQuery] = useState("")
  const [result, setResult] = useState<ShapeResult | null>(null)
  const [comparisonMode, setComparisonMode] = useState(false)
  const [comparisonResults, setComparisonResults] = useState<ShapeResult[]>([])
  const [isListening, setIsListening] = useState(false)
  const [history, setHistory] = useState<ShapeResult[]>([])
  const [savedResults, setSavedResults] = useState<ShapeResult[]>([])
  const [showScientificCalc, setShowScientificCalc] = useState(false)
  const visualizerRef = useRef<HTMLDivElement>(null)
  const { theme, setTheme } = useTheme()
  const isDesktop = useMediaQuery("(min-width: 768px)")

  useEffect(() => {
    setHistory(getHistory())
    setSavedResults(getSavedResults())
  }, [])

  const handleCalculate = (shape: Shape) => {
    try {
      const area = shape.area()
      const perimeter = shape.perimeter()
      const volume = "volume" in shape ? shape.volume() : undefined
      const surfaceArea = "surfaceArea" in shape ? shape.surfaceArea() : undefined

      const result: ShapeResult = {
        id: Date.now().toString(),
        shapeName: shape.constructor.name,
        area,
        perimeter,
        volume,
        surfaceArea,
        parameters: shape.getParameters(),
        error: null,
        timestamp: new Date().toISOString(),
      }

      setResult(result)

      if (comparisonMode) {
        setComparisonResults((prev) => [...prev, result])
      }

      saveToHistory(result)
      setHistory(getHistory())
    } catch (error) {
      const errorResult: ShapeResult = {
        id: Date.now().toString(),
        shapeName: shape.constructor.name,
        area: 0,
        perimeter: 0,
        parameters: shape.getParameters(),
        error: error instanceof Error ? error.message : "An unknown error occurred",
        timestamp: new Date().toISOString(),
      }
      setResult(errorResult)
    }
  }

  const handleExport = async (format: "pdf" | "csv" | "image") => {
    if (!result && comparisonResults.length === 0) {
      alert("No results to export.")
      return
    }

    try {
      switch (format) {
        case "pdf":
          if (comparisonMode && comparisonResults.length > 0) {
            await exportToPDF(comparisonResults)
          } else if (result) {
            await exportToPDF([result])
          }
          break
        case "csv":
          if (comparisonMode && comparisonResults.length > 0) {
            await exportToCSV(comparisonResults)
          } else if (result) {
            await exportToCSV([result])
          }
          break
        case "image":
          if (visualizerRef.current) {
            await exportToImage(visualizerRef.current)
          }
          break
        default:
          console.warn("Unknown export format:", format)
      }
    } catch (error) {
      console.error("Failed to export:", error)
      alert(`Failed to export: ${error}`)
    }
  }

  const handleSaveResult = () => {
    if (!result) return

    const updatedSavedResults = saveResult(result)
    setSavedResults(updatedSavedResults)
    alert("Result saved successfully!")
  }

  const handleResetCurrentCalculation = () => {
    setResult(null)
  }

  const SavedResultsDialog = () => {
    return isDesktop ? (
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:opacity-90 dark:from-purple-600 dark:to-indigo-600"
          >
            Saved Results
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Saved Results</DialogTitle>
            <DialogDescription>Your saved shape calculations</DialogDescription>
          </DialogHeader>
          <SavedResults savedResults={savedResults} />
        </DialogContent>
      </Dialog>
    ) : (
      <Drawer>
        <DrawerTrigger asChild>
          <Button
            variant="outline"
            className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:opacity-90 dark:from-purple-600 dark:to-indigo-600"
          >
            Saved Results
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle>Saved Results</DrawerTitle>
            <DrawerDescription>Your saved shape calculations</DrawerDescription>
          </DrawerHeader>
          <div className="px-4 pb-4">
            <SavedResults savedResults={savedResults} />
          </div>
        </DrawerContent>
      </Drawer>
    )
  }

  const ScientificCalcDialog = () => {
    return isDesktop ? (
      <Dialog open={showScientificCalc} onOpenChange={setShowScientificCalc}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="bg-gradient-to-r from-green-500 to-teal-500 text-white hover:opacity-90 dark:from-green-600 dark:to-teal-600"
          >
            <Calculator className="h-4 w-4 mr-2" />
            Scientific Calculator
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Scientific Calculator</DialogTitle>
            <DialogDescription>Perform advanced calculations</DialogDescription>
          </DialogHeader>
          <ScientificCalculator />
        </DialogContent>
      </Dialog>
    ) : (
      <Drawer open={showScientificCalc} onOpenChange={setShowScientificCalc}>
        <DrawerTrigger asChild>
          <Button
            variant="outline"
            className="bg-gradient-to-r from-green-500 to-teal-500 text-white hover:opacity-90 dark:from-green-600 dark:to-teal-600"
          >
            <Calculator className="h-4 w-4 mr-2" />
            Scientific Calculator
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle>Scientific Calculator</DrawerTitle>
            <DrawerDescription>Perform advanced calculations</DrawerDescription>
          </DrawerHeader>
          <div className="px-4 pb-4">
            <ScientificCalculator />
          </div>
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <TooltipProvider>
      <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-100 to-white dark:from-slate-900 dark:to-slate-800 min-h-screen py-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 p-4 rounded-lg">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
            <div className="relative w-full sm:w-[200px]">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search shapes..."
                className="pl-8 bg-white dark:bg-slate-800"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <ToggleGroup
              type="single"
              value={activeTab}
              onValueChange={(value) => value && setActiveTab(value)}
              className="flex-wrap justify-start"
            >
              <ToggleGroupItem
                value="2d"
                className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white data-[state=on]:opacity-100 opacity-70 dark:from-blue-600 dark:to-indigo-600"
              >
                2D Shapes
              </ToggleGroupItem>
              <ToggleGroupItem
                value="3d"
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white data-[state=on]:opacity-100 opacity-70 dark:from-purple-600 dark:to-pink-600"
              >
                3D Shapes
              </ToggleGroupItem>
            </ToggleGroup>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end flex-wrap">
            <div className="flex items-center gap-2">
              <Switch id="comparison-mode" checked={comparisonMode} onCheckedChange={setComparisonMode} />
              <Label htmlFor="comparison-mode">Comparison</Label>
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white hover:opacity-90 dark:from-orange-600 dark:to-yellow-600"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 justify-between">
          <ScientificCalcDialog />
          <SavedResultsDialog />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-1 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-blue-200 dark:border-blue-800">
            <CardHeader>
              <CardTitle>Select a Shape</CardTitle>
              <CardDescription>Choose a shape and enter its dimensions</CardDescription>
            </CardHeader>
            <CardContent>
              <ShapeSelector searchQuery={searchQuery} activeTab={activeTab} onCalculate={handleCalculate} />
            </CardContent>
          </Card>

          <Card className="lg:col-span-2 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 border-purple-200 dark:border-purple-800">
            <CardHeader className="flex flex-row items-center justify-between flex-wrap gap-4">
              <div>
                <CardTitle>Visualization & Results</CardTitle>
                <CardDescription>Visual representation and calculations</CardDescription>
              </div>
              <div className="flex flex-wrap gap-2">
                {!comparisonMode && result && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleResetCurrentCalculation}
                    className="bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:opacity-90 dark:from-amber-600 dark:to-orange-600"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Reset
                  </Button>
                )}
                <Select onValueChange={(value) => handleExport(value as "pdf" | "csv" | "image")}>
                  <SelectTrigger className="w-[130px] bg-gradient-to-r from-emerald-500 to-teal-500 text-white dark:from-emerald-600 dark:to-teal-600">
                    <Download className="h-4 w-4 mr-2" />
                    <span>Export</span>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">Export as PDF</SelectItem>
                    <SelectItem value="csv">Export as CSV</SelectItem>
                    <SelectItem value="image">Export as Image</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSaveResult}
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:opacity-90 dark:from-cyan-600 dark:to-blue-600"
                  disabled={!result || !!result.error}
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div ref={visualizerRef} className="space-y-6">
                {comparisonMode ? (
                  <ComparisonView
                    results={comparisonResults}
                    onClear={() => setComparisonResults([])}
                    onReset={() => setResult(null)}
                  />
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border rounded-md p-4 flex items-center justify-center min-h-[300px] bg-white dark:bg-slate-800">
                      {result &&
                        (activeTab === "2d" ? (
                          <ShapeVisualizer result={result} />
                        ) : (
                          <ThreeDShapeVisualizer result={result} />
                        ))}
                    </div>
                    <div>
                      {result ? (
                        result.error ? (
                          <div className="p-4 border border-red-200 bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 dark:border-red-800 rounded-md text-red-600 dark:text-red-400">
                            <p className="font-medium">Error</p>
                            <p>{result.error}</p>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            <div>
                              <p className="text-lg font-medium">{result.shapeName}</p>
                              <p className="text-sm text-muted-foreground">
                                {Object.entries(result.parameters || {})
                                  .map(([key, value]) => `${key}: ${value}`)
                                  .join(", ")}
                              </p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              {activeTab === "2d" ? (
                                <>
                                  <div className="p-4 border rounded-md bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
                                    <p className="text-sm text-muted-foreground">Area</p>
                                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                      {result.area.toFixed(2)}
                                    </p>
                                  </div>
                                  <div className="p-4 border rounded-md bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
                                    <p className="text-sm text-muted-foreground">Perimeter</p>
                                    <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                                      {result.perimeter.toFixed(2)}
                                    </p>
                                  </div>
                                </>
                              ) : (
                                <>
                                  <div className="p-4 border rounded-md bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20">
                                    <p className="text-sm text-muted-foreground">Volume</p>
                                    <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                                      {result.volume?.toFixed(2) || "N/A"}
                                    </p>
                                  </div>
                                  <div className="p-4 border rounded-md bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20">
                                    <p className="text-sm text-muted-foreground">Surface Area</p>
                                    <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                                      {result.surfaceArea?.toFixed(2) || "N/A"}
                                    </p>
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                        )
                      ) : (
                        <div className="flex items-center justify-center h-40 text-muted-foreground">
                          Select a shape and enter dimensions to see results
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {history.length > 0 && (
                <div className="mt-6">
                  <Separator className="my-4" />
                  <h3 className="text-lg font-medium mb-2">Calculation History</h3>
                  <div className="max-h-[200px] overflow-y-auto rounded-md border bg-white dark:bg-slate-800">
                    <table className="w-full text-sm">
                      <thead className="bg-slate-50 dark:bg-slate-700 sticky top-0">
                        <tr>
                          <th className="text-left p-2 font-medium">Shape</th>
                          <th className="text-left p-2 font-medium">Parameters</th>
                          <th className="text-left p-2 font-medium">Area</th>
                          <th className="text-left p-2 font-medium">Perimeter</th>
                          <th className="text-left p-2 font-medium">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {history.map((item) => (
                          <tr key={item.id} className="border-t hover:bg-slate-50 dark:hover:bg-slate-700/50">
                            <td className="p-2">{item.shapeName}</td>
                            <td className="p-2">
                              {Object.entries(item.parameters || {})
                                .map(([key, value]) => `${key}: ${value}`)
                                .join(", ")}
                            </td>
                            <td className="p-2">{item.area.toFixed(2)}</td>
                            <td className="p-2">{item.perimeter.toFixed(2)}</td>
                            <td className="p-2">{new Date(item.timestamp).toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </TooltipProvider>
  )
}

