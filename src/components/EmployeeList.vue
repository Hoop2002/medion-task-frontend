<template>
  <div class="container">
    <h2>Список сотрудников</h2>
    <div class="search-filters">
      <div class="filters">
        <input type="checkbox" v-model="dismissed" /> Уволенные
        <input type="date" v-model="dismissed_date_after" placeholder="Дата увольнения после" class="form-control" />
        <input type="date" v-model="dismissed_date_before" placeholder="Дата увольнения до" class="form-control" />
        <select v-model="employee_position" class="form-control">
          <option value="">Выберите должность</option>
          <option v-for="position in positions" :key="position.id" :value="position.id">{{ position.name }}</option>
        </select>
      </div>
    </div>
    <div class="search-container">
      <input type="text" v-model="search" placeholder="Поиск..." class="form-control" />
      <button @click="fetchEmployees" class="btn btn-primary" style="margin-left: 10px;">Поиск</button>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>ФИО</th>
          <th>Почта</th>
          <th>Должность</th>
          <th>Действия</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="employee in filteredEmployees" :key="employee.id">
          <td>{{ employee.id }}</td>
          <td>{{ employee.full_name ? employee.full_name : '-' }}</td>
          <td>{{ employee.email }}</td>
          <td>{{ employee.employee_position ? employee.employee_position.name : '-' }}</td>
          <td>
            <router-link :to="{ name: 'EmployeeEdit', params: { id: employee.id } }" class="btn btn-warning">Edit</router-link>
            <button @click="deleteEmployee(employee.id)" class="btn btn-danger" style="margin-left: 10px;">Удалить</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { employeeService } from '../services/apiService';

export default {
  data() {
    return {
      employees: [],
      search: '',
      dismissed: null,
      dismissed_date_after: null,
      dismissed_date_before: null,
      employee_position: null,
      limit: 10,
      offset: 0,
      positions: [],
    };
  },
  computed: {
    filteredEmployees() {
      return this.employees.filter(emp => 
        emp.full_name.includes(this.search)
      );
    },
  },
  created() {
    this.fetchEmployees(); 
    this.fetchEmployeePositions();
  },
  // watch: {
  //   search(newValue) {
  //     this.fetchEmployees();
  //   },
  // }
  methods: {
    async fetchEmployees() {
      const params = {
        dismissed: this.dismissed,
        dismissed_date_after: this.dismissed_date_after,
        dismissed_date_before: this.dismissed_date_before,
        employee_position: this.employee_position,
        search: this.search,
        limit: this.limit,
        offset: this.offset,
      };

      try {
        const response = await employeeService.getAllEmployees(params);
        if (Array.isArray(response.data.results)) {
          this.employees = response.data.results;
        } else {
          console.error('Expected an array but got:', response.data);
          this.employees = [];
        }
      } catch (err) {
        console.error('Error fetching employees:', err);
      }
    },
    async deleteEmployee(employeeId) {
      try {
        await employeeService.dropEmployee(employeeId);
        this.fetchEmployees();
      } catch (err) {
        if (err.response && err.response.status === 403) {
          alert("У вас нет доступа к удалению сотрудников!");
        } else {
          console.error('Error deleting employee:', err);
        }
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
  },
};
</script>


<style>
.search-filters {
  display: flex;
  align-items: center;
  margin-bottom: 20px; 
}

.filters {
  display: flex;
  align-items: center;
  margin-right: 10px; 
}

.filters input,
.filters select {
  margin-left: 10px;
}

.search-filters {
  margin-bottom: 20px; 
}

.search-container {
  display: flex;
  align-items: center;
  margin-bottom: 20px; 
}

.search-container input {
  flex: 1;
}
</style>