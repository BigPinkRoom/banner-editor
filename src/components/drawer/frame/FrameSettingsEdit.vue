<template>
  <v-container class="banner-edit-frame-settings py-1">
    <!-- frame size  -->
    <v-row>
      <v-col class="pa-0">
        <v-subheader class="banner-edit-frame-settings__subheader">
          Border size
        </v-subheader>
        <v-slider
          v-model="bannerFrame.frameSize"
          max="150"
          min="0"
          persistent-hint
          thumb-label
        ></v-slider>
      </v-col>
    </v-row>

    <!-- frame radius  -->
    <v-row>
      <v-col class="pa-0">
        <v-subheader class="banner-edit-frame-settings__subheader">
          Border radius
        </v-subheader>
        <v-slider
          v-model="bannerFrame.frameRadius"
          max="150"
          min="0"
          persistent-hint
          thumb-label
        ></v-slider>
      </v-col>
    </v-row>

    <!-- frame color  -->
    <v-row>
      <v-col class="pa-0">
        <v-subheader class="banner-edit-frame-settings__subheader">
          Border color
        </v-subheader>
        <v-color-picker
          v-model="bannerFrame.frameColorRGBA"
          dot-size="30"
          hide-inputs
          hide-mode-switch
          mode="rgba"
          show-swatches
          swatches-max-height="200"
          value="#999999"
          width="290"
        ></v-color-picker>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'EditFrameSettings',
  data() {
    return {
      bannerFrame: {
        frameSize: 1,
        frameRadius: 7,
        frameColorRGBA: {
          r: 210,
          g: 210,
          b: 210,
          a: 1,
        },
      },
    };
  },
  watch: {
    bannerFrame: {
      handler() {
        this.submitBannerFrameToStore(this.bannerFrame);
      },
      deep: true,
    },
  },
  methods: {
    ...mapActions('frame', ['submitBannerFrameToStore']),
  },
};
</script>

<style lang="scss" scoped>
.banner-edit-frame-settings .banner-edit-frame-settings__subheader {
  color: #000;
}
</style>
