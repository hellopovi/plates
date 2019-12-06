import NumberPlate from './NumberPlate.js';
import CanvasImage from './CanvasImage.js';
import { getMousePosInCanvas } from './Utils.js';

class PlateNumber {
  constructor() {
    // user input elements
    this.numberInput = document.getElementById('plate-number');
    this.imageInput = document.getElementById('image');
    // config
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.ctx.font = '48px DIN';
    this.numberPlate = new NumberPlate(0, 48, 0, 48, '', './src/assets/plate-background.jpg');
    this.numberPlateDragging = false;

    // user input events
    this.addTextToCanvas = this.addTextToCanvas.bind(this);
    this.addBackgroundImageToCanvas = this.addBackgroundImageToCanvas.bind(this);

    this.onMouseDownEvent = this.onMouseDownEvent.bind(this);
    this.onMouseUpEvent = this.onMouseUpEvent.bind(this);
    this.onMouseMoveEvent = this.onMouseMoveEvent.bind(this);

    this.numberInput.addEventListener('input', this.addTextToCanvas);
    this.imageInput.addEventListener('change', this.addBackgroundImageToCanvas);

    this.canvas.addEventListener('mousedown', this.onMouseDownEvent);
    this.canvas.addEventListener('mouseup', this.onMouseUpEvent);
  }

  onMouseDownEvent(e) {
    if (!this.isWithinNumberPlateBoundaries(e)) return;
    this.numberPlateDragging = true;
    this.numberPlate.mouseOffset = getMousePosInCanvas(e, this.canvas);
    this.canvas.addEventListener('mousemove', this.onMouseMoveEvent);
    this.canvas.style.cursor = 'move';
  }

  onMouseUpEvent() {
    this.numberPlateDragging = false;
    this.canvas.removeEventListener('mousemove', this.onMouseMoveEvent);
    this.canvas.style.cursor = 'auto';
  }

  onMouseMoveEvent(e) {
    if (!this.numberPlateDragging) return;
    this.moveLicensePlate(e);
  }

  isWithinNumberPlateBoundaries(e) {
    const { mouseX, mouseY } = getMousePosInCanvas(e, this.canvas);
    return this.numberPlate.isWithinBoundaries(mouseX, mouseY);
  }

  drawNumberPlateOnCanvasContext(numberPlate, context) {
    const { x, y } = numberPlate.coordinates;
    const plateText = numberPlate.text;
    const plateHeight = numberPlate.height;
    const plateBackground = new CanvasImage(x, y - plateHeight, numberPlate.backgroundSrc, 200, 100);
    this.clearCanvas();
    context.fillText(plateText, x, y);
    const onBackgroundLoad = () => context.fillText(plateText, x, y);
    // this.drawImageOnCanvas(plateBackground, onBackgroundLoad);
  }

  addTextToCanvas(e) {
    const plateText = e.target.value;
    this.numberPlate.text = plateText;
    this.numberPlate.width = this.ctx.measureText(plateText).width;
    this.drawNumberPlateOnCanvasContext(this.numberPlate, this.ctx);
  }

  moveLicensePlate(e) {
    const { mouseX, mouseY } = getMousePosInCanvas(e, this.canvas);
    const { mouseOffsetX, mouseOffsetY } = this.numberPlate.mouseOffset;
    this.numberPlate.coordinates = { x: mouseX + mouseOffsetX, y: mouseY + mouseOffsetY };
    this.drawNumberPlateOnCanvasContext(this.numberPlate, this.ctx);
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  addBackgroundImageToCanvas(e) {
    const canvasImage = new CanvasImage(
      0,
      0,
      URL.createObjectURL(e.target.files[0]),
      this.canvas.width,
      this.canvas.height
    );
    this.drawImageOnCanvas(canvasImage);
  }

  drawImageOnCanvas(imageDetails, onLoad) {
    const imageToDraw = new Image();
    imageToDraw.onload = () => {
      this.ctx.drawImage(imageToDraw, imageDetails.x, imageDetails.y, imageDetails.width, imageDetails.height);
      onLoad();
    };
    imageToDraw.src = imageDetails.src;
  }
}

const plateNumber = new PlateNumber();
