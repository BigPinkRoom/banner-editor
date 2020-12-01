<template>
  <v-app>
    <app-drawer></app-drawer>
    <app-app-bar></app-app-bar>
    <v-main>
      <app-view-banner></app-view-banner>
    </v-main>
    <app-snack-bar-error></app-snack-bar-error>
  </v-app>
</template>

<script>
import AppBar from './components/appBar/AppBar';
import Drawer from './components/drawer/Drawer';
import SnackBarError from './components/common/SnackBarError';
import ViewBanner from './components/banner/ViewBanner';

export default {
  name: 'App',
  components: {
    AppAppBar: AppBar,
    AppDrawer: Drawer,
    AppSnackBarError: SnackBarError,
    AppViewBanner: ViewBanner,
  },
};
</script>
<style lang="scss">
// canvas style
canvas {
  border: 1px solid gray !important;
}

// gradient module. delete 'p' margin
.gradient-degree-value > p {
  margin-bottom: 0;
}

// gradient module. Less horizontal padding of picker area
.ui-color-picker .picker-area {
  padding: 0 5px;
}
</style>
