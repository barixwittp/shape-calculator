import { Shape, type ShapeParameters } from "./shape"

export class Trapezoid extends Shape {
  constructor(
    private topWidth: number,
    private bottomWidth: number,
    private height: number,
    private leftSide?: number,
    private rightSide?: number,
  ) {
    super()
    this.validatePositive(topWidth, "Top width")
    this.validatePositive(bottomWidth, "Bottom width")
    this.validatePositive(height, "Height")

    // Calculate left and right sides if not provided
    if (!leftSide) {
      const widthDiff = Math.abs(bottomWidth - topWidth) / 2
      this.leftSide = Math.sqrt(height * height + widthDiff * widthDiff)
    } else {
      this.validatePositive(leftSide, "Left side")
      this.leftSide = leftSide
    }

    if (!rightSide) {
      const widthDiff = Math.abs(bottomWidth - topWidth) / 2
      this.rightSide = Math.sqrt(height * height + widthDiff * widthDiff)
    } else {
      this.validatePositive(rightSide, "Right side")
      this.rightSide = rightSide
    }
  }

  area(): number {
    return ((this.topWidth + this.bottomWidth) / 2) * this.height
  }

  perimeter(): number {
    return this.topWidth + this.bottomWidth + this.leftSide + this.rightSide
  }

  getParameters(): ShapeParameters {
    return {
      topWidth: this.topWidth,
      bottomWidth: this.bottomWidth,
      height: this.height,
      leftSide: this.leftSide,
      rightSide: this.rightSide,
    }
  }
}

