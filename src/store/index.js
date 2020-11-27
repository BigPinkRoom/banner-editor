import Vue from 'vue';
import Vuex from 'vuex';
import shared from './modules/shared';
import banner from './modules/banner';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    shared,
    banner,
  },
});
