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
import { mapActions, mapState, mapGetters } from 'vuex';
import domToImage from 'dom-to-image';
import { sendImageToImgbb } from '../../js/helpers/sendImageToImgbb';
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
    ...mapState('image', ['inputImage']),
    ...mapState('size', ['bannerSize']),
    ...mapState('text', ['textSettingsArray']),
    ...mapState('background', [
      'backgroundType',
      'backgroundSolidSettings',
      'backgroundGradientSettings',
    ]),
    ...mapGetters('shared', [
      'booleanloadingUrlImage',
      'booleanLoadingResultImage',
    ]),
    ...mapGetters('frame', ['getFrameColorRGBAString']),
  },
  mounted() {
    this.$root.$on('downloadResult', () => {
      this.downloadResult();
    });
    this.$root.$on('copyBannerHTMLToClipboard', () => {
      this.copyBannerHTMLToClipboard();
    });
    this.$root.$on('copySettingsJSONToClipboard', () => {
      this.copySettingsJSONToClipboard();
    });
  },
  methods: {
    ...mapActions('shared', ['increaseLoading', 'decreaseLoading']),

    async downloadResult() {
      try {
        this.increaseLoading('loadingImageResult');
        this.$refs.bannerCanvas.updateCanvas();

        await new Promise((resolve) => {
          setTimeout(() => resolve(), 1000);
        });

        let node = this.$refs.bannerContainer;
        let dataUrl = await domToImage.toPng(node);
        await (function() {
          const img = new Image();
          img.src = dataUrl;

          const link = document.createElement('a');
          link.download = 'NewBanner.png';
          link.href = dataUrl;
          link.click();
        })();
        this.decreaseLoading('loadingImageResult');
      } catch (error) {
        console.error('something went wrong!', error);
        this.decreaseLoading('loadingImageResult');
      }
    },

    copyBannerHTMLToClipboard() {},

    async getBannerSettingsJSON() {
      try {
        const processedImage = await this.$refs.bannerCanvas.returnProcessedImage();

        const processedImageURL = await sendImageToImgbb(processedImage);
        setTimeout(() => {
          console.log(processedImageURL);
        }, 1000);
        let bannerSettings = {
          size: this.bannerSize,
          background: {
            backgroundType: this.backgroundType,
            backgroundSolidSettings: this.backgroundSolidSettings,
            backgroundGradientSettings: this.backgroundGradientSettings,
          },
          image: this.inputImage,
          text: this.textSettingsArray,
          frame: this.bannerFrame,
        };

        // set to bannerSettings object, processed image URL
        bannerSettings.image.processedFile = processedImageURL;

        // return JSON string of bannerSettings;
        return JSON.stringify(bannerSettings);
      } catch (error) {
        console.log(error);
        throw error;
      }
    },

    async copySettingsJSONToClipboard() {
      try {
        const settingsObject = await this.getBannerSettingsJSON();
        await this.$copyText(settingsObject);
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style></style>
