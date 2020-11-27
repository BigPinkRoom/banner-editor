<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <div>
            <banner-canvas></banner-canvas>
          </div>
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
    return {};
  },
};
</script>
<style lang="scss" scoped></style>
