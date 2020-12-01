<template>
  <!-- Picker for solid color -->
  <v-row>
    <v-col class="px-0">
      <v-color-picker
        v-model="colorRGBA"
        class="mx-auto"
        dot-size="30"
        hide-inputs
        hide-mode-switch
        mode="rgba"
        show-swatches
        swatches-max-height="250"
        value="#999999"
        width="290"
      ></v-color-picker>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'BannerEditBackgroundSolid',
  data() {
    return {
      colorRGBA: {
        rgba: { r: 0, g: 0, b: 0, a: 0 },
      },
    };
  },
  computed: {
    ...mapState('background', ['backgroundSolidSettings']),
  },
  watch: {
    // watch on solid color change
    colorRGBA() {
      this.submitBackgroundSolidSettingsToStore(this.colorRGBA.rgba);
    },
  },
  methods: {
    ...mapActions('background', ['submitBackgroundSolidSettingsToStore']),
  },
  mounted() {
    if (this.backgroundSolidSettings) {
      this.colorRGBA.rgba = this.backgroundSolidSettings;
      return;
    }

    // set default color on first load
    this.colorRGBA.rgba = { r: 206, g: 147, b: 216, a: 1 };
  },
};
</script>

<style></style>
