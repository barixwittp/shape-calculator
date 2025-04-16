"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Rhombus } from "@/lib/shapes/rhombus"
import type { Shape } from "@/lib/shapes/shape"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { InfoIcon } from "lucide-react"

interface RhombusFormProps {
  onCalculate: (shape: Shape) => void
}

export default function RhombusForm({ onCalculate }: RhombusFormProps) {
  const [side, setSide] = useState<string>("")
  const [diagonal1, setDiagonal1] = useState<string>("")
  const [diagonal2, setDiagonal2] = useState<string>("")
  const [validationError, setValidationError] = useState<string>("")

  const validateInputs = (): boolean => {
    const sideValue = Number.parseFloat(side)
    const diagonal1Value = Number.parseFloat(diagonal1)
    const diagonal2Value = Number.parseFloat(diagonal2)

    if (isNaN(sideValue) || isNaN(diagonal1Value) || isNaN(diagonal2Value)) {
      setValidationError("All fields must contain valid numbers")
      return false
    }

    if (sideValue <= 0 || diagonal1Value <= 0 || diagonal2Value <= 0) {
      setValidationError("All values must be positive")
      return false
    }

    // Check if the diagonals and side length are compatible
    // Using the formula: 4 * side^2 = diagonal1^2 + diagonal2^2
    const leftSide = 4 * Math.pow(sideValue, 2)
    const rightSide = Math.pow(diagonal1Value, 2) + Math.pow(diagonal2Value, 2)

    // Allow for some floating point imprecision
    if (Math.abs(leftSide - rightSide) > 0.001 * leftSide) {
      setValidationError(
        "Invalid rhombus dimensions: The diagonals and side length are incompatible.\n" +
          `For a rhombus, 4 * side^2 should equal diagonal1^2 + diagonal2^2.`,
      )
      return false
    }

    setValidationError("")
    return true
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateInputs()) {
      try {
        const rhombus = new Rhombus(Number.parseFloat(side), Number.parseFloat(diagonal1), Number.parseFloat(diagonal2))
        onCalculate(rhombus)
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
            <Label htmlFor="side">Side Length</Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <InfoIcon className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">All sides of a rhombus have equal length</p>
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
            <Label htmlFor="diagonal1">Diagonal 1</Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <InfoIcon className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">First diagonal connecting opposite vertices</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <Input
            id="diagonal1"
            type="number"
            step="any"
            placeholder="Enter first diagonal"
            value={diagonal1}
            onChange={(e) => {
              setDiagonal1(e.target.value)
              setValidationError("")
            }}
            required
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="diagonal2">Diagonal 2</Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <InfoIcon className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">Second diagonal connecting opposite vertices</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <Input
            id="diagonal2"
            type="number"
            step="any"
            placeholder="Enter second diagonal"
            value={diagonal2}
            onChange={(e) => {
              setDiagonal2(e.target.value)
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

