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
      transform: `scale(${scale})`,
    }"
  >
    <app-banner-text-module
      v-for="(textElement, index) in textSettingsArray"
      :key="index"
      :index="index"
      :textElement="textElement"
      :zoomModifier="zoomModifier"
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
  props: {
    zoomModifier: Number,
  },
  data() {
    return {
      scale: 1,
    };
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
    ...mapActions('shared', [
      'increaseLoading',
      'decreaseLoading',
      'clearError',
      'setError',
    ]),

    async downloadResult() {
      this.clearError();
      this.increaseLoading('loadingImageResult');
      try {
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
        this.decreaseLoading('loadingImageResult');
        this.setError(
          `Something went wrong on download image! Error:${error.message}`
        );
        console.error(error);
      }
    },

    async copyBannerHTMLToClipboard() {
      // this.clearError();
      // this.increaseLoading('loadingBannerToHTML');
      // try {
      //   const processedImage = await this.$refs.bannerCanvas.returnProcessedImage();
      //   const processedImageURL = await sendImageToImgbb(processedImage);
      //   let bannerHTML = `
      //     <div style="height: ${this.bannerSize.height}px; width: ${this.bannerSize.width}px; background-image: url(${processedImageURL}); background-repeat: no-repeat;">
      //     </div>
      //   `;
      //   console.log(bannerHTML);
      //   this.decreaseLoading('loadingBannerToHTML');
      // } catch (error) {
      //   this.decreaseLoading('loadingBannerToHTML');
      //   this.setError(
      //     `Something went wrong on copy bannerToHTML logic! Error:${error.message}`
      //   );
      //   console.error(error);
      // }
    },

    async getBannerSettingsJSON() {
      try {
        const processedImage = await this.$refs.bannerCanvas.returnProcessedImage();

        const processedImageURL = await sendImageToImgbb(processedImage);

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
        console.error(error);
        throw error;
      }
    },

    async copySettingsJSONToClipboard() {
      this.clearError();
      this.increaseLoading('loadingSettingsToJSON');

      try {
        const settingsObject = await this.getBannerSettingsJSON();
        await this.$copyText(settingsObject);
        this.decreaseLoading('loadingSettingsToJSON');
      } catch (error) {
        this.decreaseLoading('loadingSettingsToJSON');
        this.setError(
          `Something went wrong on copy JSON logic! Error:${error.message}`
        );
        console.error(error);
      }
    },
  },
};
</script>

<style></style>
