import { ThreeDShape, type ShapeParameters } from "./shape"

export class Sphere extends ThreeDShape {
  constructor(private radius: number) {
    super()
    this.validatePositive(radius, "Radius")
  }

  volume(): number {
    return (4 / 3) * Math.PI * Math.pow(this.radius, 3)
  }

  surfaceArea(): number {
    return 4 * Math.PI * Math.pow(this.radius, 2)
  }

  area(): number {
    // For consistency with 2D shapes, area returns the surface area
    return this.surfaceArea()
  }

  perimeter(): number {
    // For a sphere, perimeter is not well-defined
    // Using the great circle circumference as an equivalent
    return 2 * Math.PI * this.radius
  }

  getParameters(): ShapeParameters {
    return {
      radius: this.radius,
    }
  }
}

