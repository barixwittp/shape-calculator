"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RegularPolygon } from "@/lib/shapes/regular-polygon"
import type { Shape } from "@/lib/shapes/shape"

interface RegularPolygonFormProps {
  onCalculate: (shape: Shape) => void
}

export default function RegularPolygonForm({ onCalculate }: RegularPolygonFormProps) {
  const [sides, setSides] = useState<string>("")
  const [sideLength, setSideLength] = useState<string>("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const sidesValue = Number.parseInt(sides)
    const sideLengthValue = Number.parseFloat(sideLength)
    const polygon = new RegularPolygon(sidesValue, sideLengthValue)
    onCalculate(polygon)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="sides">Number of Sides</Label>
        <Input
          id="sides"
          type="number"
          min="3"
          step="1"
          placeholder="Enter number of sides"
          value={sides}
          onChange={(e) => setSides(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="sideLength">Side Length</Label>
        <Input
          id="sideLength"
          type="number"
          step="any"
          placeholder="Enter side length"
          value={sideLength}
          onChange={(e) => setSideLength(e.target.value)}
          required
        />
      </div>
      <Button type="submit" className="w-full">
        Calculate
      </Button>
    </form>
  )
}

