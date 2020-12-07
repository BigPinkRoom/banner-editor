<template>
  <div
    ref="bannerContainer"
    :style="{
      position: 'relative',
      width: bannerSize.width + 'px',
      height: bannerSize.height + 'px',
      border: `${bannerFrame.frameSize}px solid ${getFrameColorRGBAString}`,
      borderRadius: `${bannerFrame.frameRadius}px`,
      overflow: 'hidden',
      backgroundColor: '#ffffff',
      boxSizing: 'content-box',
    }"
  >
    <app-banner-text-module
      v-for="(textElement, index) in textSettingsArray"
      :key="index"
      :index="index"
      :textElement="textElement"
    ></app-banner-text-module>
    <app-banner-canvas ref="bannerCanvas"></app-banner-canvas>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import domToImage from 'dom-to-image';
import BannerCanvas from './BannerCanvas';
import BannerTextModule from './BannerTextModule';

export default {
  name: 'BannerContainer',
  components: {
    AppBannerCanvas: BannerCanvas,
    AppBannerTextModule: BannerTextModule,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState('frame', ['bannerFrame']),
    ...mapState('size', ['bannerSize']),
    ...mapState('text', ['textSettingsArray']),
    ...mapGetters('frame', ['getFrameColorRGBAString']),
  },
  mounted() {
    this.$root.$on('downloadResult', () => {
      this.downloadResult();
    });
  },
  methods: {
    async downloadResult() {
      this.$refs.bannerCanvas.unselectTransformer();

      await new Promise((resolve) => {
        setTimeout(() => resolve(), 1000);
      });

      const link = document.createElement('a');
      link.download = 'NewBanner.png';

      try {
        let node = this.$refs.bannerContainer;
        let dataUrl = await domToImage.toPng(node);
        await (function() {
          const img = new Image();
          img.src = dataUrl;

          link.href = dataUrl;
          link.click();
        })();
      } catch (error) {
        console.error('something went wrong!', error);
      }
    },
  },
};
</script>

<style></style>
