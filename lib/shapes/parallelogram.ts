import { Shape, type ShapeParameters } from "./shape"

export class Parallelogram extends Shape {
  constructor(
    private base: number,
    private side: number,
    private height: number,
  ) {
    super()
    this.validatePositive(base, "Base")
    this.validatePositive(side, "Side")
    this.validatePositive(height, "Height")
    this.validateParallelogram()
  }

  private validateParallelogram(): void {
    // Check if the height is compatible with the side
    // The height must be less than or equal to the side
    if (this.height > this.side) {
      throw new Error(
        "Invalid parallelogram dimensions: The height cannot be greater than the side.\n" +
          `Current values: side=${this.side}, height=${this.height}`,
      )
    }
  }

  area(): number {
    return this.base * this.height
  }

  perimeter(): number {
    return 2 * (this.base + this.side)
  }

  getParameters(): ShapeParameters {
    return {
      base: this.base,
      side: this.side,
      height: this.height,
    }
  }
}

