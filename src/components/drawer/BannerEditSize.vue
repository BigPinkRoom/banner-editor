<template>
  <v-container>
    <v-row class="d-flex flex-column">
      <!-- title -->
      <v-col class="mr-5">
        <p class="text-uppercase green--text mb-0">Banner size settings</p>
        <v-divider color="green"></v-divider>
      </v-col>

      <v-col class="mr-5">
        <!-- change banner width -->
        <v-text-field
          v-model.trim="bannerWidth"
          :error-messages="bannerWidthErrors"
          dense
          label="width"
          outlined
          type="number"
          @keydown.enter="changeBannerSize"
        ></v-text-field>

        <!-- change banner height -->
        <v-text-field
          v-model.trim="bannerHeight"
          :error-messages="bannerHeightErrors"
          dense
          label="height"
          outlined
          type="number"
          @keydown.enter="changeBannerSize"
        ></v-text-field>
      </v-col>

      <!-- change banner size button -->
      <v-col class="pt-0">
        <v-btn class="white--text" color="green" @click="changeBannerSize"
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
import { validationBannerEditSize } from '../../js/validators/validationsRules';

export default {
  name: 'BannerEditSize',
  mixins: [validationMixin],

  // VUETIFY. Validations rules
  validations: validationBannerEditSize.validations,

  data() {
    return {
      bannerWidth: 450,
      bannerHeight: 600,
    };
  },
  computed: {
    ...mapState('size', ['bannerSize']),

    // VUETIFY. Validation errors
    ...validationBannerEditSize.errorMessages,
  },
  methods: {
    ...mapActions('size', ['submitBannerSizeToStore']),

    // validate and submit banner size to store
    changeBannerSize() {
      this.$v.bannerWidth.$touch();
      this.$v.bannerHeight.$touch();
      if (this.$v.$invalid) return;
      this.submitBannerSizeToStore(
        new BannerSize({ width: this.bannerWidth, height: this.bannerHeight })
      );
    },
  },
};
</script>
