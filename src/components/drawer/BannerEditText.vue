<template>
  <v-container>
    <v-row>
      <v-col>
        <p class="text-uppercase green--text mb-0">Banner text settings</p>
        <v-divider color="green"></v-divider>
      </v-col>
    </v-row>
    <v-row class="banner-edit-text__module d-flex flex-column ma-0">
      <v-col class="pb-0">
        <v-textarea
          dense
          outlined
          color="green"
          rows="1"
          label="Your text"
        ></v-textarea>
      </v-col>
      <v-row class="banner-edit-text__settings ma-0">
        <v-col class="col-6 py-0 pr-1">
          <v-select outlined dense label="Font family"></v-select>
        </v-col>
        <v-col></v-col>
      </v-row>
      <v-row class="banner-edit-text__settings ma-0">
        <v-col class="col-6 py-0 pr-1">
          <v-text-field outlined dense label="Size" value="14"></v-text-field>
        </v-col>
        <v-col class="col-6 py-0 pl-1">
          <v-text-field
            outlined
            dense
            label="Weight"
            value="bold"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      name: 'BannerEditText',
    };
  },
};
</script>
<style lang="scss" scoped>
.banner-edit-text__module {
  border: 1px solid #ddd;
  border-radius: 7px;
}

.v-label {
  font-size: 14px;
}
</style>
