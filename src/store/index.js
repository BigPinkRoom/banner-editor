import Vue from 'vue';
import Vuex from 'vuex';
import background from './modules/background';
import frame from './modules/frame';
import image from './modules/image';
import shared from './modules/shared';
import size from './modules/size';
import text from './modules/text';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    background,
    frame,
    image,
    shared,
    size,
    text,
  },
});
