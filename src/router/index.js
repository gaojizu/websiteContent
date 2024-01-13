import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
	{
		path: '/',
		name: '主页',
		component: () => import('@/view/main/index.vue')
}
]

const router = createRouter({
	history: createWebHashHistory(),
	routes
})

export default router