<template>
  <v-container>
    <v-row>
      <v-col>
        <p class="text-uppercase green--text mb-0">Background settings</p>

        <v-divider color="green"></v-divider>

        <v-radio-group v-model="editBackgroundType" mandatory row>
          <v-radio label="Solid" value="solid"></v-radio>
          <v-radio label="Gradient" value="gradient"></v-radio>
        </v-radio-group>
      </v-col>
    </v-row>

    <app-banner-edit-background-solid v-if="editBackgroundType === 'solid'" />
    <app-banner-edit-background-gradient
      v-if="editBackgroundType === 'gradient'"
    />
  </v-container>
</template>
<script>
import BannerEditBackgroundSolid from './BannerEditBackgroundSolid';
import BannerEditBackgroundGradient from './BannerEditBackroundGradient';

export default {
  components: {
    AppBannerEditBackgroundSolid: BannerEditBackgroundSolid,
    AppBannerEditBackgroundGradient: BannerEditBackgroundGradient,
  },
  data() {
    return {
      name: 'BannerEditBackground',
      editBackgroundType: 'solid',
    };
  },
};
</script>
