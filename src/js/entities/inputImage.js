export class InputImage {
  constructor({ file = '', processedFile = '', width = 0, height = 0 }) {
    this.file = file;
    this.processedFile = processedFile;
    this.width = width;
    this.height = height;
  }
}
