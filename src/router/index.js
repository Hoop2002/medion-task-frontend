import { createRouter, createWebHistory } from 'vue-router'; 
import Login from '../components/UserLogin.vue';
import UserRegister from '../components/UserRegister.vue';
import UserProfile from '../components/UserProfile.vue';
import EmployeeList from '../components/EmployeeList.vue';
import EmployeeEdit from '../components/EmployeeEdit.vue';
import store from '../store';

const ifNotAuthenticated = (to, from, next) => {
  if (!store.state.auth.accessToken) {
    next();
    return;
  }
  next('/profile');
};

const ifAuthenticated = (to, from, next) => {
  if (store.state.auth.accessToken) {
    next();
    return;
  }
  next('/login');
};

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: ifNotAuthenticated,
  },
  {
    path: '/register',
    name: 'UserRegister',
    component: UserRegister,
    beforeEnter: ifNotAuthenticated,
  },
  {
    path: '/profile',
    name: 'UserProfile',
    component: UserProfile,
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/employees',
    name: 'EmployeeList',
    component: EmployeeList,
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/employee/:id/edit',
    name: 'EmployeeEdit',
    component: EmployeeEdit,
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/login'
  }
];

const router = createRouter({ 
  history: createWebHistory(),
  routes,
});

export default router; 