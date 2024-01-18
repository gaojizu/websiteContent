import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router/index.js'
import Antd from 'ant-design-vue';
// TODO: 安装render Markdown 的文件插件
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';
import hljs from 'highlight.js';

VMdPreview.use(githubTheme, {
	Hljs: hljs,
});

// 安装vuetifyUI库  
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
	components,
	directives,
})

import 'animate.css/animate.min.css'
import 'ant-design-vue/dist/reset.css';
import '@/base.scss'
import '@/layout.scss'

const app = createApp(App)
app.use(VMdPreview)
app.use(vuetify)
app.use(router)
app.use(Antd)
app.mount('#app')