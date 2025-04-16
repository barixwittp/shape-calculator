"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Triangle } from "@/lib/shapes/triangle"
import type { Shape } from "@/lib/shapes/shape"

interface TriangleFormProps {
  onCalculate: (shape: Shape) => void
}

export default function TriangleForm({ onCalculate }: TriangleFormProps) {
  const [sideA, setSideA] = useState<string>("")
  const [sideB, setSideB] = useState<string>("")
  const [sideC, setSideC] = useState<string>("")
  const [validationError, setValidationError] = useState<string>("")

  const validateSides = (a: number, b: number, c: number): boolean => {
    if (a <= 0 || b <= 0 || c <= 0) {
      setValidationError("All sides must be positive numbers")
      return false
    }
    if (a + b <= c || a + c <= b || b + c <= a) {
      setValidationError(
        "Invalid triangle dimensions: The sum of any two sides must be greater than the third side.\n" +
          `Current values: a=${a}, b=${b}, c=${c}`,
      )
      return false
    }
    setValidationError("")
    return true
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const sideAValue = Number.parseFloat(sideA)
    const sideBValue = Number.parseFloat(sideB)
    const sideCValue = Number.parseFloat(sideC)

    if (validateSides(sideAValue, sideBValue, sideCValue)) {
      try {
        const triangle = new Triangle(sideAValue, sideBValue, sideCValue)
        onCalculate(triangle)
      } catch (error) {
        if (error instanceof Error) {
          setValidationError(error.message)
        }
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {validationError && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{validationError}</AlertDescription>
        </Alert>
      )}
      <div className="space-y-2">
        <Label htmlFor="sideA">Side A</Label>
        <Input
          id="sideA"
          type="number"
          step="any"
          placeholder="Enter side A"
          value={sideA}
          onChange={(e) => {
            setSideA(e.target.value)
            setValidationError("")
          }}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="sideB">Side B</Label>
        <Input
          id="sideB"
          type="number"
          step="any"
          placeholder="Enter side B"
          value={sideB}
          onChange={(e) => {
            setSideB(e.target.value)
            setValidationError("")
          }}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="sideC">Side C</Label>
        <Input
          id="sideC"
          type="number"
          step="any"
          placeholder="Enter side C"
          value={sideC}
          onChange={(e) => {
            setSideC(e.target.value)
            setValidationError("")
          }}
          required
        />
      </div>
      <Button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:opacity-90">
        Calculate
      </Button>
    </form>
  )
}

