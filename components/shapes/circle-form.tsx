"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Circle } from "@/lib/shapes/circle"
import type { Shape } from "@/lib/shapes/shape"

interface CircleFormProps {
  onCalculate: (shape: Shape) => void
}

export default function CircleForm({ onCalculate }: CircleFormProps) {
  const [radius, setRadius] = useState<string>("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const radiusValue = Number.parseFloat(radius)
    const circle = new Circle(radiusValue)
    onCalculate(circle)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="radius">Radius</Label>
        <Input
          id="radius"
          type="number"
          step="any"
          placeholder="Enter radius"
          value={radius}
          onChange={(e) => setRadius(e.target.value)}
          required
        />
      </div>
      <Button type="submit" className="w-full">
        Calculate
      </Button>
    </form>
  )
}

