export class InputImage {
  constructor({
    file = '',
    fileName = '',
    processedFile = '',
    width = 0,
    height = 0,
  }) {
    this.file = file;
    this.fileName = fileName;
    this.processedFile = processedFile;
    this.width = width;
    this.height = height;
  }
}
