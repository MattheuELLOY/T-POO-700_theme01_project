import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import './assets/main.css'
import router from '@/router'
import '@/style.css';

createApp(App).use(router).use(createPinia()).mount('#app')
