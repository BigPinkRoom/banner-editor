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
        <v-tabs vertical color="green darken-2">
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
      <v-col> </v-col>
    </v-row>
  </v-navigation-drawer>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
.drawer-tabs__title {
  font-size: 0.675rem;
}
</style>
