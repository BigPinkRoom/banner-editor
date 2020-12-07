export class StageConfig {
  constructor({ width = 0, height = 0, drawBorder = true }) {
    this.width = Number(width);
    this.height = Number(height);
    this.drawBorder = Boolean(drawBorder);
  }
}
