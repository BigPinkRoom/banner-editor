export default {
  namespaced: true,
  state: {
    sizeBoxBanner: {
      height: 0,
      width: 0,
    },
    inputImage: {
      file: '',
      width: 0,
    },
  },
  mutations: {
    CHANGE_INPUT_IMAGE(state, payload) {
      state.inputImage = payload;
    },
    CHANGE_SIZEBOXBANNER(state, { width, height }) {
      state.sizeBox.height = height;
      state.sizeBox.width = width;
    },
  },
  actions: {},
  getters: {},
};
