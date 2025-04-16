"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Cylinder } from "@/lib/shapes/cylinder"
import type { Shape } from "@/lib/shapes/shape"

interface CylinderFormProps {
  onCalculate: (shape: Shape) => void
}

export default function CylinderForm({ onCalculate }: CylinderFormProps) {
  const [radius, setRadius] = useState<string>("")
  const [height, setHeight] = useState<string>("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const radiusValue = Number.parseFloat(radius)
    const heightValue = Number.parseFloat(height)
    const cylinder = new Cylinder(radiusValue, heightValue)
    onCalculate(cylinder)
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
      <div className="space-y-2">
        <Label htmlFor="height">Height</Label>
        <Input
          id="height"
          type="number"
          step="any"
          placeholder="Enter height"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          required
        />
      </div>
      <Button type="submit" className="w-full">
        Calculate
      </Button>
    </form>
  )
}

