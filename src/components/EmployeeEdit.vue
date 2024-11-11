<template>
  <div class="container">
    <h2>Просмотр/Редактирование сотрудника</h2>
    <form @submit.prevent="updateEmployee">
      <div class="form-group">
        <label for="full_name">ФИО:</label>
        <input type="text" v-model="employee.full_name" class="form-control" required />
      </div>
      <div class="form-group">
        <label for="email">Почта:</label>
        <input type="email" v-model="employee.email" class="form-control" required />
      </div>
      <div class="form-group">
        <label for="employee_position">Должность:</label>
        <select v-model="employee.employee_position" class="form-control" required>
          <option value="">Выберите должность</option>
          <option v-for="position in positions" :key="position.id" :value="position.id">{{ position.name }}</option>
        </select>
      </div>
      <div class="form-group">
        <label for="dismissed">Уволен: </label> 
        <input type="checkbox" v-model="employee.dismissed" />
      </div>
      <div class="form-group" v-if="employee.dismissed">
        <label for="dismissed_date">Дата увольнения:</label>
        <input type="date" v-model="employee.dismissed_date" class="form-control" />
      </div>
      <button type="submit" class="btn btn-primary">Обновить</button>
    </form>
  </div>
</template>

<script>
import { employeeService } from '../services/apiService';

export default {
  data() {
    return {
      employee: {
        full_name: '',
        email: '',
        employee_position: null,
        dismissed: false,
        dismissed_date: null,
      },
      positions: [],
    };
  },
  created() {
    this.getEmployee();
    this.fetchEmployeePositions(); 
  },
  methods: {
    async getEmployee() {
      try {
        const response = await employeeService.getEmployeeById(this.$route.params.id);
        
        this.employee = response.data;
        if (this.employee.employee_position) {
          this.employee.employee_position = this.employee.employee_position.id;
        }
      } catch (err) {
        console.error(err);
      }
    },
    async fetchEmployeePositions() {
      try {
        const response = await employeeService.getAllEmployeesPosition();
        this.positions = response.data.results; 
      } catch (err) {
        console.error('Error fetching employee positions:', err);
      }
    },
    async updateEmployee() {
      const updatedData = {};

      if (this.employee.full_name) {
        updatedData.full_name = this.employee.full_name;
      }
      if (this.employee.email) {
        updatedData.email = this.employee.email;
      }
      if (this.employee.employee_position) {
        updatedData.employee_position = this.employee.employee_position;
      }
      updatedData.dismissed = this.employee.dismissed;
      if (this.employee.dismissed && this.employee.dismissed_date) {
        updatedData.dismissed_date = this.employee.dismissed_date;
      }

      if (Object.keys(updatedData).length === 0) {
        alert("Нет изменений для обновления.");
        return;
      }

      try {
        await employeeService.updateEmployee(this.$route.params.id, updatedData);
        this.$router.push('/employees');
      } catch (err) {
        if (err.response && err.response.status === 403) {
          alert("У вас нет доступа к редактированию сотрудников!");
        } else {
          alert("Произошла ошибка при редактировании сотрудника. Пожалуйста, попробуйте еще раз.");
          console.error('Error updating employee:', err);
        }
      }
    },
  },
};
</script>
