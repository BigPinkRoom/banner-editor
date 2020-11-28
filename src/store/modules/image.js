export default {
  namespaced: true,
  state: {
    inputImage: {
      file: '',
      width: 0,
      height: 0,
    },
  },
  mutations: {
    CHANGE_INPUT_IMAGE(state, payload) {
      state.inputImage = payload;
    },
  },
  actions: {},
  getters: {},
};
