<template>
    <div class="container">
      <h2>Авторизация</h2>
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="email">Почта:</label>
          <input type="email" v-model="email" class="form-control" required />
        </div>
        <div class="form-group">
          <label for="password">Пароль:</label>
          <input type="password" v-model="password" class="form-control" required />
        </div>
        <button type="submit" class="btn btn-primary">Вход</button>
        <div class="text-danger" v-if="error">{{ error }}</div>
      </form>
    </div>
  </template>
  
  <script>
  import { authService } from '../services/apiService';
  import store from '../store';
  
  export default {
    data() {
      return {
        email: '',
        password: '',
        error: null,
      };
    },
    methods: {
      async login() {
        try {
          const response = await authService.login({ email: this.email, password: this.password });
          store.commit('setTokens', response.data);
          this.$router.push('/profile');
        } catch (err) {
          this.error = 'Некоретный данные';
        }
      },
    },
  };
  </script>