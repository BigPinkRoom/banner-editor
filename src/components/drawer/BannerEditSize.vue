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
      <v-col>
        <v-btn>Change size</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      bannerWidth: 800,
      bannerHeight: 600,
    };
  },
};
</script>
