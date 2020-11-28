export default {
  namespaced: true,
  state: {
    sizeBoxBanner: {
      height: 0,
      width: 0,
    },
  },
  mutations: {
    CHANGE_SIZEBOXBANNER(state, { width, height }) {
      state.sizeBox.height = height;
      state.sizeBox.width = width;
    },
  },
  actions: {},
  getters: {},
};
