"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Pyramid } from "@/lib/shapes/pyramid"
import type { Shape } from "@/lib/shapes/shape"

interface PyramidFormProps {
  onCalculate: (shape: Shape) => void
}

export default function PyramidForm({ onCalculate }: PyramidFormProps) {
  const [baseLength, setBaseLength] = useState<string>("")
  const [height, setHeight] = useState<string>("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const baseLengthValue = Number.parseFloat(baseLength)
    const heightValue = Number.parseFloat(height)
    const pyramid = new Pyramid(baseLengthValue, heightValue)
    onCalculate(pyramid)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="baseLength">Base Length</Label>
        <Input
          id="baseLength"
          type="number"
          step="any"
          placeholder="Enter base length"
          value={baseLength}
          onChange={(e) => setBaseLength(e.target.value)}
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

