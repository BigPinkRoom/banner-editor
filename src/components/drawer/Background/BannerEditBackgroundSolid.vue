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
        width="290"
      ></v-color-picker>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'BannerEditBackgroundSolid',
  data() {
    return {
      colorRGBA: {
        rgba: {
          r: '',
          g: '',
          b: '',
          a: '',
        },
      },
    };
  },
  watch: {
    colorRGBA() {
      this.submitBackgroundSolidSettingsToStore(this.colorRGBA.rgba);
    },
  },
  methods: {
    ...mapActions('background', ['submitBackgroundSolidSettingsToStore']),
  },
};
</script>

<style></style>
