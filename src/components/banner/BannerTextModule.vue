<template>
  <p
    :style="{
      position: 'absolute',
      zIndex: 1,
      top: textElement.position.y,
      left: textElement.position.x,
      color: textRGBAString(index),
      fontSize: `${textElement.settings.size}px`,
      fontFamily: textElement.settings.fontFamily,
      fontWeight: textElement.settings.weight,
      lineHeight: '1',
      whiteSpace: 'nowrap',
      cursor: 'pointer',
    }"
    @mousedown.prevent="dragText"
    @mouseup="submitPosition"
  >
    {{ textElement.settings.text }}
  </p>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { dragAndDrop } from '../../js/utils/dragAndDrop';

export default {
  name: 'BannerTextModule',
  props: {
    textElement: Object,
    index: Number,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters('text', ['getTextRGBAString']),
  },
  methods: {
    ...mapActions('text', ['submitElementPositionToStore']),

    dragText(event) {
      dragAndDrop(event, event.target);
    },

    textRGBAString(index) {
      const textRGBAFunction = this.getTextRGBAString;
      return textRGBAFunction(index);
    },

    submitPosition(event) {
      this.submitElementPositionToStore({
        numberArray: this.index,
        x: parseInt(event.target.style.left),
        y: parseInt(event.target.style.top),
      });
    },
  },
};
</script>
