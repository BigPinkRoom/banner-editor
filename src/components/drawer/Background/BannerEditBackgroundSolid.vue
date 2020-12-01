<template>
  <!-- Picker for solid color -->
  <v-row>
    <v-col class="px-0">
      <v-color-picker
        dot-size="30"
        hide-inputs
        hide-mode-switch
        mode="rgba"
        width="290"
        class="mx-auto"
        show-swatches
        swatches-max-height="250"
      ></v-color-picker>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'BannerEditBackgroundSolid',
};
</script>

<style></style>
