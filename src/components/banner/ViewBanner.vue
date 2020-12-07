<template>
  <v-container class="d-flex justify-center align-center">
    <v-row class="d-flex justify-center">
      <v-col class="col-auto">
        <app-banner-container> </app-banner-container>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import BannerContainer from './BannerContainer';

export default {
  name: 'ViewBanner',
  components: {
    AppBannerContainer: BannerContainer,
  },
};
</script>
<style lang="scss" scoped></style>
