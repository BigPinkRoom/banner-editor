export default {
  namespaced: true,
  state: {
    backgroundType: 'solid',
    backgroundSolidSettings: { r: 255, g: 255, b: 255, a: 1 },
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
    // convert RGBA color object to string
    getBackgroundSolidRGBAString(state) {
      return `rgba(${state.backgroundSolidSettings.r}, ${state.backgroundSolidSettings.g}, ${state.backgroundSolidSettings.b}, ${state.backgroundSolidSettings.a})`;
    },
    getCurrentBackgroundRGBAString(state) {
      if (state.backgroundType === 'solid') {
        return `rgba(${state.backgroundSolidSettings.r}, ${state.backgroundSolidSettings.g}, ${state.backgroundSolidSettings.b}, ${state.backgroundSolidSettings.a})`;
      } else {
        return `${state.backgroundGradientSettings.style})`;
      }
    },
  },
};
