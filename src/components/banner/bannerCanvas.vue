<template>
  <div>
    <v-stage
      id="stageContainer"
      ref="stage"
      :config="stageConfig"
      @mousedown="handleStageMouseDown"
      @touchstart="handleStageMouseDown"
    >
      <v-layer ref="layer">
        <v-image
          ref="imageCanvas"
          :config="imageConfig"
          @transformend="handleTransformEnd"
        />
        <v-transformer ref="transformer" :config="transformerConfig" />
      </v-layer>
    </v-stage>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { StageConfig } from '../../js/entities/stageConfig';
import {
  handleTransformEnd,
  handleStageMouseDown,
  updateTransformer,
  updateCanvas,
} from '../../js/utils/konva';
import { removeMimeType } from '../../js/helpers/removeMimeType';

export default {
  name: 'BannerCanvas',
  data() {
    return {
      stage: null,
      imageConfig: {
        rotation: 0,
        x: 0,
        y: 0,
        scaleX: 1,
        scaleY: 1,
        image: null,
        name: 'imageName',
        draggable: true,
      },
      transformerConfig: {
        centeredScaling: true,
        borderEnabled: true,
      },
      selectedImageName: '',
    };
  },
  computed: {
    ...mapState('shared', ['loading']),
    ...mapState('image', ['inputImage']),
    ...mapState('size', ['bannerSize']),
    ...mapState('background', ['backgroundGradientSettings', 'backgroundType']),
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
      if (this.backgroundType === 'solid') {
        this.stage.container().style.background = this.getBackgroundSolidRGBAString;
      } else {
        this.stage.container().style.background = this.backgroundGradientSettings.style;
      }
    },
    getBackgroundSolidRGBAString() {
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
    // create listener on keydown event
    window.addEventListener('keydown', (event) => this.escapeListener(event));
  },
  mounted() {
    this.stage = this.$refs.stage.getNode();

    // create listener on custom 'changeImagePosition' event.
    this.$root.$on('changeImageSize', (sizeType) => {
      this.changeImageSize(sizeType);
    });
  },
  beforeDestroy() {
    // delete listener on custom 'changeImagePosition' event (before destroy this component)
    this.$root.$off('changeImageSize');
  },
  methods: {
    // handlers for konva
    handleTransformEnd,
    handleStageMouseDown,
    updateTransformer,
    updateCanvas,

    // change image size on canvas
    changeImageSize(sizeType) {
      const imageCanvas = this.$refs.imageCanvas.getNode();

      // reset image position on canvas
      imageCanvas.position({ x: 0, y: 0 });

      // reset image rotation on canvas
      this.imageConfig.rotation = 0;

      const imageSizeMethods = {
        // change image size by canvas height
        byHeight() {
          this.imageConfig.scaleY =
            this.bannerSize.height / this.inputImage.height;
          this.imageConfig.scaleX =
            this.bannerSize.height / this.inputImage.height;
        },

        // change image size by canvas width
        byWidth() {
          this.imageConfig.scaleY =
            this.bannerSize.width / this.inputImage.width;
          this.imageConfig.scaleX =
            this.bannerSize.width / this.inputImage.width;
        },
      };

      if (sizeType) imageSizeMethods[sizeType].bind(this)();

      // updateCanvas
      this.updateCanvas();
    },

    async returnProcessedImage() {
      // const image = this.$refs.imageCanvas.getNode();
      // console.log(image);
      // const layer = this.$refs.layer.getNode();
      // console.log(layer);
      return new Promise((resolve, reject) => {
        this.updateCanvas();
        let link = document.createElement('a');
        link.download = 'filename.png';

        link.href = this.stage.toDataURL({
          pixelRatio: 1,
          mimeType: 'image/png',
        });

        const imageBase64 = removeMimeType(link.href);
        if (imageBase64) {
          resolve(imageBase64);
        } else {
          reject(new Error('Error in creating processed image'));
        }
      });
    },

    // remove transformer frame (on selected image)
    escapeListener(event) {
      if (event.key === 'Escape') {
        this.updateCanvas();
      }
    },
  },
};
</script>
<style lang="scss" scoped></style>
