import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

const app = createApp(App);


const accessToken = localStorage.getItem('accessToken');
if (accessToken) {
  store.commit('setTokens', { access: accessToken, refresh: localStorage.getItem('refreshToken') });
}

app.use(router);
app.use(store);

app.mount('#app');