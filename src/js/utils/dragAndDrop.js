/**
 * drag and drop function
 * @prop {Object} event - mouse event
 * @prop {Object} dragElement - draggable tag
 * @prop {number} zoomModifier - modifier of current zoom
 */
export function dragAndDrop(event, dragElement, zoomModifier = 1) {
  const parent = event.target.parentElement;

  let parentCoords = parent.getBoundingClientRect();

  let parentTopEdge = parentCoords.top + parent.clientTop;
  let parentRightEdge =
    parentCoords.left + parent.offsetWidth - parent.clientLeft;
  let parentBottomEdge =
    parentCoords.top + parent.offsetHeight - parent.clientTop;
  let parentLeftEdge = parentCoords.left + parent.clientLeft;

  let shiftX, shiftY;

  startDrag(dragElement, event.clientX, event.clientY);

  function onMouseUp() {
    finishDrag();
  }

  function onMouseMove(event) {
    moveAt(event.clientX, event.clientY);
  }

  function startDrag(element, clientX, clientY) {
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    shiftX = clientX - element.getBoundingClientRect().left;
    shiftY = clientY - element.getBoundingClientRect().top;

    moveAt(clientX, clientY);
  }

  function finishDrag() {
    dragElement.style.top = parseInt(dragElement.style.top) + 'px';
    dragElement.style.left = parseInt(dragElement.style.left) + 'px';

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  }

  function moveAt(clientX, clientY) {
    let newX = clientX - shiftX;
    let newY = clientY - shiftY;

    // top owerflow behaviour
    if (newY + dragElement.offsetHeight / 5 <= parentTopEdge) {
      newY = parentTopEdge - dragElement.offsetHeight / 5;
    }

    // left owerflow behaviour
    if (newX + dragElement.offsetWidth / 10 <= parentLeftEdge) {
      newX = parentLeftEdge - dragElement.offsetWidth / 10;
    }

    // bottom owerflow behaviour
    if (newY + dragElement.offsetHeight / 1.2 >= parentBottomEdge) {
      newY = parentBottomEdge - dragElement.offsetHeight / 1.2;
    }

    // right owerflow behaviour
    if (newX + dragElement.offsetWidth / 1.1 >= parentRightEdge) {
      newX = parentRightEdge - dragElement.offsetWidth / 1.1;
    }

    dragElement.style.left = (newX - parentLeftEdge) / zoomModifier + 'px';
    dragElement.style.top = (newY - parentTopEdge) / zoomModifier + 'px';
  }
}
