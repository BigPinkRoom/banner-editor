<template>
  <div>
    <!-- modal window -->
    <v-dialog eager width="320" v-model="colorPickerModal">
      <template v-slot:activator="{ on, attrs }">
        <!-- activate button -->
        <v-btn
          v-bind="attrs"
          :color="colorRGBAToString()"
          block
          class="banner-edit-text-color__button"
          height="39"
          v-on="on"
          @click="colorPickerModal = true"
        >
          color
        </v-btn>
      </template>

      <!-- color picker container -->
      <v-container>
        <!-- color picker -->
        <v-row class="d-flex flex-column">
          <v-col>
            <p class="text-uppercase white--text mb-0">
              Change text color:
            </p>
          </v-col>
          <v-col>
            <v-color-picker
              v-model="colorRGBA"
              dot-size="30"
              hide-inputs
              hide-mode-switch
              mode="rgba"
            ></v-color-picker>
          </v-col>
        </v-row>

        <!-- submit button -->
        <v-row>
          <v-col>
            <v-btn
              block
              class="white--text"
              color="blue-grey"
              @click="submitColorRGBAToParent"
            >
              Ok
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'BannerEditTextColor',
  props: {
    currentEditTextModuleIndex: Number,
  },
  data() {
    return {
      colorPickerModal: false,
      colorRGBA: {
        r: 1,
        g: 195,
        b: 195,
        a: 1,
      },
    };
  },
  computed: {
    ...mapGetters('text', ['getTextRGBAString']),
  },
  methods: {
    /**
     * convert color RGBA object to string
     * @returns {string}
     */
    colorRGBAToString() {
      return this.getTextRGBAString(this.currentEditTextModuleIndex);
    },

    /**
     * submit event (change color) to parent
     */
    submitColorRGBAToParent() {
      this.colorPickerModal = false;
      this.$emit('changeColorRGBA', { selectedColorRGBA: this.colorRGBA });
    },
  },
};
</script>

<style scoped></style>
