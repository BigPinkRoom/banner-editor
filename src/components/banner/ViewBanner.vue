<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <banner-canvas></banner-canvas>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import bannerCanvas from './testBannerCanvas';

export default {
  components: {
    bannerCanvas,
  },
  data() {
    return {
      name: 'ViewBanner',
    };
  },
};
</script>
<style lang="scss" scoped></style>
