export default {
  namespaced: true,
  state: {
    textSettingsArray: [],
  },
  mutations: {
    SET_TEXT_SETTINGS_ARRAY(state, payload) {
      state.textSettingsArray = payload;
    },
    SET_TEXT_SETTINGS_ELEMENT_POSITION(state, payload) {
      state.textSettingsArray[payload.numberArray].position.x = payload.x;
      state.textSettingsArray[payload.numberArray].position.y = payload.y;
    },
  },
  actions: {
    submitTextSettingsToStore({ commit }, payload) {
      commit('SET_TEXT_SETTINGS_ARRAY', payload);
    },
    submitElementPositionToStore({ commit }, payload) {
      commit('SET_TEXT_SETTINGS_ELEMENT_POSITION', payload);
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
