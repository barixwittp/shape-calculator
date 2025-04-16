import { ThreeDShape, type ShapeParameters } from "./shape"

export class Pyramid extends ThreeDShape {
  constructor(
    private baseLength: number,
    private height: number,
  ) {
    super()
    this.validatePositive(baseLength, "Base length")
    this.validatePositive(height, "Height")
  }

  volume(): number {
    // For a square base pyramid
    return (1 / 3) * Math.pow(this.baseLength, 2) * this.height
  }

  surfaceArea(): number {
    // Base area + 4 triangular faces
    const baseArea = Math.pow(this.baseLength, 2)

    // Calculate slant height using Pythagorean theorem
    const halfBase = this.baseLength / 2
    const slantHeight = Math.sqrt(Math.pow(this.height, 2) + Math.pow(halfBase, 2))

    // Area of each triangular face
    const triangleArea = (this.baseLength * slantHeight) / 2

    return baseArea + 4 * triangleArea
  }

  area(): number {
    // For consistency with 2D shapes, area returns the surface area
    return this.surfaceArea()
  }

  perimeter(): number {
    // Perimeter of the square base
    return 4 * this.baseLength
  }

  getParameters(): ShapeParameters {
    return {
      baseLength: this.baseLength,
      height: this.height,
    }
  }
}

