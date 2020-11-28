<template>
  <div>
    <v-row>
      <v-col>
        <input type="file" @change="onFileChange" />
      </v-col>
    </v-row>
    <v-row>
      <v-col></v-col>
    </v-row>
  </div>
</template>
<script>
import { mapActions, mapMutations } from 'vuex';
import { InputImage } from '../../js/entities/InputImage';

export default {
  data() {
    return {};
  },
  methods: {
    ...mapActions('shared', ['CLEAR_ERROR', 'SET_ERROR']),
    ...mapMutations('image', ['CHANGE_INPUT_IMAGE']),

    // event of file changed (upload image)
    async onFileChange(event) {
      const reader = new FileReader();

      const file = event.target.files[0];

      reader.readAsDataURL(file);

      await this.CLEAR_ERROR();

      if (file.size > 1024 * 1024) {
        await this.SET_ERROR(
          `Max upload image is 1 Mb. Your image is ${file.size / 1000} Kb`
        );
        return;
      }

      reader.onload = (event) => {
        const image = new Image();
        let imageWidth;
        let imageHeight;
        image.src = event.target.result;
        const changeInputImageLocal = this.CHANGE_INPUT_IMAGE;
        image.onload = function() {
          imageWidth = this.width;
          imageHeight = this.height;
          changeInputImageLocal(
            new InputImage({
              file: image,
              width: imageWidth,
              height: imageHeight,
            })
          );
        };
      };
    },
  },
};
</script>
