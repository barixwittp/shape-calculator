import { ThreeDShape, type ShapeParameters } from "./shape"

export class Cube extends ThreeDShape {
  constructor(private side: number) {
    super()
    this.validatePositive(side, "Side length")
  }

  volume(): number {
    return Math.pow(this.side, 3)
  }

  surfaceArea(): number {
    return 6 * Math.pow(this.side, 2)
  }

  area(): number {
    // For consistency with 2D shapes, area returns the surface area
    return this.surfaceArea()
  }

  perimeter(): number {
    // Sum of all edges
    return 12 * this.side
  }

  getParameters(): ShapeParameters {
    return {
      side: this.side,
    }
  }
}

