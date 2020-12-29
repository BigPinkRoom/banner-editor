<template>
  <!-- main container of konva.js plugin -->
  <v-stage
    id="stageContainer"
    ref="stage"
    :config="stageConfig"
    @mousedown="handleStageMouseDown"
    @touchstart="handleStageMouseDown"
  >
    <v-layer ref="layer">
      <!-- show uploaded image -->
      <v-image
        ref="imageCanvas"
        :config="imageConfig"
        @transformend="handleTransformEnd"
      />

      <!-- block for transform uploaded image -->
      <v-transformer ref="transformer" :config="transformerConfig" />
    </v-layer>
  </v-stage>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { StageConfig } from '../../js/entities/stageConfig';
import {
  handleStageMouseDown,
  handleTransformEnd,
  updateCanvas,
  updateTransformer,
} from '../../js/utils/konva';
import { getDataBase64 } from '../../js/helpers/getDataBase64';

export default {
  name: 'BannerCanvas',
  data() {
    return {
      stage: null,

      imageConfig: {
        x: 0,
        y: 0,
        rotation: 0,
        scaleX: 1,
        scaleY: 1,
        draggable: true,
        image: null,
        name: 'imageName',
      },
      transformerConfig: {
        borderEnabled: true,
        centeredScaling: true,
      },

      selectedImageName: '',
    };
  },
  computed: {
    ...mapState('background', [
      'backgroundGradientSettings',
      'backgroundSolidSettings',
      'backgroundType',
    ]),
    ...mapState('image', ['inputImage']),
    ...mapState('size', ['bannerSize']),

    ...mapGetters('background', ['getBackgroundSolidRGBAString']),

    stageConfig() {
      return new StageConfig({
        width: this.bannerSize.width,
        height: this.bannerSize.height,
        drawBorder: true,
      });
    },
  },
  watch: {
    backgroundType() {
      const typesObject = {
        solid: () => {
          this.stage.container().style.background = this.getBackgroundSolidRGBAString;
        },
        gradient: () => {
          this.stage.container().style.background = this.backgroundGradientSettings.style;
        },
      };

      typesObject[this.backgroundType]();
    },

    backgroundSolidSettings() {
      this.stage.container().style.background = this.getBackgroundSolidRGBAString;
    },

    backgroundGradientSettings: {
      handler() {
        this.stage.container().style.background = this.backgroundGradientSettings.style;
      },
      deep: true,
    },

    'inputImage.file': {
      handler() {
        this.imageConfig.image = this.inputImage.file;
        this.changeImageSize('byWidth');
      },
      deep: true,
    },
  },
  created() {
    window.addEventListener('keydown', (event) => this.escapeListener(event));
  },
  mounted() {
    this.stage = this.$refs.stage.getNode();

    this.$root.$on('changeImageSize', (sizeType) => {
      this.changeImageSize(sizeType);
    });
  },
  beforeDestroy() {
    this.$root.$off('changeImageSize');
  },
  methods: {
    /**
     * handlers of conva
     */
    handleTransformEnd,
    handleStageMouseDown,
    updateTransformer,
    updateCanvas,

    /**
     * change image size on canvas
     * @prop {String} sizeType - type of image size
     */
    changeImageSize(sizeType) {
      const imageCanvas = this.$refs.imageCanvas.getNode();

      imageCanvas.position({ x: 0, y: 0 });

      this.imageConfig.rotation = 0;

      const imageSizeMethods = {
        byHeight() {
          this.imageConfig.scaleY =
            this.bannerSize.height / this.inputImage.height;
          this.imageConfig.scaleX =
            this.bannerSize.height / this.inputImage.height;
        },

        byWidth() {
          this.imageConfig.scaleY =
            this.bannerSize.width / this.inputImage.width;
          this.imageConfig.scaleX =
            this.bannerSize.width / this.inputImage.width;
        },
      };

      if (sizeType) imageSizeMethods[sizeType].bind(this)();

      this.updateCanvas();
    },

    /**
     * returning only image with transparent background. Image size === size banner
     * @returns {String} base64 image without mime data
     */
    async getProcessedImage() {
      return new Promise((resolve, reject) => {
        this.updateCanvas();
        if (!this.imageConfig.image) {
          resolve('');
        }
        let link = document.createElement('a');
        link.download = 'filename.png';

        link.href = this.stage.toDataURL({
          pixelRatio: 1,
          mimeType: 'image/png',
        });

        const imageBase64 = getDataBase64(link.href);
        if (imageBase64) {
          resolve(imageBase64);
        } else {
          reject(new Error('Error in creating processed image'));
        }
      });
    },

    /**
     * remove transformer frame (on selected image)
     */
    escapeListener(event) {
      if (event.key === 'Escape') {
        this.updateCanvas();
      }
    },
  },
};
</script>
<style lang="scss" scoped></style>
