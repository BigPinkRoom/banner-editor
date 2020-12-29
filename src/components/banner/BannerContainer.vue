<template>
  <!-- main banner container. Shows the final result -->
  <div ref="bannerContainer" :style="bannerContainerStyle">
    <!-- modal window of copy to buffer -->
    <app-banner-modal-copy
      :copyValue="copyValue"
      @clearCopyValue="clearCopyValue"
    />

    <!-- text modules -->
    <app-banner-text-module
      v-for="(textElement, index) in textSettingsArray"
      :key="index"
      :index="index"
      :textElement="textElement"
      :zoomModifier="zoomModifier"
    />
    <!-- banner canvas module -->
    <app-banner-canvas ref="bannerCanvas" />
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';
import domToImage from 'dom-to-image';
import { sendImageToImgbb } from '../../js/helpers/sendImageToImgbb';
import BannerCanvas from './BannerCanvas';
import BannerModalCopy from './BannerModalCopy';
import BannerTextModule from './BannerTextModule';
import { getCurrentDate } from '../../js/helpers/getCurrentDate';

export default {
  name: 'BannerContainer',
  components: {
    AppBannerModalCopy: BannerModalCopy,
    AppBannerCanvas: BannerCanvas,
    AppBannerTextModule: BannerTextModule,
  },
  props: {
    zoomModifier: Number,
  },
  data() {
    return {
      copyValue: '',
    };
  },
  computed: {
    ...mapState('frame', ['bannerFrame']),
    ...mapGetters('image', ['imageInformation']),
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

    bannerContainerStyle() {
      return {
        position: 'relative',
        width: `${this.bannerSize.width}px`,
        height: `${this.bannerSize.height}px`,
        boxSizing: 'content-box',
        overflow: 'hidden',
        backgroundColor: '#ffffff',
        border: `${this.bannerFrame.frameSize}px solid ${this.getFrameColorRGBAString}`,
        borderRadius: `${this.bannerFrame.frameRadius}px`,
      };
    },
  },
  mounted() {
    this.$root.$on('downloadResult', () => {
      this.downloadResult();
    });
    this.$root.$on('createBannerHTML', () => {
      this.createBannerHTML();
    });
    this.$root.$on('createSettingsJSON', () => {
      this.createSettingsJSON();
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
     * convert banner to HTML
     */
    async createBannerHTML() {
      this.clearError();
      this.increaseLoading('loadingBannerToHTML');
      try {
        const processedImage = await this.$refs.bannerCanvas.getProcessedImage();

        let processedImageURL = '';

        if (processedImage) {
          await sendImageToImgbb(processedImage)
            .then((response) => (processedImageURL = `url(${response}),`))
            .catch((error) => {
              throw error;
            });
        }

        let bannerHTML = `<div style="position: relative; box-sizing: content-box; height: ${this.bannerSize.height}px; width: ${this.bannerSize.width}px; overflow: hidden; background: ${processedImageURL} ${this.getCurrentBackgroundRGBAString}; background-repeat: no-repeat; border: ${this.bannerFrame.frameSize}px solid ${this.getFrameColorRGBAString}; border-radius: ${this.bannerFrame.frameRadius}px;">${this.getAllTextModulesToHTML}</div>`;

        this.copyValue = bannerHTML;

        this.decreaseLoading('loadingBannerToHTML');
      } catch (error) {
        this.decreaseLoading('loadingBannerToHTML');
        this.setError(
          `Something went wrong on copy bannerToHTML logic! Error:${error.message ||
            error}`
        );
        console.error(error);
      }
    },

    /**
     * convert banner settings of image to JSON and copy to clipboard
     */
    async createSettingsJSON() {
      this.clearError();
      this.increaseLoading('loadingSettingsToJSON');

      try {
        const processedImage = await this.$refs.bannerCanvas.getProcessedImage();

        let processedImageURL = '';

        if (processedImage) {
          await sendImageToImgbb(processedImage)
            .then((response) => (processedImageURL = `url(${response}),`))
            .catch((error) => {
              throw error;
            });
        }

        let bannerSettings = {
          size: this.bannerSize,
          background: {
            backgroundType: this.backgroundType,
            backgroundSolidSettings: this.backgroundSolidSettings,
            backgroundGradientSettings: this.backgroundGradientSettings,
          },
          image: this.imageInformation,
          text: this.textSettingsArray,
          frame: this.bannerFrame,
        };

        if (processedImageURL) {
          bannerSettings.image.processedFile = processedImageURL;
        }

        this.copyValue = JSON.stringify(bannerSettings);

        this.decreaseLoading('loadingSettingsToJSON');
      } catch (error) {
        this.decreaseLoading('loadingSettingsToJSON');
        this.setError(
          `Something went wrong on copy JSON logic! Error:${error}`
        );
        console.error(error);
      }
    },

    clearCopyValue() {
      this.copyValue = '';
    },
  },
};
</script>

<style></style>
