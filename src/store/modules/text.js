export default {
  namespaced: true,
  state: {
    textSettingsArray: [],
  },
  mutations: {
    SET_TEXT_SETTINGS_ARRAY(state, payload) {
      state.textSettingsArray = payload;
    },
  },
  actions: {
    submitTextSettingsToStore({ commit }, payload) {
      commit('SET_TEXT_OBJECT', payload);
    },
  },
  getters: {
    getTextRGBAString(state) {
      return function(textSettingsObjectId) {
        return `rgba(${state.textSettingsArray[textSettingsObjectId].r}, ${state.textSettingsArray[textSettingsObjectId].g}, ${state.textSettingsArray[textSettingsObjectId].b}, ${state.textSettingsArray[textSettingsObjectId].a})`;
      };
    },
  },
};
