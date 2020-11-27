<template>
  <v-app>
    <drawer></drawer>
    <app-bar></app-bar>
    <v-main>
      <view-banner></view-banner>
    </v-main>
  </v-app>
</template>

<script>
import ViewBanner from './components/banner/ViewBanner.vue';
import AppBar from './components/appBar/AppBar';
import Drawer from './components/drawer/Drawer';
export default {
  name: 'App',
  components: {
    AppBar,
    Drawer,
    ViewBanner,
  },
};
</script>
<style lang="scss">
canvas {
  border: 1px solid gray !important;
}
</style>
