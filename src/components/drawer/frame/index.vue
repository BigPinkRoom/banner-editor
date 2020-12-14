<template>
  <v-container>
    <!-- title -->
    <v-row>
      <v-col>
        <p class="text-uppercase green--text mb-0">Banner frame settings</p>
        <v-divider color="green"></v-divider>
      </v-col>
    </v-row>
    <app-frame-settings-edit />
  </v-container>
</template>
<script>
import FrameSettingsEdit from './FrameSettingsEdit';

export default {
  name: 'EditFrame',
  components: {
    AppFrameSettingsEdit: FrameSettingsEdit,
  },
};
</script>
