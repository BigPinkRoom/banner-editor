<template>
  <div>
    <div
      :style="{ transform: `scale(${zoomModifier})`, transformOrigin: 'top' }"
    >
      <v-container class="d-flex justify-center align-center">
        <v-row class="d-flex justify-center">
          <v-col class="col-auto">
            <app-banner-container :zoomModifier="zoomModifier">
            </app-banner-container>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <v-container class="app-main__scale">
      <v-row>
        <v-col>
          <v-slider
            v-model="zoomModifier"
            append-icon="mdi-magnify-plus-outline"
            class=""
            max="1"
            min="0.1"
            inverse-label
            step="0.01"
            persistent-hint
            prepend-icon="mdi-magnify-minus-outline"
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
