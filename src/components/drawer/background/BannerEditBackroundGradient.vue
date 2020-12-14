<template>
  <!-- color picker for gradient -->
  <v-row class="banner-edit-background-gradient">
    <v-col class="px-0">
      <app-color-picker
        :gradient="gradient"
        :isGradient="true"
        :onChange="onChange"
        :onEndChange="onChange"
        :onStartChange="onChange"
      />
    </v-col>
  </v-row>
</template>

<script>
import { mapActions } from 'vuex';
import { ColorPicker } from 'vue-color-gradient-picker';

export default {
  name: 'BannerEditBackgroundGradient',
  components: {
    AppColorPicker: ColorPicker,
  },
  data() {
    return {
      gradient: {
        type: 'linear',
        degree: 0,
        points: [
          {
            alpha: 1,
            blue: 0,
            green: 0,
            left: 0,
            red: 0,
          },
          {
            alpha: 1,
            blue: 0,
            green: 0,
            left: 100,
            red: 255,
          },
        ],
      },
    };
  },
  methods: {
    ...mapActions('background', ['submitBackgroundGradientSettingsToStore']),

    /**
     * change gradient on change in color picker
     * @prop {Object} color - object of 'vue-color-gradient-picker' plugin
     */
    onChange(color) {
      this.submitBackgroundGradientSettingsToStore(color);
    },
  },
};
</script>
<style scoped>
.ui-color-picker {
  width: 300px;
}
</style>
<style src="vue-color-gradient-picker/dist/index.css" lang="css" />
