<template>
  <v-container>
    <v-row>
      <v-col class="pb-0">
        <p class="text-uppercase green--text mb-0">Background settings</p>

        <v-divider color="green"></v-divider>

        <v-radio-group
          v-model="editBackgroundType"
          mandatory
          row
          @change="submitBackgroundTypeToStore(editBackgroundType)"
        >
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
import { mapActions } from 'vuex';
import BannerEditBackgroundSolid from './BannerEditBackgroundSolid';
import BannerEditBackgroundGradient from './BannerEditBackroundGradient';

export default {
  name: 'BannerEditBackground',
  components: {
    AppBannerEditBackgroundSolid: BannerEditBackgroundSolid,
    AppBannerEditBackgroundGradient: BannerEditBackgroundGradient,
  },
  data() {
    return {
      editBackgroundType: 'solid',
    };
  },
  methods: {
    ...mapActions('background', ['submitBackgroundTypeToStore']),
  },
};
</script>
