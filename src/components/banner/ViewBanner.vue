<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <div class="view-banner_box">
            <canvas id="canvas" width="500" height="500">sdfsd</canvas>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      boxWidth: 800,
      boxHeight: 800,
    };
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
#canvas {
  border: 1px solid gray;
}
</style>
