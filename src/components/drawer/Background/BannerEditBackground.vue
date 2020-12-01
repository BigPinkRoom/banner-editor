<template>
  <v-container>
    <v-row>
      <v-col>
        <p class="text-uppercase green--text mb-0">Background settings</p>
        <v-divider color="green"></v-divider>
      </v-col>
      <v-col class="px-0">
        <v-color-picker
          v-model="bannerBackground"
          dot-size="30"
          hide-inputs
          hide-mode-switch
          mode="hexa"
          width="290"
          class="mx-auto"
          show-swatches
          swatches-max-height="250"
        ></v-color-picker>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      name: 'BannerEditBackground',
      bannerBackground: '#ffffff',
    };
  },
};
</script>
