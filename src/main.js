import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router/index.js'
import 'animate.css/animate.min.css'
import '@/base.scss'
import '@/layout.scss'

const app = createApp(App)
app.use(router)
app.mount('#app')