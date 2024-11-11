import axios from 'axios';

const api = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
});
console.log(api.baseURL)
api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});




export const authService = {
  login(credentials) {
    return api.post('/sign_in/', credentials);
  },
  register(data) {
    return api.post('/sign_up/', data);
  },
  refreshToken() {
    return api.post('/refresh-token/');
  },
};


export const employeeService = {
  getAllEmployees(params = {}) {
    return api.get('/employee/', { params });
  },
  getEmployeeById(id) {
    return api.get(`/employee/${id}/`);
  },
  updateEmployee(id, data) {
    return api.put(`/employee/update/${id}/`, data);
  },
  dropEmployee(id){
    return api.delete(`/employee/drop/${id}/`);
  },
  getAllEmployeesPosition() {
    return api.get('/employee_position/');
  }
};


export const userService = {
  getUser() {
    return api.get('/user/');
  },
  updateUser(data) {
    return api.put('/user/update/', data);
  },
};