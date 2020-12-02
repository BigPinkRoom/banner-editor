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
      commit('SET_TEXT_SETTINGS_ARRAY', payload);
    },
  },
  getters: {
    getTextRGBAString(state) {
      return function(textSettingsObjectId) {
        return `rgba(${state.textSettingsArray[textSettingsObjectId].color.selectedColorRGBA.r}, ${state.textSettingsArray[textSettingsObjectId].color.selectedColorRGBA.g}, ${state.textSettingsArray[textSettingsObjectId].color.selectedColorRGBA.b}, ${state.textSettingsArray[textSettingsObjectId].color.selectedColorRGBA.a})`;
      };
    },
  },
};
