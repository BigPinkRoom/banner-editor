export function dragAndDrop(event, dragElement) {
  dragElement.ondragstart = function() {
    console.log('ondgarstart');
  };

  const parent = event.target.parentElement;
  let parentCoords = parent.getBoundingClientRect();

  let parentBottomEdge = parentCoords.top + parent.offsetHeight;
  let parentTopEdge = parentCoords.top;
  let parentLeftEdge = parentCoords.left;
  let parentRightEdge = parentCoords.left + parent.offsetWidth;

  console.log(parentTopEdge, parentRightEdge, parentBottomEdge, parentLeftEdge);

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

    element.style.position = 'fixed';

    moveAt(clientX, clientY);
  }

  function finishDrag() {
    dragElement.style.top =
      parseInt(dragElement.style.top) - parentTopEdge + pageYOffset + 'px';
    dragElement.style.left =
      parseInt(dragElement.style.left) - parentLeftEdge + 'px';
    dragElement.style.position = 'absolute';

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  }

  function moveAt(clientX, clientY) {
    let newX = clientX - shiftX;
    let newY = clientY - shiftY;

    if (newY + dragElement.offsetHeight >= parentBottomEdge) {
      newY = parentBottomEdge - dragElement.offsetHeight;
    }

    if (newY + dragElement.offsetHeight <= parentTopEdge) {
      newY = parentTopEdge + dragElement.offsetHeight;
    }

    if (newX < parentLeftEdge) newX = parentLeftEdge;
    if (newX > parentRightEdge - dragElement.offsetWidth) {
      newX = parentRightEdge - dragElement.offsetWidth;
    }

    dragElement.style.left = newX + 'px';
    dragElement.style.top = newY + 'px';
  }
}
