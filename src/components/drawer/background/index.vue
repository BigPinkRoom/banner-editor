<template>
  <v-container>
    <v-row>
      <v-col>
        <v-row>
          <v-col class="pb-0">
            <!-- title -->
            <p class="text-uppercase green--text mb-0">Background settings</p>

            <v-divider color="green"></v-divider>

            <!-- change type background -->
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

        <!-- solid background module -->
        <app-background-solid-edit v-if="isBackgroundTypeSolid()" />

        <!-- gradient background module -->
        <app-background-gradient-edit v-if="isBackgroundTypeGradient()" />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapActions } from 'vuex';
import BackgroundSolidEdit from './BackgroundSolidEdit';
import BackgroundGradientEdit from './BackgroundGradientEdit';

export default {
  name: 'EditBackground',
  components: {
    AppBackgroundSolidEdit: BackgroundSolidEdit,
    AppBackgroundGradientEdit: BackgroundGradientEdit,
  },
  data() {
    return {
      editBackgroundType: 'solid',
    };
  },
  methods: {
    ...mapActions('background', ['submitBackgroundTypeToStore']),

    /**
     * convert RGBA text color to string
     * @return {Boolean} background type
     */
    isBackgroundTypeSolid() {
      return this.editBackgroundType === 'solid';
    },

    /**
     * convert RGBA text color to string
     * @return {Boolean} background type
     */
    isBackgroundTypeGradient() {
      return this.editBackgroundType === 'gradient';
    },
  },
};
</script>
