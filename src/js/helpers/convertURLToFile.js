// converting url link to image file
export async function convertURLToFile(imageURL) {
  this.$store.dispatch('shared/clearError', null, { root: true });

  try {
    let response = await fetch(
      `https://cors-anywhere.herokuapp.com/${imageURL}`
    );
    if (!response.ok) {
      throw new Error(
        'For this link, can not download the image. Please insert another link.'
      );
    }

    let data = await response.blob().then((result) => result);
    let metadata = { type: 'image/png' };

    let file = new File([data], 'image.png', metadata);
    file.crossOrigin = 'anonymous';

    return file;
  } catch (error) {
    this.$store.dispatch('shared/setError', error.message, { root: true });
    throw error;
  }
}
