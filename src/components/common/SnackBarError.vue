<template>
  <!-- snackbar for errors -->
  <v-snackbar
    v-if="error"
    color="error"
    :timeout="20000"
    @click.native="closeError"
    :value="true"
  >
    {{ error }}
    <template v-slot:action>
      <v-btn class="white--text" text @click.native="closeError">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState('shared', ['error']),
  },
};
</script>

<style></style>
