import { Shape, type ShapeParameters } from "./shape"

export class Sector extends Shape {
  constructor(
    private radius: number,
    private angle: number,
  ) {
    super()
    this.validatePositive(radius, "Radius")
    this.validateAngle()
  }

  private validateAngle(): void {
    if (this.angle <= 0 || this.angle > 360) {
      throw new Error(
        "Invalid sector angle: The angle must be between 0 and 360 degrees.\n" + `Current value: angle=${this.angle}`,
      )
    }
  }

  area(): number {
    // Area = (θ/360) * π * r²
    return (this.angle / 360) * Math.PI * Math.pow(this.radius, 2)
  }

  perimeter(): number {
    // Perimeter = 2 * r + r * θ * (π/180)
    // 2 * r is for the two radii, r * θ * (π/180) is for the arc length
    return 2 * this.radius + this.radius * this.angle * (Math.PI / 180)
  }

  getParameters(): ShapeParameters {
    return {
      radius: this.radius,
      angle: this.angle,
    }
  }
}

