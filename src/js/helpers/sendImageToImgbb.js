export async function sendImageToImgbb(imageBase64) {
  return new Promise(function(resolve, reject) {
    let formData = new FormData();

    formData.append('image', imageBase64);

    let xhr = new XMLHttpRequest();
    xhr.open(
      'POST',
      'https://api.imgbb.com/1/upload?expiration=600&key=***REMOVED***'
    );
    xhr.send(formData);

    xhr.onload = function() {
      if (xhr.status != 200) {
        // show error if status not equal to '200'

        reject(
          new Error(
            `Error${xhr.status}: ${xhr.statusText}. Full message: ${xhr.response}`
          )
        );
      } else {
        // return url of processed image
        resolve(JSON.parse(xhr.response).data.url);
      }
    };

    xhr.onerror = function() {
      reject(
        new Error(`Request failed! Error${xhr.status}: ${xhr.statusText}.`)
      );
    };
  });
}
