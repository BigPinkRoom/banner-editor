<template>
  <div>
    <div id="banner__container">
      <p id="text" class="text_on_image">Test</p>
      <v-stage
        id="stageContainer"
        ref="stage"
        :config="stageSize"
        @mousedown="handleStageMouseDown"
        @touchstart="handleStageMouseDown"
      >
        <v-layer ref="layer">
          <v-rect
            ref="shape"
            :config="{
              x: 0,
              y: 0,
              width: stageSize.width,
              height: stageSize.height,
              fill: 'rgb(2,0,36)',
              shadowBlur: 10,
            }"
          />

          <v-image
            ref="imageCanvas"
            :config="imageConfig"
            @transformend="handleTransformEnd"
          />
          <v-transformer ref="transformer" :config="transformerConfig" />
        </v-layer>
      </v-stage>
    </div>
    <v-btn class="blue" @click="resetImagePosition">Reset width</v-btn>
    <v-btn class="green" @click="downloadResult">Download</v-btn>
    <v-btn class="orange" @click="downloadFullResult">Download</v-btn>
    <v-btn class="grey" @click="imagePositionByHeight">By full height</v-btn>
    <v-btn class="teal" @click="imagePositionByWidth">By full width</v-btn>
    <v-btn @click="test">test</v-btn>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import domToImage from 'dom-to-image';

export default {
  data() {
    return {
      stage: null,
      stageSize: {
        width: 500,
        height: 500,
        drawBorder: true,
      },
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
  },
  watch: {
    bannerSize: {
      handler() {
        this.stageSize.width = this.bannerSize.width;
        this.stageSize.height = this.bannerSize.height;
      },
      deep: true,
    },
    inputImage: {
      handler() {
        let imageCanvas = this.$refs.imageCanvas.getNode();
        imageCanvas.position({ x: 0, y: 0 });
        this.imageConfig.rotation = 0;

        this.imageConfig.scaleX = this.stageSize.width / this.inputImage.width;
        this.imageConfig.scaleY = this.stageSize.width / this.inputImage.width;

        this.imageConfig.image = this.inputImage.file;
        this.selectedImageName = '';
        this.updateTransformer();
      },
      deep: true,
    },
  },
  created() {
    this.stageSize.width = this.bannerSize.width;
    this.stageSize.height = this.bannerSize.height;
    const image = new window.Image();
    image.src =
      'https://images.theconversation.com/files/93616/original/image-20150902-6700-t2axrz.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1000&fit=clip';
    image.crossOrigin = 'Anonymous';
    image.onload = () => {
      // set image only when it is loaded
      this.imageConfig.image = image;
    };
  },
  methods: {
    test() {
      console.log(this.bannerSize);
      console.log(this.bannerSize.width);
      console.log(this.bannerSize.height);
    },
    imagePositionByHeight() {
      const imageCanvas = this.$refs.imageCanvas.getNode();
      imageCanvas.position({ x: 0, y: 0 });
      this.imageConfig.rotation = 0;

      this.imageConfig.scaleY = this.stageSize.height / this.inputImage.height;

      this.imageConfig.scaleX = this.stageSize.height / this.inputImage.height;

      this.selectedImageName = '';
      this.updateTransformer();
    },
    imagePositionByWidth() {
      let imageCanvas = this.$refs.imageCanvas.getNode();
      imageCanvas.position({ x: 0, y: 0 });
      this.imageConfig.rotation = 0;

      this.imageConfig.scaleY = this.stageSize.width / this.inputImage.width;

      this.imageConfig.scaleX = this.stageSize.width / this.inputImage.width;

      this.selectedImageName = '';
      this.updateTransformer();
    },
    resetImagePosition() {
      let imageCanvas = this.$refs.imageCanvas.getNode();
      imageCanvas.position({ x: 0, y: 0 });
      this.imageConfig.rotation = 0;

      this.selectedImageName = '';
      this.updateTransformer();

      // this.imageConfig.x = 0;
      // this.imageConfig.y = 0;
    },
    async downloadFullResult() {
      this.selectedImageName = '';

      const transformerNode = this.$refs.transformer.getNode();
      transformerNode.nodes([]);

      transformerNode.getLayer().batchDraw();

      let container = document.getElementsByClassName('v-main__wrap')[0];

      await new Promise((resolve) => {
        setTimeout(() => resolve(), 1000);
      });

      // const link = document.createElement('a');
      // link.download = 'filename.png';

      try {
        let node = document.getElementById('banner__container');
        let dataUrl = await domToImage.toPng(node);
        await (function() {
          const img = new Image();
          img.src = dataUrl;
          container.appendChild(img);

          // link.href = dataUrl;
          // link.click();
        })();
      } catch (error) {
        console.error('something went wrong!', error);
      }
    },
    downloadResult() {
      this.selectedImageName = '';
      this.updateTransformer();
      const link = document.createElement('a');
      link.download = 'filename.png';

      link.href = this.stage.toDataURL({
        pixelRatio: 1,
        mimeType: 'image/png',
      });
      link.click();
    },
    handleTransformEnd(e) {
      // shape is transformed, let us save new attrs back to the node
      // find element in our state
      const image = this.imageConfig;
      // update the state
      image.x = e.target.x();
      image.y = e.target.y();
      image.rotation = e.target.rotation();
      image.scaleX = e.target.scaleX();
      image.scaleY = e.target.scaleY();
    },
    handleStageMouseDown(e) {
      // clicked on stage - clear selection
      if (e.target === e.target.getStage()) {
        this.selectedImageName = '';
        this.updateTransformer();
        return;
      }

      // clicked on transformer - do nothing
      const clickedOnTransformer =
        e.target.getParent().className === 'Transformer';
      if (clickedOnTransformer) {
        return;
      }

      // find clicked image by its name
      const name = e.target.name();
      const image = this.imageConfig;
      if (image) {
        this.selectedImageName = name;
      } else {
        this.selectedImageName = '';
      }
      this.updateTransformer();
    },
    updateTransformer() {
      // here we need to manually attach or detach Transformer node
      const transformerNode = this.$refs.transformer.getNode();
      const stage = transformerNode.getStage();
      const { selectedImageName } = this;

      const selectedNode = stage.findOne('.' + selectedImageName);
      // do nothing if selected node is already attached
      if (selectedNode === transformerNode.node()) {
        return;
      }

      if (selectedNode) {
        // attach to another node
        transformerNode.nodes([selectedNode]);
      } else {
        // remove transformer
        transformerNode.nodes([]);
      }
      transformerNode.getLayer().batchDraw();
    },
  },
  mounted() {
    this.stage = this.$refs.stage.getNode();
    // const stage = this.$refs.stage.getNode();
    // const dataURL = stage.toDataURL({ pixelRatio: 1 });
    // console.log(dataURL);
  },
};
</script>
<style lang="scss" scoped>
.text_on_image {
  position: absolute;
  top: 100px;
  left: 100px;
  font-size: 30px;
  z-index: 1000;
}
#banner__container {
  width: 500px;
}
</style>
