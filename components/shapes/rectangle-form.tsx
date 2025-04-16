"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Rectangle } from "@/lib/shapes/rectangle"
import type { Shape } from "@/lib/shapes/shape"

interface RectangleFormProps {
  onCalculate: (shape: Shape) => void
}

export default function RectangleForm({ onCalculate }: RectangleFormProps) {
  const [length, setLength] = useState<string>("")
  const [width, setWidth] = useState<string>("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const lengthValue = Number.parseFloat(length)
    const widthValue = Number.parseFloat(width)
    const rectangle = new Rectangle(lengthValue, widthValue)
    onCalculate(rectangle)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="length">Length</Label>
        <Input
          id="length"
          type="number"
          step="any"
          placeholder="Enter length"
          value={length}
          onChange={(e) => setLength(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="width">Width</Label>
        <Input
          id="width"
          type="number"
          step="any"
          placeholder="Enter width"
          value={width}
          onChange={(e) => setWidth(e.target.value)}
          required
        />
      </div>
      <Button type="submit" className="w-full">
        Calculate
      </Button>
    </form>
  )
}

