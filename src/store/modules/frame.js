export default {
  namespaced: true,
  state: {
    bannerFrame: {
      frameSize: 1,
      frameRadius: 7,
      frameColorRGBA: {
        r: 210,
        g: 210,
        b: 210,
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
    // convert RGBA color object to string
    getFrameColorRGBAString(state) {
      return `rgba(${state.bannerFrame.frameColorRGBA.r}, ${state.bannerFrame.frameColorRGBA.g}, ${state.bannerFrame.frameColorRGBA.b}, ${state.bannerFrame.frameColorRGBA.a})`;
    },
  },
};
