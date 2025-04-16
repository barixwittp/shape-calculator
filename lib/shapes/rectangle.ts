import { Shape } from "./shape"

export class Rectangle extends Shape {
  constructor(
    private length: number,
    private width: number,
  ) {
    super()
    this.validatePositive(length, "Length")
    this.validatePositive(width, "Width")
  }

  area(): number {
    return this.length * this.width
  }

  perimeter(): number {
    return 2 * (this.length + this.width)
  }
}

