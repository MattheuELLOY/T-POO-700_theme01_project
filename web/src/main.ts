import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import './assets/main.css'
import router from '@/router'

createApp(App).use(router).use(createPinia()).mount('#app')
