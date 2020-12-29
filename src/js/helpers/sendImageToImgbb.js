/**
 * send image to imgbb via API
 * @prop {String} imageBase64 - Base64 image data
 * @returns {String} URL adress of uploaded image
 */
export async function sendImageToImgbb(imageBase64) {
  let response;
  if (!imageBase64) {
    return '';
  }
  try {
    response = await fetch(
      'https://link-server-api.herokuapp.com/api/upload_image',
      {
        method: 'POST',
        headers: { 'Content-Type': 'Application/json' },
        body: JSON.stringify({ imageBase64 }),
      }
    );
  } catch (error) {
    new Error(`Request failed! ${error}`);
  }

  if (!response.ok) {
    throw new Error(`${response.status}: ${response.statusText}`);
  }

  return response.json();
}
