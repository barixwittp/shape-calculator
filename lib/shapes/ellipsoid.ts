import { ThreeDShape, type ShapeParameters } from "./shape"

export class Ellipsoid extends ThreeDShape {
  constructor(
    private radiusX: number,
    private radiusY: number,
    private radiusZ: number,
  ) {
    super()
    this.validatePositive(radiusX, "Radius X")
    this.validatePositive(radiusY, "Radius Y")
    this.validatePositive(radiusZ, "Radius Z")
  }

  volume(): number {
    // Volume = (4/3) * π * a * b * c
    return (4 / 3) * Math.PI * this.radiusX * this.radiusY * this.radiusZ
  }

  surfaceArea(): number {
    // Surface area approximation using Knud Thomsen's formula
    const p = 1.6075
    const term1 = Math.pow(this.radiusX * this.radiusY, p)
    const term2 = Math.pow(this.radiusX * this.radiusZ, p)
    const term3 = Math.pow(this.radiusY * this.radiusZ, p)

    return 4 * Math.PI * Math.pow((term1 + term2 + term3) / 3, 1 / p)
  }

  area(): number {
    // For consistency with 2D shapes, area returns the surface area
    return this.surfaceArea()
  }

  perimeter(): number {
    // For an ellipsoid, perimeter is not well-defined
    // Using the maximum circumference as an equivalent
    const maxRadius = Math.max(this.radiusX, this.radiusY, this.radiusZ)
    return 2 * Math.PI * maxRadius
  }

  getParameters(): ShapeParameters {
    return {
      radiusX: this.radiusX,
      radiusY: this.radiusY,
      radiusZ: this.radiusZ,
    }
  }
}

