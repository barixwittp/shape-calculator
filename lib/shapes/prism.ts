import { ThreeDShape, type ShapeParameters } from "./shape"

export class Prism extends ThreeDShape {
  constructor(
    private baseArea: number,
    private perimeter: number,
    private height: number,
  ) {
    super()
    this.validatePositive(baseArea, "Base Area")
    this.validatePositive(perimeter, "Perimeter")
    this.validatePositive(height, "Height")
  }

  volume(): number {
    return this.baseArea * this.height
  }

  surfaceArea(): number {
    // Surface area = 2 * base area + perimeter * height
    return 2 * this.baseArea + this.perimeter * this.height
  }

  area(): number {
    // For consistency with 2D shapes, area returns the surface area
    return this.surfaceArea()
  }

  perimeter(): number {
    // For a prism, using the perimeter of the base
    return this.perimeter
  }

  getParameters(): ShapeParameters {
    return {
      baseArea: this.baseArea,
      perimeter: this.perimeter,
      height: this.height,
    }
  }
}

