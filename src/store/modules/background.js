export default {
  namespaced: true,
  state: {
    backgroundType: 'solid',
    backgroundSolidSettings: {},
    backgroundGradientSettings: {},
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
  getters: {
    getBackgroundSolidRGBAString(state) {
      return `rgba(${state.backgroundSolidSettings.r}, ${state.backgroundSolidSettings.g}, ${state.backgroundSolidSettings.b}, ${state.backgroundSolidSettings.a})`;
    },
  },
};
