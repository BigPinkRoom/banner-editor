<template>
  <!-- module of text -->
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
    zoomModifier: Number,
  },
  computed: {
    ...mapGetters('text', ['getTextRGBAString']),
  },
  methods: {
    ...mapActions('text', ['submitElementPositionToStore']),

    /**
     * initial drag-and-drop functional
     * @prop {Object} event - mouse event
     */
    dragText(event) {
      dragAndDrop(event, event.target, this.zoomModifier);
    },

    /**
     * convert RGBA text color to string
     * @prop {Number} index - current index of text array
     * @return {String} RGBA color string
     */
    textRGBAString(index) {
      return this.getTextRGBAString(index);
    },

    /**
     * submit current text module position to the store
     * @prop {Object} event - mouse event
     */
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
