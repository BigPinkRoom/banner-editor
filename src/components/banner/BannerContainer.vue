<template>
  <!-- main banner container. Shows the final result -->
  <div
    ref="bannerContainer"
    :style="{
      position: 'relative',
      width: `${bannerSize.width}px`,
      height: `${bannerSize.height}px`,
      boxSizing: 'content-box',
      overflow: 'hidden',
      backgroundColor: '#ffffff',
      border: `${bannerFrame.frameSize}px solid ${getFrameColorRGBAString}`,
      borderRadius: `${bannerFrame.frameRadius}px`,
    }"
  >
    <!-- text modules -->
    <app-banner-text-module
      v-for="(textElement, index) in textSettingsArray"
      :key="index"
      :index="index"
      :textElement="textElement"
      :zoomModifier="zoomModifier"
    />
    <app-banner-canvas ref="bannerCanvas" />
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';
import domToImage from 'dom-to-image';
import { sendImageToImgbb } from '../../js/helpers/sendImageToImgbb';
import BannerCanvas from './BannerCanvas';
import BannerTextModule from './BannerTextModule';
import { getCurrentDate } from '../../js/helpers/getCurrentDate';

export default {
  name: 'BannerContainer',
  components: {
    AppBannerCanvas: BannerCanvas,
    AppBannerTextModule: BannerTextModule,
  },
  props: {
    zoomModifier: Number,
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
    ...mapGetters('background', ['getCurrentBackgroundRGBAString']),
    ...mapGetters('text', ['getAllTextModulesToHTML']),
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

    /**
     * download finished banner
     * @returns {Object} image file object
     */
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

        const img = new Image();
        img.src = dataUrl;

        const uniqueFileName = `Banner_${getCurrentDate()}`;

        const link = document.createElement('a');
        link.download = `${uniqueFileName}.png`;
        link.href = dataUrl;
        link.click();

        this.decreaseLoading('loadingImageResult');
      } catch (error) {
        this.decreaseLoading('loadingImageResult');
        this.setError(
          `Something went wrong on download image! Error:${error.message}`
        );
        console.error(error);
      }
    },

    /**
     * convert banner to HTML and copy to clipboard
     */
    async copyBannerHTMLToClipboard() {
      this.clearError();
      this.increaseLoading('loadingBannerToHTML');
      try {
        const processedImage = await this.$refs.bannerCanvas.getProcessedImage();

        const processedImageURL = await sendImageToImgbb(processedImage);

        let bannerHTML = `
          <div style="position: relative; box-sizing: content-box; height: ${this.bannerSize.height}px; width: ${this.bannerSize.width}px; overflow: hidden; background: url('${processedImageURL}'), ${this.getCurrentBackgroundRGBAString}; background-repeat: no-repeat; border: ${this.bannerFrame.frameSize}px solid ${this.getFrameColorRGBAString}; border-radius: ${this.bannerFrame.frameRadius}px;">
          ${this.getAllTextModulesToHTML}
          </div>
        `;

        await this.$copyText(bannerHTML);

        this.decreaseLoading('loadingBannerToHTML');
      } catch (error) {
        this.decreaseLoading('loadingBannerToHTML');
        this.setError(
          `Something went wrong on copy bannerToHTML logic! Error:${error.message}`
        );
        console.error(error);
      }
    },

    /**
     * convert banner settings of image to JSON and copy to clipboard
     */
    async copySettingsJSONToClipboard() {
      this.clearError();
      this.increaseLoading('loadingSettingsToJSON');

      try {
        const processedImage = await this.$refs.bannerCanvas.getProcessedImage();

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

        bannerSettings.image.processedFile = processedImageURL;

        const bannerSettingsJSON = JSON.stringify(bannerSettings);

        await this.$copyText(bannerSettingsJSON);

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
