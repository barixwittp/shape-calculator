import { Shape, type ShapeParameters } from "./shape"

export class Ellipse extends Shape {
  constructor(
    private radiusX: number,
    private radiusY: number,
  ) {
    super()
    this.validatePositive(radiusX, "Radius X")
    this.validatePositive(radiusY, "Radius Y")
  }

  area(): number {
    return Math.PI * this.radiusX * this.radiusY
  }

  perimeter(): number {
    // Approximation using Ramanujan's formula
    const a = this.radiusX
    const b = this.radiusY
    const h = Math.pow((a - b) / (a + b), 2)
    return Math.PI * (a + b) * (1 + (3 * h) / (10 + Math.sqrt(4 - 3 * h)))
  }

  getParameters(): ShapeParameters {
    return {
      radiusX: this.radiusX,
      radiusY: this.radiusY,
    }
  }
}

