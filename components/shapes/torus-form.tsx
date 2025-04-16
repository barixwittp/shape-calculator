"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Torus } from "@/lib/shapes/torus"
import type { Shape } from "@/lib/shapes/shape"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { InfoIcon } from "lucide-react"

interface TorusFormProps {
  onCalculate: (shape: Shape) => void
}

export default function TorusForm({ onCalculate }: TorusFormProps) {
  const [majorRadius, setMajorRadius] = useState<string>("")
  const [minorRadius, setMinorRadius] = useState<string>("")
  const [validationError, setValidationError] = useState<string>("")

  const validateInputs = (): boolean => {
    const majorRadiusValue = Number.parseFloat(majorRadius)
    const minorRadiusValue = Number.parseFloat(minorRadius)

    if (isNaN(majorRadiusValue) || isNaN(minorRadiusValue)) {
      setValidationError("All fields must contain valid numbers")
      return false
    }

    if (majorRadiusValue <= 0 || minorRadiusValue <= 0) {
      setValidationError("All radii must be positive")
      return false
    }

    if (minorRadiusValue >= majorRadiusValue) {
      setValidationError("Minor radius must be less than major radius")
      return false
    }

    setValidationError("")
    return true
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateInputs()) {
      try {
        const torus = new Torus(Number.parseFloat(majorRadius), Number.parseFloat(minorRadius))
        onCalculate(torus)
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
            <Label htmlFor="majorRadius">Major Radius (R)</Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <InfoIcon className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">The distance from the center of the tube to the center of the torus</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <Input
            id="majorRadius"
            type="number"
            step="any"
            placeholder="Enter major radius"
            value={majorRadius}
            onChange={(e) => {
              setMajorRadius(e.target.value)
              setValidationError("")
            }}
            required
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="minorRadius">Minor Radius (r)</Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <InfoIcon className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">The radius of the tube (must be less than major radius)</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <Input
            id="minorRadius"
            type="number"
            step="any"
            placeholder="Enter minor radius"
            value={minorRadius}
            onChange={(e) => {
              setMinorRadius(e.target.value)
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

