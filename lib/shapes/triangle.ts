import { Shape, type ShapeParameters } from "./shape"

export class Triangle extends Shape {
  constructor(
    private sideA: number,
    private sideB: number,
    private sideC: number,
  ) {
    super()
    this.validatePositive(sideA, "Side A")
    this.validatePositive(sideB, "Side B")
    this.validatePositive(sideC, "Side C")
    this.validateTriangleInequality()
  }

  private validateTriangleInequality(): void {
    if (
      this.sideA + this.sideB <= this.sideC ||
      this.sideA + this.sideC <= this.sideB ||
      this.sideB + this.sideC <= this.sideA
    ) {
      throw new Error(
        "Invalid triangle dimensions: The sum of any two sides must be greater than the third side.\n" +
          `Current values: a=${this.sideA}, b=${this.sideB}, c=${this.sideC}`,
      )
    }
  }

  area(): number {
    // Using Heron's formula
    const s = (this.sideA + this.sideB + this.sideC) / 2
    const area = Math.sqrt(s * (s - this.sideA) * (s - this.sideB) * (s - this.sideC))

    if (isNaN(area)) {
      throw new Error(
        "Cannot calculate triangle area: The given sides cannot form a valid triangle.\n" +
          `Current values: a=${this.sideA}, b=${this.sideB}, c=${this.sideC}`,
      )
    }

    return area
  }

  perimeter(): number {
    return this.sideA + this.sideB + this.sideC
  }

  getParameters(): ShapeParameters {
    return {
      sideA: this.sideA,
      sideB: this.sideB,
      sideC: this.sideC,
    }
  }
}

