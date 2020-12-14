<template>
  <!-- module of text -->
  <p
    :style="textModuleStyle"
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

    textModuleStyle() {
      return {
        position: 'absolute',
        zIndex: 1,
        top: this.textElement.position.y,
        left: this.textElement.position.x,
        color: this.textRGBAString(this.index),
        fontSize: `${this.textElement.settings.size}px`,
        fontFamily: this.textElement.settings.fontFamily,
        fontWeight: this.textElement.settings.weight,
        lineHeight: '1',
        whiteSpace: 'nowrap',
        cursor: 'pointer',
      };
    },
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
