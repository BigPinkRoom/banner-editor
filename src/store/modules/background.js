export default {
  namespaced: true,
  state: {
    backgroundType: 'solid',
    backgroundSolidSettings: {
      color: '#ffffff',
    },
    backgroundGradientSettings: {
      gradientArray: [],
    },
  },
  mutations: {
    SET_BACKGROUND_TYPE(state, payload) {
      state.backgroundType = payload;
    },

    SET_BACKGROUND_SOLID_COLOR(state, payload) {
      state.backgroundSolidSettings = payload;
    },

    SET_BACKGROUND_GRADIENT_COLOR(state, payload) {
      state.backgroundGradientSettings = payload;
    },
  },
  actions: {
    submitBackgroundTypeToStore({ commit }, payload) {
      commit('SET_BACKGROUND_TYPE', payload);
    },
    submitBackgroundSolidSettingsToStore({ commit }, payload) {
      commit('SET_BACKGROUND_SOLID_COLOR', payload);
    },
    submitBackgroundGradientSettingsToStore({ commit }, payload) {
      commit('SET_BACKGROUND_GRADIENT_COLOR', payload);
    },
  },
  getters: {},
};
