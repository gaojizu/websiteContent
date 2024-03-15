/**
 * @Description: 注册插件
 * @author:clearlove
 * @param 
 * @return 
 * @createTime: 2024-01-22 15:54:07
 */

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

// 安装vuetifyUI库  使用页面背景滚动效果
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
	components,
	directives,
})

export default {
  install:(app,options)=>{
		console.log(app)
		console.log(options)
		app.provide('globalData', options)
		app.use(VMdPreview)
		app.use(vuetify)
		app.use(router)
		app.use(Antd)
	}
}