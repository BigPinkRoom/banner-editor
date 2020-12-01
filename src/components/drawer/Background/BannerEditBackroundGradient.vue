<template>
  <v-row>
    <v-col class="px-0">
      <app-color-picker
        :gradient="gradient"
        :isGradient="true"
        :onStartChange="(color) => onChange(color, 'start')"
        :onChange="(color) => onChange(color, 'change')"
        :onEndChange="(color) => onChange(color, 'end')"
      />
    </v-col>
  </v-row>
</template>

<script>
import { mapActions } from 'vuex';
import { ColorPicker } from 'vue-color-gradient-picker';

export default {
  name: 'BannerEditBackgroundGradient',
  components: {
    AppColorPicker: ColorPicker,
  },
  data() {
    return {
      gradient: {
        type: 'linear',
        degree: 0,
        points: [
          {
            left: 0,
            red: 0,
            green: 0,
            blue: 0,
            alpha: 1,
          },
          {
            left: 100,
            red: 255,
            green: 0,
            blue: 0,
            alpha: 1,
          },
        ],
      },
    };
  },
  methods: {
    ...mapActions('background', ['submitBackgroundGradientSettingsToStore']),

    setGradient() {
      this.submitBackgroundGradientSettingsToStore(this.gradient);
    },

    onChange(attrs, name) {
      console.log(name, attrs);
      this.submitBackgroundGradientSettingsToStore(attrs);
    },
  },
};
</script>
<style scoped>
.ui-color-picker {
  width: 300px;
}
</style>
<style src="vue-color-gradient-picker/dist/index.css" lang="css" />
