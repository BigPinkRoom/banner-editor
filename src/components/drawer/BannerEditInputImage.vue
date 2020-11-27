<template>
  <div>
    <v-row>
      <v-col>
        <input type="file" @change="onFileChange" />
      </v-col>
    </v-row>
    <v-row>
      <v-col></v-col>
    </v-row>
  </div>
</template>
<script>
import { mapActions, mapMutations } from 'vuex';

export default {
  data() {
    return {};
  },
  methods: {
    ...mapActions('shared', ['CLEAR_ERROR', 'SET_ERROR']),
    ...mapMutations('banner', ['CHANGE_INPUT_IMAGE']),

    // event of file changed (upload image)
    async onFileChange(event) {
      const file = event.target.files[0];

      await this.CLEAR_ERROR();

      if (file.size > 1024 * 1024) {
        await this.SET_ERROR(
          `Max upload image is 1 Mb. Your image is ${file.size / 1000} Kb`
        );
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        this.CHANGE_INPUT_IMAGE(reader.result);
      };
      reader.readAsDataURL(file);
    },
  },
};
</script>
