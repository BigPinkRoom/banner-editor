<template>
  <!-- snackbar for errors -->
  <v-snackbar
    v-if="error"
    color="error"
    :timeout="20000"
    @click.native="clearError"
    :value="true"
  >
    {{ error }}
    <template v-slot:action>
      <v-btn class="white--text" text @click.native="clearError">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      name: 'SnackBarError',
    };
  },
  computed: {
    ...mapState('shared', ['error']),
  },
  methods: {
    ...mapActions('shared', {
      clearError: 'clearError',
    }),
  },
};
</script>

<style></style>
