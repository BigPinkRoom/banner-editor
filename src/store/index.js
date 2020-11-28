import Vue from 'vue';
import Vuex from 'vuex';
import background from './modules/background';
import banner from './modules/image';
import frame from './modules/frame';
import shared from './modules/shared';
import size from './modules/size';
import text from './modules/text';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    background,
    banner,
    frame,
    shared,
    size,
    text,
  },
});
