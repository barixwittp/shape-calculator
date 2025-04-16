import { ThreeDShape, type ShapeParameters } from "./shape"

export class Torus extends ThreeDShape {
  constructor(
    private majorRadius: number,
    private minorRadius: number,
  ) {
    super()
    this.validatePositive(majorRadius, "Major Radius")
    this.validatePositive(minorRadius, "Minor Radius")
    this.validateTorus()
  }

  private validateTorus(): void {
    if (this.minorRadius >= this.majorRadius) {
      throw new Error(
        "Invalid torus dimensions: The minor radius must be less than the major radius.\n" +
          `Current values: majorRadius=${this.majorRadius}, minorRadius=${this.minorRadius}`,
      )
    }
  }

  volume(): number {
    // Volume = 2π² * R * r²
    return 2 * Math.pow(Math.PI, 2) * this.majorRadius * Math.pow(this.minorRadius, 2)
  }

  surfaceArea(): number {
    // Surface Area = 4π² * R * r
    return 4 * Math.pow(Math.PI, 2) * this.majorRadius * this.minorRadius
  }

  area(): number {
    // For consistency with 2D shapes, area returns the surface area
    return this.surfaceArea()
  }

  perimeter(): number {
    // For a torus, perimeter is not well-defined
    // Using the outer circumference as an equivalent
    return 2 * Math.PI * (this.majorRadius + this.minorRadius)
  }

  getParameters(): ShapeParameters {
    return {
      majorRadius: this.majorRadius,
      minorRadius: this.minorRadius,
    }
  }
}

