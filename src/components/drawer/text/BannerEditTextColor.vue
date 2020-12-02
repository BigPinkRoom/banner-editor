<template>
  <div>
    <v-dialog eager width="320" v-model="colorPickerModal">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          block
          :color="colorRGBAToString()"
          class="banner-edit-text-color__button"
          height="39"
          v-on="on"
          @click="colorPickerModal = true"
        >
          color</v-btn
        >
      </template>
      <v-container>
        <v-row class="d-flex flex-column">
          <v-col
            ><p class="text-uppercase white--text mb-0">
              Change text color:
            </p></v-col
          >
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
        <v-row>
          <v-col>
            <v-btn
              block
              class="white--text"
              color="blue-grey"
              @click="submitColorRGBAToParent"
              >Ok</v-btn
            >
          </v-col>
        </v-row>
      </v-container>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: {
    currentEditTextModuleIndex: Number,
  },
  data() {
    return {
      colorPickerModal: false,
      colorRGBA: {
        r: 96,
        g: 125,
        b: 139,
        a: 1,
      },
    };
  },
  computed: {
    ...mapGetters('text', ['getTextRGBAString']),
  },
  methods: {
    colorRGBAToString() {
      let func = this.getTextRGBAString;
      return func(this.currentEditTextModuleIndex);
    },
    submitColorRGBAToParent() {
      this.colorPickerModal = false;
      this.$emit('changeColorRGBA', { selectedColorRGBA: this.colorRGBA });
    },
  },
};
</script>

<style scoped></style>
