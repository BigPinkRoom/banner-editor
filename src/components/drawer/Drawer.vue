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
            <edit-size></edit-size>
          </v-tab-item>
          <v-tab-item>
            <edit-background></edit-background>
          </v-tab-item>
          <v-tab-item>
            <edit-input-image></edit-input-image>
          </v-tab-item>
          <v-tab-item>
            <edit-text></edit-text>
          </v-tab-item>
          <v-tab-item>
            <edit-frame></edit-frame>
          </v-tab-item>
        </v-tabs-items>
      </v-col>
    </v-row>
  </v-navigation-drawer>
</template>
<script>
import EditBackground from './BannerEditBackground';
import EditFrame from './BannerEditFrame';
import EditInputImage from './BannerEditInputImage';
import EditSize from './BannerEditSize';
import EditText from './BannerEditText';

export default {
  components: {
    EditBackground,
    EditFrame,
    EditInputImage,
    EditSize,
    EditText,
  },
  data() {
    return {
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
