import CanvasObject from './CanvasObject.js';

class CanvasImage extends CanvasObject {
  constructor(x, y, src, width, height, mouseOffsetX = 0, mouseOffsetY = 0) {
    super(x, y, mouseOffsetX, mouseOffsetY);
    this.src = src;
    this.width = width;
    this.height = height;
  }
}

export default CanvasImage;
