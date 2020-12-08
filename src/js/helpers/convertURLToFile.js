// converting url link to image file
export async function convertURLToFile(imageURL) {
  this.$store.dispatch('shared/clearError', null, { root: true });
  this.$store.dispatch('shared/increaseLoading', 'loadingImageUrl', {
    root: true,
  });
  try {
    let response = await fetch(
      `https://cors-anywhere.herokuapp.com/${imageURL}`
    );
    console.log(response);
    if (!response.ok) {
      throw new Error(
        'For this link, can not download the image. Please insert another link.'
      );
    }

    let data = await response.blob().then((result) => result);
    let metadata = { type: 'image/png' };

    let file = new File([data], 'image.png', metadata);
    file.crossOrigin = 'anonymous';

    this.$store.dispatch('shared/decreaseLoading', 'loadingImageUrl', {
      root: true,
    });

    return file;
  } catch (error) {
    this.$store.dispatch('shared/decreaseLoading', 'loadingImageUrl', {
      root: true,
    });
    this.$store.dispatch('shared/setError', error.message, { root: true });
    throw error;
  }
}
