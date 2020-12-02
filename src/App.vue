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
/* Canvas */
// canvas style
canvas {
  border: 1px solid gray !important;
}

/* background module */
// gradient module. delete 'p' margin
.gradient-degree-value > p {
  margin-bottom: 0;
}

// gradient module. Less horizontal padding of picker area
.ui-color-picker .picker-area {
  padding: 0 5px;
}

/* all text field */

// label of all text field
.v-label {
  font-size: 14px;
}

/* banner edit tex color module */
// add shadow to button text
.banner-edit-text-color__button .v-btn__content {
  color: #fff;
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 1);
}

// hide before elemen (remove 'focus' darken)
.banner-edit-text-color__button::before {
  display: none;
}
</style>
