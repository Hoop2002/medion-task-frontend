<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <router-link class="navbar-brand" to="/">APP</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item" v-if="!isAuthenticated">
            <router-link class="nav-link" to="/login">Вход</router-link>
          </li>
          <li class="nav-item" v-if="!isAuthenticated">
            <router-link class="nav-link" to="/register">Регистация</router-link>
          </li>
          <li class="nav-item" v-if="isAuthenticated">
            <router-link class="nav-link" to="/profile">Профиль</router-link>
          </li>
          <li class="nav-item" v-if="isAuthenticated">
            <router-link class="nav-link" to="/employees">Список сотрудников</router-link>
          </li>
        </ul>
        <button class="btn btn-outline-danger ml-auto" v-if="isAuthenticated" @click="logout">Выход</button>
      </div>
    </nav>
  </template>
  
  <script>
  import store from '../store';
  
  export default {
    computed: {
      isAuthenticated() {
        return !!store.state.auth.accessToken;
      },
    },
methods: {
  logout() {
    store.commit('clearTokens'); 
    this.$router.push('/login');
  },
},
  };
  </script>
  
  <style scoped>
  .navbar {
    margin-bottom: 20px;
  }
  </style>