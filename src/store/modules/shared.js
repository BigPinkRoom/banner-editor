export default {
  namespaced: true,
  state: {
    error: null,
    loadingImageUrl: 0,
    loadingImageResult: 0,
    loadingSettingsToJSON: 0,
    loadingBannerToHTML: 0,
  },
  mutations: {
    CLEAR_ERROR(state) {
      state.error = null;
    },

    DECREASE_LOADING(state, payload) {
      state[payload]--;
    },

    SET_ERROR(state, payload) {
      state.error = payload;
    },

    INCREASE_LOADING(state, payload) {
      state[payload]++;
    },
  },
  actions: {
    clearError({ commit }) {
      commit('CLEAR_ERROR');
    },

    decreaseLoading({ commit }, payload) {
      commit('DECREASE_LOADING', payload);
    },

    setError({ commit }, payload) {
      commit('SET_ERROR', payload);
    },

    increaseLoading({ commit }, payload) {
      commit('INCREASE_LOADING', payload);
    },
  },
  getters: {
    booleanloadingImageURL(state) {
      return Boolean(state.loadingImageUrl);
    },
    booleanLoadingImageResult(state) {
      return Boolean(state.loadingImageResult);
    },
    booleanLoadingSettingsToJSON(state) {
      return Boolean(state.loadingSettingsToJSON);
    },
    booleanLoadingBannerToHTML(state) {
      return Boolean(state.loadingBannerToHTML);
    },
  },
};
