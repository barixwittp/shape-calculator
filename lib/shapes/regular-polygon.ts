import { Shape, type ShapeParameters } from "./shape"

export class RegularPolygon extends Shape {
  constructor(
    private sides: number,
    private sideLength: number,
  ) {
    super()
    if (sides < 3) {
      throw new Error("A polygon must have at least 3 sides")
    }
    this.validatePositive(sides, "Number of sides")
    this.validatePositive(sideLength, "Side length")
  }

  area(): number {
    const n = this.sides
    const s = this.sideLength
    return (n * s * s) / (4 * Math.tan(Math.PI / n))
  }

  perimeter(): number {
    return this.sides * this.sideLength
  }

  getParameters(): ShapeParameters {
    return {
      sides: this.sides,
      sideLength: this.sideLength,
    }
  }
}

