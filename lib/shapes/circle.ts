import { Shape, type ShapeParameters } from "./shape"

export class Circle extends Shape {
  constructor(private radius: number) {
    super()
    this.validatePositive(radius, "Radius")
  }

  area(): number {
    return Math.PI * this.radius * this.radius
  }

  perimeter(): number {
    return 2 * Math.PI * this.radius
  }

  getParameters(): ShapeParameters {
    return {
      radius: this.radius,
    }
  }
}

