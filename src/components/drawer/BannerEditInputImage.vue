<template>
  <div>
    <v-container>
      <!-- load file to Banner Editor -->
      <v-row class="mb-10">
        <v-col>
          <p>Upload image from your device:</p>
          <v-btn
            block
            class="my-2 white--text mt-3"
            color="blue-grey"
            @click="triggerUpload"
          >
            Upload image
            <v-icon dark right>
              mdi-cloud-upload
            </v-icon>
          </v-btn>
          <input
            ref="fileInput"
            accept="image/*"
            name="file"
            style="display: none;"
            type="file"
            @change="loadImageFile"
          />
        </v-col>
      </v-row>

      <!-- load file to URL to Banner Editor -->
      <v-row>
        <v-col>
          <p>Upload image from URL:</p>
          <input
            v-model="imageURL"
            :error-messages="imageURLErrors"
            accept="image/*"
            class="banner-edit-iput-image-input__url"
            name="file"
            placeholder="Enter your link"
            type="url"
            :loading="loadingURLImage"
          />
          <v-row>
            <v-col class="">
              <v-btn
                :disabled="$v.$invalid || !imageURL || loadingURLImage"
                @click="loadImageURL"
                class="white--text"
                color="blue-grey"
                :loading="loadingURLImage"
                >Upload image
                <v-icon dark right>mdi-link-variant</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row>
        <v-col></v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
import { convertURLToFile } from '../../js/helpers/convertURLToFile';
import { validationMixin } from 'vuelidate';
import { validationBannerEditInputImage } from '../../js/validators/validationsRules';

export default {
  name: 'BannerEditInputImage',
  mixins: [validationMixin],

  // VUETIFY. Validations rules
  validations: validationBannerEditInputImage.validations,

  data() {
    return {
      loadingURLImage: false,
      convertURLToFile,
      imageURL: '',
    };
  },
  computed: {
    // VUETIFY. Validation errors
    ...validationBannerEditInputImage.errorMessages,
  },
  methods: {
    ...mapActions('image', ['submitImageToStore']),

    async loadImageFile(event) {
      const imageFile = event.target.files[0];
      await this.submitImageToStore(imageFile);
    },

    async loadImageURL() {
      this.loadingURLImage = true;
      const fileURL = await this.convertURLToFile(this.imageURL);
      this.submitImageToStore(fileURL);
      this.loadingURLImage = false;
    },

    // trigger of upload image
    triggerUpload() {
      this.$refs.fileInput.click();
    },
  },
};
</script>
<style lang="scss" scoped>
.banner-edit-iput-image-input__url {
  width: 100%;
  height: 36px;

  padding: 0 0 0 10px;

  border: 1px solid green;
  border-radius: 4px;
  &:focus {
    outline-color: green;
  }
}
</style>
scss
