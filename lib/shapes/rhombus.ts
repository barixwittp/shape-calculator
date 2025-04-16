import { Shape, type ShapeParameters } from "./shape"

export class Rhombus extends Shape {
  constructor(
    private side: number,
    private diagonal1: number,
    private diagonal2: number,
  ) {
    super()
    this.validatePositive(side, "Side")
    this.validatePositive(diagonal1, "Diagonal 1")
    this.validatePositive(diagonal2, "Diagonal 2")
    this.validateRhombus()
  }

  private validateRhombus(): void {
    // Check if the diagonals and side length are compatible
    // Using the formula: 4 * side^2 = diagonal1^2 + diagonal2^2
    const leftSide = 4 * Math.pow(this.side, 2)
    const rightSide = Math.pow(this.diagonal1, 2) + Math.pow(this.diagonal2, 2)

    // Allow for some floating point imprecision
    if (Math.abs(leftSide - rightSide) > 0.001 * leftSide) {
      throw new Error(
        "Invalid rhombus dimensions: The diagonals and side length are incompatible.\n" +
          `For a rhombus, 4 * side^2 should equal diagonal1^2 + diagonal2^2.\n` +
          `Current values: side=${this.side}, diagonal1=${this.diagonal1}, diagonal2=${this.diagonal2}`,
      )
    }
  }

  area(): number {
    return (this.diagonal1 * this.diagonal2) / 2
  }

  perimeter(): number {
    return 4 * this.side
  }

  getParameters(): ShapeParameters {
    return {
      side: this.side,
      diagonal1: this.diagonal1,
      diagonal2: this.diagonal2,
    }
  }
}

