<template>
    <div class="container">
      <h2>Ваши данные:</h2>
      <form @submit.prevent="updateUser">
        <div class="form-group">
          <label for="full_name">ФИО:</label>
          <input type="text" v-model="user.full_name" class="form-control"/>
        </div>
        <div class="form-group">
          <label for="email">Почта:</label>
          <input type="text" v-model="user.email" class="form-control"/>
        </div>
      <div class="form-group">
        <label for="employee_position">Должность:</label>
        <input type="text" :value="user.employee_position ? user.employee_position.name : 'Не указана'" class="form-control" readonly />
      </div>
        <button type="submit" class="btn btn-primary">Обновить профиль</button>
      </form>
    </div>
  </template>
  
  <script>
  import { userService } from '../services/apiService';
  //import store from "../store";
  
  export default {
    data() {
      return {
        user: {
          full_name: '',
        },
      };
    },
    created() {
      this.getUser();
    },
    methods: {
      async getUser() {
        try {
          const response = await userService.getUser();
          this.user = response.data;
        } catch (err) {
          console.error(err);
        }
      },
      async updateUser() {
        try {
          await userService.updateUser(this.user);
          alert('Профиль обновлен.');
        } catch (err) {
          console.error(err);
        }
      },
    },
  };
  </script>