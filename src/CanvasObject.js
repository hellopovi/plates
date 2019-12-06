class CanvasObject {
  constructor(x, y, mouseOffsetX = 0, mouseOffsetY = 0) {
    this.x = x;
    this.y = y;
    this.mouseOffsetX = mouseOffsetX;
    this.mouseOffsetY = mouseOffsetY;
  }

  set coordinates({ x, y } = {}) {
    this.x = x;
    this.y = y;
  }

  get coordinates() {
    return {
      x: this.x,
      y: this.y
    };
  }

  set mouseOffset({ mouseX, mouseY } = {}) {
    this.mouseOffsetX = this.x - mouseX;
    this.mouseOffsetY = this.y - mouseY;
  }

  get mouseOffset() {
    return {
      mouseOffsetX: this.mouseOffsetX,
      mouseOffsetY: this.mouseOffsetY
    };
  }

  isWithinBoundaries(mouseX, mouseY) {
    const isWithinX = mouseX >= this.x && mouseX < this.x + this.width;
    const isWithinY = mouseY >= this.y - 48 && mouseY < this.y;
    return isWithinX && isWithinY;
  }
}

export default CanvasObject;
