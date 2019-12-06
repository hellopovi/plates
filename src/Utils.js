export function getMousePosInCanvas(mouseEvent, canvasNode) {
  const rect = canvasNode.getBoundingClientRect();
  return {
    mouseX: mouseEvent.clientX - rect.left,
    mouseY: mouseEvent.clientY - rect.top
  };
}
