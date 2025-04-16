"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Parallelogram } from "@/lib/shapes/parallelogram"
import type { Shape } from "@/lib/shapes/shape"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { InfoIcon } from "lucide-react"

interface ParallelogramFormProps {
  onCalculate: (shape: Shape) => void
}

export default function ParallelogramForm({ onCalculate }: ParallelogramFormProps) {
  const [base, setBase] = useState<string>("")
  const [side, setSide] = useState<string>("")
  const [height, setHeight] = useState<string>("")
  const [validationError, setValidationError] = useState<string>("")

  const validateInputs = (): boolean => {
    const baseValue = Number.parseFloat(base)
    const sideValue = Number.parseFloat(side)
    const heightValue = Number.parseFloat(height)

    if (isNaN(baseValue) || isNaN(sideValue) || isNaN(heightValue)) {
      setValidationError("All fields must contain valid numbers")
      return false
    }

    if (baseValue <= 0 || sideValue <= 0 || heightValue <= 0) {
      setValidationError("All values must be positive")
      return false
    }

    if (heightValue > sideValue) {
      setValidationError("Height cannot be greater than the side length")
      return false
    }

    setValidationError("")
    return true
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateInputs()) {
      try {
        const parallelogram = new Parallelogram(
          Number.parseFloat(base),
          Number.parseFloat(side),
          Number.parseFloat(height),
        )
        onCalculate(parallelogram)
      } catch (error) {
        if (error instanceof Error) {
          setValidationError(error.message)
        }
      }
    }
  }

  return (
    <TooltipProvider>
      <form onSubmit={handleSubmit} className="space-y-4">
        {validationError && (
          <Alert variant="destructive">
            <AlertDescription>{validationError}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="base">Base</Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <InfoIcon className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">The length of the bottom side</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <Input
            id="base"
            type="number"
            step="any"
            placeholder="Enter base length"
            value={base}
            onChange={(e) => {
              setBase(e.target.value)
              setValidationError("")
            }}
            required
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="side">Side</Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <InfoIcon className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">The length of the non-parallel side</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <Input
            id="side"
            type="number"
            step="any"
            placeholder="Enter side length"
            value={side}
            onChange={(e) => {
              setSide(e.target.value)
              setValidationError("")
            }}
            required
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="height">Height</Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <InfoIcon className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">The perpendicular distance between parallel sides</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <Input
            id="height"
            type="number"
            step="any"
            placeholder="Enter height"
            value={height}
            onChange={(e) => {
              setHeight(e.target.value)
              setValidationError("")
            }}
            required
          />
        </div>

        <Button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:opacity-90">
          Calculate
        </Button>
      </form>
    </TooltipProvider>
  )
}

