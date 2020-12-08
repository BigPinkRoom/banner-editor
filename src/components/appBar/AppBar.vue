<template>
  <v-app-bar app flat color="grey lighten-3" height="67" dark>
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
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters('shared', ['booleanLoadingResultImage']),
  },
  methods: {
    emitDownloadResult() {
      this.$root.$emit('downloadResult');
    },
  },
};
</script>
