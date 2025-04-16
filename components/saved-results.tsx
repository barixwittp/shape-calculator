"use client"

import type { ShapeResult } from "@/lib/shapes/shape"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { useState } from "react"
import { deleteSavedResult, clearSavedResults } from "@/lib/history-utils"

interface SavedResultsProps {
  savedResults: ShapeResult[]
}

export function SavedResults({ savedResults }: SavedResultsProps) {
  const [results, setResults] = useState(savedResults)

  const handleDelete = (id: string) => {
    const updatedResults = deleteSavedResult(id)
    setResults(updatedResults)
  }

  const handleClearAll = () => {
    const updatedResults = clearSavedResults()
    setResults(updatedResults)
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No saved results yet. Save a calculation to see it here.
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button variant="destructive" size="sm" onClick={handleClearAll}>
          Clear All
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto p-1">
        {results.map((result) => (
          <div
            key={result.id}
            className="border rounded-md p-4 bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium">{result.shapeName}</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDelete(result.id)}
                className="h-6 w-6 text-red-500 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900/20"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="text-sm space-y-1">
              <p className="text-muted-foreground">{new Date(result.timestamp).toLocaleString()}</p>

              <div className="space-y-1 mt-2">
                {Object.entries(result.parameters || {}).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="text-muted-foreground">{key}:</span>
                    <span>{value}</span>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-2 mt-3">
                <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
                  <p className="text-xs text-muted-foreground">Area</p>
                  <p className="font-medium">{result.area.toFixed(2)}</p>
                </div>
                <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded">
                  <p className="text-xs text-muted-foreground">Perimeter</p>
                  <p className="font-medium">{result.perimeter.toFixed(2)}</p>
                </div>

                {result.volume !== undefined && (
                  <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded">
                    <p className="text-xs text-muted-foreground">Volume</p>
                    <p className="font-medium">{result.volume.toFixed(2)}</p>
                  </div>
                )}

                {result.surfaceArea !== undefined && (
                  <div className="p-2 bg-amber-50 dark:bg-amber-900/20 rounded">
                    <p className="text-xs text-muted-foreground">Surface Area</p>
                    <p className="font-medium">{result.surfaceArea.toFixed(2)}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

