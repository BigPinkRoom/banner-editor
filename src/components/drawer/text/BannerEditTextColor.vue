<template>
  <div>
    <v-dialog eager width="320" v-model="colorPickerModal">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          block
          class=""
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
              @click="colorPickerModal = false"
              >Ok</v-btn
            >
          </v-col>
        </v-row>
      </v-container>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      colorPickerModal: false,
      colorRGBA: {
        r: 0,
        g: 0,
        b: 0,
        a: 1,
      },
    };
  },
  methods: {
    submitColorRGBAToParent() {
      this.colorPickerModal = false;
      this.$emit('changeColorRGBA', { selectedColorRGBA: this.colorRGBA });
    },
  },
};
</script>

<style></style>
