"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Square } from "@/lib/shapes/square"
import type { Shape } from "@/lib/shapes/shape"

interface SquareFormProps {
  onCalculate: (shape: Shape) => void
}

export default function SquareForm({ onCalculate }: SquareFormProps) {
  const [side, setSide] = useState<string>("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const sideValue = Number.parseFloat(side)
    const square = new Square(sideValue)
    onCalculate(square)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="side">Side Length</Label>
        <Input
          id="side"
          type="number"
          step="any"
          placeholder="Enter side length"
          value={side}
          onChange={(e) => setSide(e.target.value)}
          required
        />
      </div>
      <Button type="submit" className="w-full">
        Calculate
      </Button>
    </form>
  )
}

