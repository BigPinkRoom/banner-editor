<template>
  <div>
    <!-- banner container zoom tag -->
    <div
      :style="{ transform: `scale(${zoomModifier})`, transformOrigin: 'top' }"
    >
      <v-container class="d-flex justify-center align-center">
        <v-row class="d-flex justify-center">
          <v-col class="col-auto">
            <!-- banner container -->
            <app-banner-container :zoomModifier="zoomModifier">
            </app-banner-container>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <!-- zoom banner slider -->
    <v-container class="app-main__scale">
      <v-row>
        <v-col>
          <v-slider
            v-model="zoomModifier"
            append-icon="mdi-magnify-plus-outline"
            class=""
            inverse-label
            max="1"
            min="0.1"
            persistent-hint
            prepend-icon="mdi-magnify-minus-outline"
            step="0.01"
            thumb-label
          ></v-slider>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import BannerContainer from './BannerContainer';

export default {
  name: 'ViewBanner',
  components: {
    AppBannerContainer: BannerContainer,
  },
  data() {
    return {
      zoomModifier: 1,
    };
  },
};
</script>
<style lang="scss" scoped>
.app-main__scale {
  position: fixed;
  top: 85px;
  right: 40px;
  width: 250px;
}
</style>
