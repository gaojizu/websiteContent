import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
	{
		path: '/',
		name: '主页',
		component: () => import('@/view/index/index.vue')
  },
	{
		path: '/articleRecords',
		name: '文章记录',
		component: () => import('@/view/articleRecords/index.vue')
	}, {
		path: '/technologicalFrontier',
		name: '技术前沿',
		component: () => import('@/view/technologicalFrontier/index.vue')
	}, {
		path: '/funCss',
		name: '趣味css',
		component: () => import('@/view/funCss/index.vue')
	}, {
		path: '/codeParsing',
		name: '代码解析',
		component: () => import('@/view/codeParsing/index.vue')
	}, {
		path: '/caseAnalysis',
		name: '案例分析',
		component: () => import('@/view/caseAnalysis/index.vue')
	}, {
		path: '/programmedLife',
		name: '程序人生',
		component: () => import('@/view/programmedLife/index.vue')
	}, {
		path: '/itsMe',
		name: '是我了',
		component: () => import('@/view/itsMe/index.vue')
	}
]

const router = createRouter({
	history: createWebHashHistory(),
	routes
})

export default router