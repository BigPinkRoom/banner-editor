export default {
  namespaced: true,
  state: {
    bannerSize: {
      height: 600,
      width: 450,
    },
  },
  mutations: {
    SET_BANNER_SIZE(state, payload) {
      state.bannerSize = payload;
    },
  },
  actions: {
    submitBannerSizeToStore({ commit }, payload) {
      commit('SET_BANNER_SIZE', payload);
    },
  },
};
