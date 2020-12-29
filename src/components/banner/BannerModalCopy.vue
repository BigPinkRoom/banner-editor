<template>
  <!-- modal window -->
  <v-dialog
    v-model="modalCopy"
    width="800"
    @click:outside="emitClearCopyValue()"
    @keydown.esc="emitClearCopyValue()"
  >
    <v-container class="banner-modal-copy__container" ref="modal">
      <v-row>
        <v-col>
          <v-textarea :value="copyValue"></v-textarea>
        </v-col>
      </v-row>
      <v-row>
        <v-col></v-col>
        <v-col class="col-auto">
          <v-btn depressed @click="emitClearCopyValue()">
            Cancel
          </v-btn>
        </v-col>
        <v-col class="col-auto">
          <v-btn
            color="green"
            class="white--text"
            @click="
              copyToClipboard(copyValue);
              emitClearCopyValue();
            "
          >
            Copy
            <v-icon class="ml-1">
              mdi-content-copy
            </v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-dialog>
</template>
<script>
export default {
  props: {
    copyValue: String,
  },
  // data() {
  //   return {
  //     modalCopy: Boolean(this.copyValue),
  //   };
  // },
  computed: {
    modalCopy() {
      return Boolean(this.copyValue);
    },
  },
  methods: {
    /**
     * copy information to clipboard
     * @prop {String} value
     */
    copyToClipboard(value) {
      const container = this.$refs.modal;
      this.$copyText(value, container);
    },

    // closeModal() {
    //   this.modalCopy = false;
    // },

    emitClearCopyValue() {
      this.$emit('clearCopyValue');
    },
  },
};
</script>
<style scoped>
.banner-modal-copy__container {
  background-color: #fff;
}
</style>
