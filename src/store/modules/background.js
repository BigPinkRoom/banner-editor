export default {
  namespaced: true,
  state: {
    backgroundType: 'solid',
    backgroundSolidSettings: {
      color: 'rgba',
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
    submitBackgroundSolidSettingsToStore({ commit, state }, payload) {
      commit('SET_BACKGROUND_SOLID_COLOR', payload);
      console.log(state);
    },
    submitBackgroundGradientSettingsToStore({ commit, state }, payload) {
      commit('SET_BACKGROUND_GRADIENT_COLOR', payload);
      console.log(state);
    },
  },
  getters: {},
};
