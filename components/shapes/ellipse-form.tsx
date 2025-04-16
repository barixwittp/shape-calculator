"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Ellipse } from "@/lib/shapes/ellipse"
import type { Shape } from "@/lib/shapes/shape"

interface EllipseFormProps {
  onCalculate: (shape: Shape) => void
}

export default function EllipseForm({ onCalculate }: EllipseFormProps) {
  const [radiusX, setRadiusX] = useState<string>("")
  const [radiusY, setRadiusY] = useState<string>("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const radiusXValue = Number.parseFloat(radiusX)
    const radiusYValue = Number.parseFloat(radiusY)
    const ellipse = new Ellipse(radiusXValue, radiusYValue)
    onCalculate(ellipse)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="radiusX">Radius X</Label>
        <Input
          id="radiusX"
          type="number"
          step="any"
          placeholder="Enter radius X"
          value={radiusX}
          onChange={(e) => setRadiusX(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="radiusY">Radius Y</Label>
        <Input
          id="radiusY"
          type="number"
          step="any"
          placeholder="Enter radius Y"
          value={radiusY}
          onChange={(e) => setRadiusY(e.target.value)}
          required
        />
      </div>
      <Button type="submit" className="w-full">
        Calculate
      </Button>
    </form>
  )
}

