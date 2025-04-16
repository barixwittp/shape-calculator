import { ThreeDShape, type ShapeParameters } from "./shape"

export class Cone extends ThreeDShape {
  constructor(
    private radius: number,
    private height: number,
  ) {
    super()
    this.validatePositive(radius, "Radius")
    this.validatePositive(height, "Height")
  }

  volume(): number {
    return (1 / 3) * Math.PI * Math.pow(this.radius, 2) * this.height
  }

  surfaceArea(): number {
    // πr² + πr√(r² + h²)
    const slantHeight = Math.sqrt(Math.pow(this.radius, 2) + Math.pow(this.height, 2))
    return Math.PI * Math.pow(this.radius, 2) + Math.PI * this.radius * slantHeight
  }

  area(): number {
    // For consistency with 2D shapes, area returns the surface area
    return this.surfaceArea()
  }

  perimeter(): number {
    // Circumference of the circular base
    return 2 * Math.PI * this.radius
  }

  getParameters(): ShapeParameters {
    return {
      radius: this.radius,
      height: this.height,
    }
  }
}

