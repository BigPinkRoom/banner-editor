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
    // convert text color of text module (on id) to string
    getTextRGBAString(state) {
      return function(textSettingsObjectId) {
        return `rgba(${state.textSettingsArray[textSettingsObjectId].color.selectedColorRGBA.r}, ${state.textSettingsArray[textSettingsObjectId].color.selectedColorRGBA.g}, ${state.textSettingsArray[textSettingsObjectId].color.selectedColorRGBA.b}, ${state.textSettingsArray[textSettingsObjectId].color.selectedColorRGBA.a})`;
      };
    },
    getAllTextModulesToHTML(state, getters) {
      let textTagsArray = [];
      const textRGBAFunction = getters.getTextRGBAString;

      state.textSettingsArray.forEach((textElement, index) => {
        let textHTML = `<p style="position: absolute; z-index: 1; top: ${
          textElement.position.y
        }px; left: ${
          textElement.position.x
        }px; margin: 0; color: ${textRGBAFunction(index)}; font-size: ${
          textElement.settings.size
        }px; font-family: ${textElement.settings.fontFamily}; font-weight: ${
          textElement.settings.weight
        }; line-height: 1; white-space: nowrap; cursor: pointer; ">
        ${textElement.settings.text}
        </p>`;

        textTagsArray.push(textHTML);
      });

      return textTagsArray.join('\n');
    },
  },
};
