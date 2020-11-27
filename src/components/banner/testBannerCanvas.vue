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
            :config="{
              x: 0,
              y: 0,
              width: 500,
              height: 500,
              fill: 'rgb(2,0,36)',
              shadowBlur: 10,
            }"
          />

          <v-image :config="imageConfig" @transformend="handleTransformEnd" />
          <v-transformer ref="transformer" />
        </v-layer>
      </v-stage>
    </div>
    <v-btn class="green" @click="downloadResult">Download</v-btn>
    <v-btn class="orange" @click="downloadFullResult">Download</v-btn>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Konva from 'konva';
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

        scaleX: 0.416,
        scaleY: 0.416,
        image: null,
        name: 'imageName',
        draggable: true,
      },
      selectedImageName: '',
    };
  },
  computed: {
    ...mapState('shared', ['loading']),
    ...mapState('banner', ['inputImage']),
  },
  watch: {
    inputImage() {
      this.imageConfig.rotation = 0;
      this.imageConfig.x = 0;
      this.imageConfig.y = 0;
      const image = new window.Image();
      image.src = this.inputImage.file;
      image.onload = () => {
        // set image only when it is loaded
        console.log(this.width, this.height);
        this.imageConfig.image = image;
      };
    },
  },
  created() {
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
    downloadFullResult() {
      this.selectedImageName = '';
      this.updateTransformer();
      console.log(this);

      // const link = document.createElement('a');
      // link.download = 'filename.png';

      const node = document.getElementById('banner__container');
      const container = document.getElementsByClassName('v-main__wrap')[0];
      domToImage
        .toPng(node)
        .then(function(dataUrl) {
          const img = new Image();
          img.src = dataUrl;
          container.appendChild(img);
          // link.href = dataUrl;
          // link.click();
        })
        .catch(function(error) {
          console.error('something went wrong!', error);
        });
    },
    downloadResult() {
      console.log(this);
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
      const rect = this.imageConfig;
      // update the state
      rect.x = e.target.x();
      rect.y = e.target.y();
      rect.rotation = e.target.rotation();
      rect.scaleX = e.target.scaleX();
      rect.scaleY = e.target.scaleY();

      // change fill
      rect.fill = Konva.Util.getRandomColor();
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

      // find clicked rect by its name
      const name = e.target.name();
      const rect = this.imageConfig;
      if (rect) {
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
