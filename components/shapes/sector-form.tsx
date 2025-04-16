"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Sector } from "@/lib/shapes/sector"
import type { Shape } from "@/lib/shapes/shape"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { InfoIcon } from "lucide-react"

interface SectorFormProps {
  onCalculate: (shape: Shape) => void
}

export default function SectorForm({ onCalculate }: SectorFormProps) {
  const [radius, setRadius] = useState<string>("")
  const [angle, setAngle] = useState<string>("")
  const [validationError, setValidationError] = useState<string>("")

  const validateInputs = (): boolean => {
    const radiusValue = Number.parseFloat(radius)
    const angleValue = Number.parseFloat(angle)

    if (isNaN(radiusValue) || isNaN(angleValue)) {
      setValidationError("All fields must contain valid numbers")
      return false
    }

    if (radiusValue <= 0) {
      setValidationError("Radius must be positive")
      return false
    }

    if (angleValue <= 0 || angleValue > 360) {
      setValidationError("Angle must be between 0 and 360 degrees")
      return false
    }

    setValidationError("")
    return true
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateInputs()) {
      try {
        const sector = new Sector(Number.parseFloat(radius), Number.parseFloat(angle))
        onCalculate(sector)
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
            <Label htmlFor="radius">Radius</Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <InfoIcon className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">The radius of the circle that the sector is part of</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <Input
            id="radius"
            type="number"
            step="any"
            placeholder="Enter radius"
            value={radius}
            onChange={(e) => {
              setRadius(e.target.value)
              setValidationError("")
            }}
            required
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="angle">Angle (degrees)</Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <InfoIcon className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">The angle of the sector in degrees (0-360)</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <Input
            id="angle"
            type="number"
            step="any"
            min="0"
            max="360"
            placeholder="Enter angle in degrees"
            value={angle}
            onChange={(e) => {
              setAngle(e.target.value)
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

