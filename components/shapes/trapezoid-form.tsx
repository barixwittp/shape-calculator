"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Trapezoid } from "@/lib/shapes/trapezoid"
import type { Shape } from "@/lib/shapes/shape"

interface TrapezoidFormProps {
  onCalculate: (shape: Shape) => void
}

export default function TrapezoidForm({ onCalculate }: TrapezoidFormProps) {
  const [topWidth, setTopWidth] = useState<string>("")
  const [bottomWidth, setBottomWidth] = useState<string>("")
  const [height, setHeight] = useState<string>("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const topWidthValue = Number.parseFloat(topWidth)
    const bottomWidthValue = Number.parseFloat(bottomWidth)
    const heightValue = Number.parseFloat(height)
    const trapezoid = new Trapezoid(topWidthValue, bottomWidthValue, heightValue)
    onCalculate(trapezoid)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="topWidth">Top Width</Label>
        <Input
          id="topWidth"
          type="number"
          step="any"
          placeholder="Enter top width"
          value={topWidth}
          onChange={(e) => setTopWidth(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="bottomWidth">Bottom Width</Label>
        <Input
          id="bottomWidth"
          type="number"
          step="any"
          placeholder="Enter bottom width"
          value={bottomWidth}
          onChange={(e) => setBottomWidth(e.target.value)}
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

