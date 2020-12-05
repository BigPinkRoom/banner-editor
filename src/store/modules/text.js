export default {
  namespaced: true,
  state: {
    textSettingsArray: [],
  },
  mutations: {
    SET_TEXT_SETTINGS_ARRAY(state, payload) {
      state.textSettingsArray = payload;
      console.log(state);
    },
    SET_TEXT_SETTINGS_ELEMENT_POSITION(state, payload) {
      state.textSettingsArray[payload.numberArray] = payload.position;
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
