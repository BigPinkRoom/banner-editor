export default {
  namespaced: true,
  state: {
    error: null,
    loading: 0,
  },
  mutations: {
    CLEAR_ERROR(state) {
      state.error = null;
    },

    DECREASE_LOADING(state) {
      state.loading--;
    },

    SET_ERROR(state, payload) {
      state.error = payload;
    },

    INCREASE_LOADING(state) {
      state.loading++;
    },
  },
  actions: {
    CLEAR_ERROR({ commit }) {
      commit('CLEAR_ERROR');
    },

    DECREASE_LOADING({ commit }) {
      commit('DECREASE_LOADING');
    },

    SET_ERROR({ commit }, payload) {
      commit('SET_ERROR', payload);
    },

    INCREASE_LOADING({ commit }) {
      commit('INCREASE_LOADING');
    },
  },
};
