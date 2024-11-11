<template>
    <div class="container">
      <h2>Регистация</h2>
      <form @submit.prevent="register">
        <div class="form-group">
          <label for="full_name">ФИО:</label>
          <input type="text" v-model="full_name" class="form-control" required />
        </div>
        <div class="form-group">
          <label for="email">Почта:</label>
          <input type="email" v-model="email" class="form-control" required />
        </div>
        <div class="form-group">
          <label for="password1">Введите пароль:</label>
          <input type="password" v-model="password1" class="form-control" required />
        </div>
        <div class="form-group">
          <label for="password2">Повторите пароль:</label>
          <input type="password" v-model="password2" class="form-control" required />
        </div>
        <button type="submit" class="btn btn-primary">Зарегистрироваться</button>
        <div class="text-danger" v-if="error">{{ error }}</div>
      </form>
    </div>
  </template>
  
  <script>
  import { authService } from '../services/apiService';
  
  export default {
    data() {
      return {
        full_name: '',
        email: '',
        password1: '',
        password2: '',
        error: null,
      };
    },
    methods: {
      async register() {
        try {
          await authService.register({ full_name: this.full_name, email: this.email, password1: this.password1, password2: this.password2 });
          this.$router.push('/login');
        } catch (err) {
          this.error = 'Ошибка регистрации';
        }
      },
    },
  };
  </script>