// function for konva. End tranform image
export function handleTransformEnd(event) {
  // image is transformed, let us save new attrs back to the node
  // find element in our state
  const image = this.imageConfig;
  // update the state
  image.x = event.target.x();
  image.y = event.target.y();
  image.rotation = event.target.rotation();
  image.scaleX = event.target.scaleX();
  image.scaleY = event.target.scaleY();
}

// function for konva. Mouse down event
export function handleStageMouseDown(event) {
  // clicked on stage (outside to image) - clear selection
  if (event.target === event.target.getStage()) {
    this.selectedImageName = '';
    this.updateTransformer();
    return;
  }

  // clicked on transformer - do nothing
  const clickedOnTransformer =
    event.target.getParent().className === 'Transformer';
  if (clickedOnTransformer) {
    return;
  }

  // find clicked image by its name
  const name = event.target.name();
  const image = this.imageConfig;
  if (image) {
    this.selectedImageName = name;
  } else {
    this.selectedImageName = '';
  }
  this.updateTransformer();
}

// update tranformer
export function updateTransformer() {
  // here we need to manually attach or detach Transformer node
  const transformerNode = this.$refs.transformer.getNode();
  const stageTransformer = transformerNode.getStage();
  const { selectedImageName } = this;

  const selectedNode = stageTransformer.findOne('.' + selectedImageName);
  // do nothing if selected node is already attached
  if (selectedNode === transformerNode.node()) {
    return;
  }

  if (selectedNode) {
    // attach to another node (if we have several images)
    transformerNode.nodes([selectedNode]);
  } else {
    // remove transformer
    transformerNode.nodes([]);
  }
  transformerNode.getLayer().batchDraw();
}

export function unselectTransformer() {
  this.selectedImageName = '';
  this.updateTransformer();
}
