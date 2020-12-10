// remove mime type ('data:image/png;base64,') of base64 image
export function removeMimeType(imageBase64Mime) {
  const startPosition = imageBase64Mime.indexOf(',') + 1;

  let imageBase64 = imageBase64Mime.slice(startPosition);

  return imageBase64;
}
