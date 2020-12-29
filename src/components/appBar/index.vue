<template>
  <v-app-bar app color="grey lighten-3" dark flat height="67">
    <!-- show current size of banner with borders -->
    <v-row>
      <v-col>
        <p class="ma-0 text-uppercase blue--text">
          Final size (with borders): W {{ getFinalSize('width') }}; H
          {{ getFinalSize('height') }}
        </p>
      </v-col>
    </v-row>
    <v-spacer></v-spacer>

    <!-- download banner settings is JSON -->
    <v-btn
      :loading="booleanLoadingSettingsToJSON"
      class="mr-2"
      color="blue"
      outlined
      @click="emitCreateSettingsJSON"
    >
      To JSON
    </v-btn>

    <!-- download banner is HTML -->
    <v-btn
      :loading="booleanLoadingBannerToHTML"
      class="mr-2"
      color="blue"
      outlined
      @click="emitCreateBannerHTML"
    >
      To HTML
    </v-btn>

    <!-- download banner on user device -->
    <v-btn
      :loading="booleanLoadingImageResult"
      color="green darken-2"
      outlined
      @click="emitDownloadResult"
    >
      Download png
      <v-icon>
        mdi-download
      </v-icon>
    </v-btn>
  </v-app-bar>
</template>
<script>
import { mapGetters, mapState } from 'vuex';

export default {
  name: 'AppBar',
  computed: {
    ...mapState('size', ['bannerSize']),
    ...mapState('frame', ['bannerFrame']),
    ...mapGetters('shared', [
      'booleanLoadingSettingsToJSON',
      'booleanLoadingBannerToHTML',
      'booleanLoadingImageResult',
    ]),
  },
  methods: {
    emitCreateSettingsJSON() {
      this.$root.$emit('createSettingsJSON');
    },
    emitCreateBannerHTML() {
      this.$root.$emit('createBannerHTML');
    },
    emitDownloadResult() {
      this.$root.$emit('downloadResult');
    },

    /**
     * calculates the final size
     * @returns {Number}
     */
    getFinalSize(type) {
      return {
        width: this.bannerSize.width + this.bannerFrame.frameSize * 2,
        height: this.bannerSize.height + this.bannerFrame.frameSize * 2,
      }[type];
    },
  },
};
</script>
