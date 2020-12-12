<template>
  <v-app-bar app color="grey lighten-3" dark flat height="67">
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
      :loading="booleanLoadingSettingsToJSON"
      class="mr-2"
      color="blue"
      outlined
      @click="emitSettingsToClipboard"
    >
      Json
      <v-icon class="ml-1">
        mdi-content-copy
      </v-icon>
    </v-btn>
    <v-btn
      :loading="booleanLoadingBannerToHTML"
      class="mr-2"
      color="blue"
      outlined
      @click="emitBannerHTMLClipboard"
    >
      Html
      <v-icon class="ml-1">
        mdi-content-copy
      </v-icon>
    </v-btn>
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
