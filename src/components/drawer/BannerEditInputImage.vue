<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <p class="text-uppercase green--text mb-0">Image settings</p>
          <v-divider color="green"></v-divider>
        </v-col>
      </v-row>

      <!-- load file from user divice to 'Banner Editor' -->
      <v-row class="mb-2">
        <v-col>
          <p class="mb-1">
            Upload image from your <span class="font-weight-bold">device:</span>
          </p>
          <v-btn
            block
            class="mb-2 white--text"
            color="green"
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

      <v-divider></v-divider>

      <!-- load file to URL link to 'Banner Editor' -->
      <v-row class="my-2">
        <v-col>
          <p class="mb-1">
            Upload image from <span class="font-weight-bold">URL</span>:
          </p>
          <input
            v-model="imageURL"
            :error-messages="imageURLErrors"
            accept="image/*"
            class="banner-edit-iput-image-input__url"
            name="file"
            placeholder="Enter your link"
            type="url"
            @blur="$v.imageURL.$touch()"
          />
          <v-row>
            <v-col class="">
              <v-btn
                :disabled="$v.$invalid || booleanloadingUrlImage"
                :loading="booleanloadingUrlImage"
                class="white--text"
                color="green"
                @click="loadImageURL"
                @keydown.enter="loadImageURL"
                >Upload image
                <v-icon dark right>mdi-link-variant</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-divider></v-divider>

      <!-- changing image size and position -->
      <v-row class="d-flex flex-column mt-3">
        <!-- change image width by banner width -->
        <v-col>
          <p class="mb-0">Image WIDTH by banner width:</p>
          <v-btn
            :disabled="!isImageOnStore"
            class="white--text"
            color="blue-grey"
            >By width</v-btn
          >
        </v-col>

        <!-- change image height by banner height -->
        <v-col>
          <p class="mb-0">
            Image HEIGHT by banner height (Perfect for background):
          </p>
          <v-btn
            :disabled="!isImageOnStore"
            class="white--text"
            color="blue-grey"
            >By height</v-btn
          >
        </v-col>

        <!-- reset position image -->
        <v-col>
          <p class="mb-0">Reset position (only position):</p>
          <v-btn
            :disabled="!isImageOnStore"
            class="white--text"
            color="blue-grey"
            >Reset position</v-btn
          >
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import { validationMixin } from 'vuelidate';
import { convertURLToFile } from '../../js/helpers/convertURLToFile';
import { validationBannerEditInputImage } from '../../js/validators/validationsRules';

export default {
  name: 'BannerEditInputImage',
  mixins: [validationMixin],

  // VUETIFY. Validations rules
  validations: validationBannerEditInputImage.validations,

  data() {
    return {
      name: 'BannerEditInputImage',
      convertURLToFile,
      imageURL: '',
    };
  },
  computed: {
    ...mapGetters('shared', ['booleanloadingUrlImage']),
    ...mapGetters('image', ['isImageOnStore']),

    // VUETIFY. Validation errors
    ...validationBannerEditInputImage.errorMessages,
  },
  methods: {
    ...mapActions('image', ['submitImageToStore']),
    ...mapMutations('shared', ['increaseLoading', 'decreaseLoading']),

    // load file from user device to 'Banner Edit"
    async loadImageFile(event) {
      const imageFile = event.target.files[0];
      await this.submitImageToStore(imageFile);
    },

    // load file from URL link to 'Banner Edit"
    async loadImageURL() {
      const fileURL = await this.convertURLToFile(this.imageURL);
      this.submitImageToStore(fileURL);
      this.imageURL = '';
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
