import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import axios from 'axios'
import VueAxios from 'vue-axios'

import './assets/main.css'

createApp(App).use(createPinia()).use(VueAxios, axios).mount('#app')
