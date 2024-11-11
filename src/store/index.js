import { createStore } from 'vuex';

export default createStore({
  state: {
    auth: {
      accessToken: localStorage.getItem('accessToken') || null,
      refreshToken: localStorage.getItem('refreshToken') || null,
    },
  },
  mutations: {
    setTokens(state, tokens) {
      state.auth.accessToken = tokens.access;
      state.auth.refreshToken = tokens.refresh;

      localStorage.setItem('accessToken', tokens.access);
      localStorage.setItem('refreshToken', tokens.refresh);
    },
    clearTokens(state) {
      state.auth.accessToken = null;
      state.auth.refreshToken = null;

      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    },
  },
});