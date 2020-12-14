<template>
  <!-- main app -->
  <v-app>
    <!-- drawer component -->
    <app-drawer />

    <!-- app-bar component -->
    <app-app-bar />

    <!-- banner component -->
    <v-main class="app__v-main">
      <app-view-banner />
    </v-main>

    <app-snack-bar-error></app-snack-bar-error>
  </v-app>
</template>

<script>
import AppBar from './components/appBar';
import Drawer from './components/drawer';
import SnackBarError from './components/common/SnackBarError';
import ViewBanner from './components/banner';

export default {
  name: 'MainApp',
  components: {
    AppAppBar: AppBar,
    AppDrawer: Drawer,
    AppSnackBarError: SnackBarError,
    AppViewBanner: ViewBanner,
  },
};
</script>
<style lang="scss">
/* body */
body {
  min-width: 1160px;
  background-color: #fafafa;
}

/* main vue */
// v-main background
.app__v-main {
  background-color: rgb(250, 250, 250);
}

// center content in main wrap
.v-main__wrap {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* background gradient module */
.banner-edit-background-gradient {
  // gradient module. delete 'p' margin
  & .gradient-degree-value > p {
    margin-bottom: 0;
  }
  // gradient module. Less horizontal padding of picker area
  & .ui-color-picker .picker-area {
    padding: 0 5px;
  }
}

/* all text field */
// v-input font size
.v-input {
  font-size: 14px;
}

// v-radio label font size
.v-radio .v-label {
  font-size: 14px;
}

/* banner edit text color module button */

.banner-edit-text-color__button {
  // add shadow to button text
  & .v-btn__content {
    color: #fff;
    text-shadow: 1px 1px 5px rgba(0, 0, 0, 1);
  }

  // hide before element (remove 'focus' darken)
  &::before {
    display: none;
  }
}

/* banner edit text - text module */
.banner-edit-text__module {
  // add border to expansin panel
  & .v-expansion-panel {
    border: 1px solid #ddd;
    border-radius: 7px;
  }

  // delete default top lines of expansion panel header
  &.v-expansion-panel::after {
    display: none;
  }

  // delete text field details (errors) in each text module
  & .v-text-field__details {
    display: none;
  }

  // banner edit expansion header - custom padding
  .v-expansion-panel-header {
    padding: 16px 10px;
  }

  // banner edit expansion content - custom padding
  .v-expansion-panel-content__wrap {
    padding: 0 10px 16px;
  }
}
</style>
