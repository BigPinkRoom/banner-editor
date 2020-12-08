export default {
  namespaced: true,
  state: {
    error: null,
    loadingImageUrl: 0,
    loadingImageResult: 0,
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
      console.error(payload);
    },

    increaseLoading({ commit }, payload) {
      commit('INCREASE_LOADING', payload);
    },
  },
  getters: {
    // convert number to boolean status loading image to url
    booleanloadingUrlImage(state) {
      return Boolean(state.loadingImageUrl);
    },
    booleanLoadingResultImage(state) {
      return Boolean(state.loadingImageResult);
    },
  },
};
