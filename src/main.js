import { createApp } from 'vue'
import App from './App.vue'

import registerPlugin from '@/plugins/registerPlugin'

import 'animate.css/animate.min.css'
import 'ant-design-vue/dist/reset.css';
import '@/base.scss'
import '@/layout.scss'

const app = createApp(App)
app.use(registerPlugin)
app.mount('#app')