<template>
  <v-app-bar app flat color="grey lighten-3" height="67" dark>
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
    <v-btn color="blue" outlined class="mr-2">
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
      :loading="booleanLoadingResultImage"
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
    ...mapGetters('shared', ['booleanLoadingResultImage']),
  },
  methods: {
    emitDownloadResult() {
      this.$root.$emit('downloadResult');
    },
  },
};
</script>
