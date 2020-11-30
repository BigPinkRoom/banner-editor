export default {
  namespaced: true,
  state: {
    error: null,
    loadingURLImage: 0,
  },
  mutations: {
    CLEAR_ERROR(state) {
      state.error = null;
    },

    DECREASE_LOADING(state) {
      state.loadingURLImage--;
    },

    SET_ERROR(state, payload) {
      state.error = payload;
    },

    INCREASE_LOADING(state) {
      state.loadingURLImage++;
    },
  },
  actions: {
    clearError({ commit }) {
      commit('CLEAR_ERROR');
    },

    decreaseLoading({ commit }) {
      commit('DECREASE_LOADING');
    },

    setError({ commit }, payload) {
      commit('SET_ERROR', payload);
      console.error(payload);
    },

    increaseLoading({ commit }) {
      commit('INCREASE_LOADING');
    },
  },
  getters: {
    booleanloadingUrlImage(state) {
      return Boolean(state.loadingURLImage);
    },
  },
};
