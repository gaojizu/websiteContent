import { defineConfig } from 'vite'
import { resolve } from 'path';

import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue()],
	hot: false,
	liveReload: false,
	assetsInclude: ['**/*.ppt', '**/*.md'], // 本地支持ppt文件
	resolve: {
		alias: {
			'@': resolve(__dirname, './src')
		}
	},
	// 关于打包
	build: {
		assetsInclude: ['**/*.ppt','**/*.md'],
		// chunk 大小警告的限制（以 kbs 为单位）
		chunkSizeWarningLimit: 2000,
		// 在生产环境移除console.log
		terserOptions: {
			compress: {
				drop_console: false,
				drop_debugger: true
			}
		}
	},
	server: {
		port: 8902
	}
})