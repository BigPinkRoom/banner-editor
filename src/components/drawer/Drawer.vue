<template>
  <v-navigation-drawer app permanent width="400">
    <v-list-item class="">
      <v-list-item-content>
        <v-list-item-title class="title text-uppercase"
          >Banner-editor</v-list-item-title
        >
        <v-list-item-subtitle class="text-uppercase">
          absolutely free
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-row>
      <v-col class="col-2 px-0 ml-3">
        <v-tabs vertical color="green darken-2" v-model="tab">
          <v-tabs-slider color="green"></v-tabs-slider>
          <v-tab class="d-flex flex-column px-0 py-8">
            <v-icon>mdi-ruler-square</v-icon>
            <p class="drawer-tabs__title ma-0 text-capitalize">Size</p>
          </v-tab>
          <v-divider></v-divider>
          <v-tab class="d-flex flex-column px-0 py-8">
            <v-icon>mdi-format-color-fill</v-icon>
            <p class="drawer-tabs__title ma-0 text-capitalize">Bkgrd</p>
          </v-tab>
          <v-divider></v-divider>
          <v-tab class="d-flex flex-column px-0 py-8">
            <v-icon>mdi-image</v-icon>
            <p class="drawer-tabs__title ma-0 text-capitalize">Image</p>
          </v-tab>
          <v-divider></v-divider>
          <v-tab class="d-flex flex-column px-0 py-8">
            <v-icon>mdi-format-text</v-icon>
            <p class="drawer-tabs__title ma-0 text-capitalize">Text</p>
          </v-tab>
          <v-divider></v-divider>
          <v-tab class="d-flex flex-column px-0 py-8">
            <v-icon>mdi-border-outside</v-icon>
            <p class="drawer-tabs__title ma-0 text-capitalize">Frame</p>
          </v-tab>
          <v-divider></v-divider>
        </v-tabs>
      </v-col>
      <v-col>
        <v-tabs-items vertical v-model="tab">
          <v-tab-item>
            <app-banner-edit-size></app-banner-edit-size>
          </v-tab-item>
          <v-tab-item>
            <app-banner-edit-background></app-banner-edit-background>
          </v-tab-item>
          <v-tab-item>
            <app-banner-edit-input-image></app-banner-edit-input-image>
          </v-tab-item>
          <v-tab-item>
            <app-banner-edit-text></app-banner-edit-text>
          </v-tab-item>
          <v-tab-item>
            <app-banner-edit-frame></app-banner-edit-frame>
          </v-tab-item>
        </v-tabs-items>
      </v-col>
    </v-row>
  </v-navigation-drawer>
</template>
<script>
import AppBannerEditBackground from './BannerEditBackground';
import AppBannerEditFrame from './BannerEditFrame';
import AppBannerEditInputImage from './BannerEditInputImage';
import AppBannerEditSize from './BannerEditSize';
import AppBannerEditText from './BannerEditText';

export default {
  components: {
    AppBannerEditBackground,
    AppBannerEditFrame,
    AppBannerEditInputImage,
    AppBannerEditSize,
    AppBannerEditText,
  },
  data() {
    return {
      name: 'Drawer',
      tab: null,
    };
  },
};
</script>
<style lang="scss" scoped>
.drawer-tabs__title {
  font-size: 0.675rem;
}
</style>
