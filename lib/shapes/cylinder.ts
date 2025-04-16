import { ThreeDShape, type ShapeParameters } from "./shape"

export class Cylinder extends ThreeDShape {
  constructor(
    private radius: number,
    private height: number,
  ) {
    super()
    this.validatePositive(radius, "Radius")
    this.validatePositive(height, "Height")
  }

  volume(): number {
    return Math.PI * Math.pow(this.radius, 2) * this.height
  }

  surfaceArea(): number {
    // 2πr² + 2πrh
    return 2 * Math.PI * Math.pow(this.radius, 2) + 2 * Math.PI * this.radius * this.height
  }

  area(): number {
    // For consistency with 2D shapes, area returns the surface area
    return this.surfaceArea()
  }

  perimeter(): number {
    // Sum of circumferences of the two circular ends
    return 4 * Math.PI * this.radius
  }

  getParameters(): ShapeParameters {
    return {
      radius: this.radius,
      height: this.height,
    }
  }
}

