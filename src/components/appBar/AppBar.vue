<template>
  <v-app-bar
    app
    color="grey lighten-3"
    dark
    flat
    height="67"
    @click="emitBannerHTMLClipboard"
  >
    <v-row>
      <v-col>
        <p class="ma-0 text-uppercase blue--text">
          Final size (with borders): W
          {{ bannerSize.width + bannerFrame.frameSize * 2 }}; H
          {{ bannerSize.height + bannerFrame.frameSize * 2 }}
        </p>
      </v-col>
    </v-row>
    <v-spacer></v-spacer>
    <v-btn
      color="blue"
      outlined
      class="mr-2"
      @click="emitSettingsToClipboard"
      :loading="booleanLoadingSettingsToJSON"
    >
      Json
      <v-icon class="ml-1">
        mdi-content-copy
      </v-icon>
    </v-btn>
    <v-btn color="blue" outlined class="mr-2">
      Html
      <v-icon class="ml-1">
        mdi-content-copy
      </v-icon>
    </v-btn>
    <v-btn
      color="green darken-2"
      outlined
      :loading="booleanLoadingImageResult"
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
  computed: {
    ...mapState('size', ['bannerSize']),
    ...mapState('frame', ['bannerFrame']),
    ...mapGetters('shared', [
      'booleanLoadingImageResult',
      'booleanLoadingSettingsToJSON',
      'booleanLoadingBannerToHTML',
    ]),
  },
  methods: {
    emitBannerHTMLClipboard() {
      this.$root.$emit('copyBannerHTMLToClipboard');
    },
    emitSettingsToClipboard() {
      this.$root.$emit('copySettingsJSONToClipboard');
    },
    emitDownloadResult() {
      this.$root.$emit('downloadResult');
    },
  },
};
</script>
