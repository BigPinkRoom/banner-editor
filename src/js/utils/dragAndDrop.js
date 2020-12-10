export function dragAndDrop(event, dragElement, zoomModifier = 1) {
  // initial parent element
  const parent = event.target.parentElement;

  // initial parent element coordinates by getBoundingClientRect object
  let parentCoords = parent.getBoundingClientRect();

  // initial parent edges (with border)
  let parentTopEdge = parentCoords.top + parent.clientTop;
  let parentRightEdge =
    parentCoords.left + parent.offsetWidth - parent.clientLeft;
  let parentBottomEdge =
    parentCoords.top + parent.offsetHeight - parent.clientTop;
  let parentLeftEdge = parentCoords.left + parent.clientLeft;

  // initial correct (with position on drag element) mouse coordinates
  let shiftX, shiftY;

  // function to start drag
  startDrag(dragElement, event.clientX, event.clientY);

  // function to mouse up
  function onMouseUp() {
    finishDrag();
  }

  // function to mouse move
  function onMouseMove(event) {
    moveAt(event.clientX, event.clientY);
  }

  // events to start drag element
  function startDrag(element, clientX, clientY) {
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    shiftX = clientX - element.getBoundingClientRect().left;
    shiftY = clientY - element.getBoundingClientRect().top;

    moveAt(clientX, clientY);
  }

  // events to finish drag element
  function finishDrag() {
    dragElement.style.top = parseInt(dragElement.style.top) + 'px';
    dragElement.style.left = parseInt(dragElement.style.left) + 'px';

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  }

  // events to move drag element
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
    if (newY + dragElement.offsetHeight >= parentBottomEdge) {
      newY = parentBottomEdge - dragElement.offsetHeight;
    }

    // right owerflow behaviour
    if (newX + dragElement.offsetWidth >= parentRightEdge) {
      newX = parentRightEdge - dragElement.offsetWidth;
    }

    dragElement.style.left = (newX - parentLeftEdge) / zoomModifier + 'px';
    dragElement.style.top = (newY - parentTopEdge) / zoomModifier + 'px';
  }
}
