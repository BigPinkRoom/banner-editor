export default {
  namespaced: true,
  state: {
    bannerSize: {
      height: 800,
      width: 600,
    },
  },
  mutations: {
    CHANGE_BANNER_SIZE(state, payload) {
      state.bannerSize = payload;
    },
  },
  actions: {
    submitBannerSizeToStore({ commit }, payload) {
      commit('CHANGE_BANNER_SIZE', payload);
    },
  },
};
