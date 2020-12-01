<template>
  <v-container>
    <v-row class="d-flex flex-column">
      <v-col class="mr-5">
        <p class="text-uppercase green--text mb-0">Banner size settings</p>
        <v-divider color="green"></v-divider>
      </v-col>
      <v-col class="mr-5">
        <v-text-field
          v-model="bannerWidth"
          dense
          label="width"
          outlined
          type="number"
        ></v-text-field>
        <v-text-field
          v-model="bannerHeight"
          outlined
          dense
          type="number"
          label="height"
        ></v-text-field>
      </v-col>
      <v-col class="pt-0">
        <v-btn
          class="white--text"
          color="green"
          @click="submitBannerSizeToStore"
          >Change size</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapActions, mapState } from 'vuex';
import { validationMixin } from 'vuelidate';
import { BannerSize } from '../../js/entities/bannerSize';
import { validationBannerEditInputImage } from '../../js/validators/validationsRules';

export default {
  name: 'BannerEditSize',
  mixins: [validationMixin],

  // VUETIFY. Validations rules
  validations: validationBannerEditInputImage.validations,

  data() {
    return {
      bannerWidth: 800,
      bannerHeight: 600,
    };
  },
  computed: {
    ...mapState('size', ['bannerSize']),
  },
  methods: {
    ...mapActions('size', ['submitBannerSizeToStore']),

    changeBannerSize() {
      this.submitBannerSizeToStore(
        new BannerSize({ width: this.bannerWidth, height: this.bannerHeight })
      );
    },
  },
};
</script>
