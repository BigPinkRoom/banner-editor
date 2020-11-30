export default {
  namespaced: true,
  state: {
    boxBanner: {
      height: 0,
      width: 0,
    },
  },
  mutations: {
    CHANGE_SIZE_BOX_BANNER(state, { width, height }) {
      state.sizeBox.height = height;
      state.sizeBox.width = width;
    },
  },
  actions: {},
  getters: {},
};
