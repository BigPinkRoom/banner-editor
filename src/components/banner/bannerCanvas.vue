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
  unselectTransformer,
} from '../../js/utils/konva';

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
    inputImage: {
      handler() {
        this.imageConfig.image = this.inputImage.file;
        this.changeImagePosition('byWidth');
      },
      deep: true,
    },
  },
  created() {
    window.addEventListener('keydown', (event) => this.escapeListener(event));
  },
  mounted() {
    this.stage = this.$refs.stage.getNode();

    this.$root.$on('changeImagePosition', (positionType) => {
      this.changeImagePosition(positionType);
    });
  },
  beforeDestroy() {
    this.$root.$off('changeImagePosition');
  },
  methods: {
    handleTransformEnd,
    handleStageMouseDown,
    updateTransformer,
    unselectTransformer,

    changeImagePosition(positionType) {
      const that = this;
      const imageCanvas = this.$refs.imageCanvas.getNode();
      imageCanvas.position({ x: 0, y: 0 });
      this.imageConfig.rotation = 0;

      const imagePositionTypes = {
        byHeight() {
          that.imageConfig.scaleY =
            that.bannerSize.height / that.inputImage.height;
          that.imageConfig.scaleX =
            that.bannerSize.height / that.inputImage.height;
        },
        byWidth() {
          that.imageConfig.scaleY =
            that.bannerSize.width / that.inputImage.width;
          that.imageConfig.scaleX =
            that.bannerSize.width / that.inputImage.width;
        },
      };
      if (positionType) imagePositionTypes[positionType]();
      this.unselectTransformer();
    },

    downloadResult() {
      this.unselectTransformer();
      const link = document.createElement('a');
      link.download = 'filename.png';

      link.href = this.stage.toDataURL({
        pixelRatio: 1,
        mimeType: 'image/png',
      });
      link.click();
    },

    // remove transformer frame (on selected image)
    escapeListener(event) {
      if (event.key === 'Escape') {
        this.eventMessage = 'test-A';
        console.log(this.eventMessage);
        this.unselectTransformer();
      }
    },
  },
};
</script>
<style lang="scss" scoped></style>
