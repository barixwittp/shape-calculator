import { Rectangle } from "./rectangle"

export class Square extends Rectangle {
  constructor(side: number) {
    super(side, side)
  }
}

