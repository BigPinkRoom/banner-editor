<template>
  <v-container>
    <v-row>
      <v-col>
        <p class="text-uppercase green--text mb-0">Banner frame settings</p>
        <v-divider color="green"></v-divider>
      </v-col>
    </v-row>
    <app-banner-edit-frame-settings></app-banner-edit-frame-settings>
  </v-container>
</template>
<script>
import BannerEditFrameSettings from './BannerEditFrameSettings';

export default {
  name: 'BannerEditFrame',
  components: {
    AppBannerEditFrameSettings: BannerEditFrameSettings,
  },
  data() {
    return {};
  },
};
</script>
