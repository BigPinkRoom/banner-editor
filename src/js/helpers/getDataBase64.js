/**
 *  remove dateURL ('data:image/png;base64,'), leave only string data
 * @prop {Object} dataURL
 * @returns {Object} only image string data
 */
export function getDataBase64(dataURL) {
  const startPosition = dataURL.indexOf(',') + 1;

  let imageStringData = dataURL.slice(startPosition);

  return imageStringData;
}
