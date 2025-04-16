"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Prism } from "@/lib/shapes/prism"
import type { Shape } from "@/lib/shapes/shape"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { InfoIcon } from "lucide-react"

interface PrismFormProps {
  onCalculate: (shape: Shape) => void
}

export default function PrismForm({ onCalculate }: PrismFormProps) {
  const [baseArea, setBaseArea] = useState<string>("")
  const [perimeter, setPerimeter] = useState<string>("")
  const [height, setHeight] = useState<string>("")
  const [validationError, setValidationError] = useState<string>("")

  const validateInputs = (): boolean => {
    const baseAreaValue = Number.parseFloat(baseArea)
    const perimeterValue = Number.parseFloat(perimeter)
    const heightValue = Number.parseFloat(height)

    if (isNaN(baseAreaValue) || isNaN(perimeterValue) || isNaN(heightValue)) {
      setValidationError("All fields must contain valid numbers")
      return false
    }

    if (baseAreaValue <= 0 || perimeterValue <= 0 || heightValue <= 0) {
      setValidationError("All values must be positive")
      return false
    }

    setValidationError("")
    return true
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateInputs()) {
      try {
        const prism = new Prism(Number.parseFloat(baseArea), Number.parseFloat(perimeter), Number.parseFloat(height))
        onCalculate(prism)
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
            <Label htmlFor="baseArea">Base Area</Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <InfoIcon className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">The area of the base of the prism</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <Input
            id="baseArea"
            type="number"
            step="any"
            placeholder="Enter base area"
            value={baseArea}
            onChange={(e) => {
              setBaseArea(e.target.value)
              setValidationError("")
            }}
            required
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="perimeter">Base Perimeter</Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <InfoIcon className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">The perimeter of the base of the prism</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <Input
            id="perimeter"
            type="number"
            step="any"
            placeholder="Enter base perimeter"
            value={perimeter}
            onChange={(e) => {
              setPerimeter(e.target.value)
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
                <p className="max-w-xs">The height of the prism</p>
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

        <Button type="submit" className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90">
          Calculate
        </Button>
      </form>
    </TooltipProvider>
  )
}

