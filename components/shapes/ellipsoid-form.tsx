"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Ellipsoid } from "@/lib/shapes/ellipsoid"
import type { Shape } from "@/lib/shapes/shape"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { InfoIcon } from "lucide-react"

interface EllipsoidFormProps {
  onCalculate: (shape: Shape) => void
}

export default function EllipsoidForm({ onCalculate }: EllipsoidFormProps) {
  const [radiusX, setRadiusX] = useState<string>("")
  const [radiusY, setRadiusY] = useState<string>("")
  const [radiusZ, setRadiusZ] = useState<string>("")
  const [validationError, setValidationError] = useState<string>("")

  const validateInputs = (): boolean => {
    const radiusXValue = Number.parseFloat(radiusX)
    const radiusYValue = Number.parseFloat(radiusY)
    const radiusZValue = Number.parseFloat(radiusZ)

    if (isNaN(radiusXValue) || isNaN(radiusYValue) || isNaN(radiusZValue)) {
      setValidationError("All fields must contain valid numbers")
      return false
    }

    if (radiusXValue <= 0 || radiusYValue <= 0 || radiusZValue <= 0) {
      setValidationError("All radii must be positive")
      return false
    }

    setValidationError("")
    return true
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateInputs()) {
      try {
        const ellipsoid = new Ellipsoid(
          Number.parseFloat(radiusX),
          Number.parseFloat(radiusY),
          Number.parseFloat(radiusZ),
        )
        onCalculate(ellipsoid)
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
            <Label htmlFor="radiusX">Radius X</Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <InfoIcon className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">The semi-axis length in the X direction</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <Input
            id="radiusX"
            type="number"
            step="any"
            placeholder="Enter radius X"
            value={radiusX}
            onChange={(e) => {
              setRadiusX(e.target.value)
              setValidationError("")
            }}
            required
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="radiusY">Radius Y</Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <InfoIcon className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">The semi-axis length in the Y direction</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <Input
            id="radiusY"
            type="number"
            step="any"
            placeholder="Enter radius Y"
            value={radiusY}
            onChange={(e) => {
              setRadiusY(e.target.value)
              setValidationError("")
            }}
            required
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="radiusZ">Radius Z</Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <InfoIcon className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">The semi-axis length in the Z direction</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <Input
            id="radiusZ"
            type="number"
            step="any"
            placeholder="Enter radius Z"
            value={radiusZ}
            onChange={(e) => {
              setRadiusZ(e.target.value)
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

