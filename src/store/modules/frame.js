export default {
  namespaced: true,
  state: {
    bannerFrame: {
      frameSize: 0,
      frameRadius: 0,
      frameColorRGBA: {
        r: 0,
        g: 0,
        b: 0,
        a: 1,
      },
    },
  },
  mutations: {
    SET_BANNER_FRAME(state, payload) {
      state.bannerFrame = payload;
    },
  },
  actions: {
    submitBannerFrameToStore({ commit }, payload) {
      commit('SET_BANNER_FRAME', payload);
    },
  },
  getters: {
    getFrameColorRGBAString(state) {
      return `rgba(${state.bannerFrame.frameColorRGBA.r}, ${state.bannerFrame.frameColorRGBA.g}, ${state.bannerFrame.frameColorRGBA.b}, ${state.bannerFrame.frameColorRGBA.a})`;
    },
  },
};
