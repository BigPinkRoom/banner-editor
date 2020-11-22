<template>
  <v-container>
    <v-row>
      <v-col>
        <v-img :src="imageSrc"></v-img>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <input type="file" @change="onFileChange" />
      </v-col>
    </v-row>
    <v-row>
      <v-col></v-col>
    </v-row> </v-container
></template>
<script>
export default {
  data() {
    return {
      image: null,
      imageSrc: '',
    };
  },
  methods: {
    onFileChange(event) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.imageSrc = reader.result;
      };
      reader.readAsDataURL(file);
      this.image = file;
    },
  },
};
</script>
