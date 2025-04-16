export interface ShapeParameters {
  [key: string]: number
}

export interface ShapeResult {
  id: string
  shapeName: string
  area: number
  perimeter: number
  volume?: number
  surfaceArea?: number
  parameters: ShapeParameters
  error: string | null
  timestamp: string
}

export abstract class Shape {
  abstract area(): number
  abstract perimeter(): number
  abstract getParameters(): ShapeParameters

  protected validatePositive(value: number, name: string): void {
    if (value <= 0) {
      throw new Error(`${name} must be a positive number`)
    }
  }
}

export abstract class ThreeDShape extends Shape {
  abstract volume(): number
  abstract surfaceArea(): number
}

