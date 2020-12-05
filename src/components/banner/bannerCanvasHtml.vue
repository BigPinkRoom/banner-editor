<template>
  <div>
    <div class="banner__container"></div>
    <img :src="image.src" />
  </div>
</template>
<script>
import { mapState } from 'vuex';

export default {
  name: 'BannerCanvasHtml',
  data() {
    return {
      image: {
        src: this.inputImage,
      },
    };
  },
  computed: {
    ...mapState('shared', ['loading']),
    ...mapState('banner', ['inputImage']),
  },
  watch: {
    inputImage() {
      this.image.src = this.inputImage;
    },
  },
};
</script>

<style scoped>
.banner__container {
  width: 500px;
  height: 500px;
  border: 1px solid green;
}
</style>
