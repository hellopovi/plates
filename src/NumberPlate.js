import CanvasObject from './CanvasObject.js';

class NumberPlate extends CanvasObject {
  constructor(x, y, width = 0, height = 0, text = '', backgroundSrc, mouseOffsetX = 0, mouseOffsetY = 0) {
    super(x, y, mouseOffsetX, mouseOffsetY);
    this.width = width;
    this.height = height;
    this.text = text;
    this.backgroundSrc = backgroundSrc;
  }
}

export default NumberPlate;
