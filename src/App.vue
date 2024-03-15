<template>
	<a-watermark content="clearlove">
		<!-- 操作角标 -->
		<a-float-button @click="handleClick" href="./">
			<template v-slot:description>首页</template>
		</a-float-button>
		<router-view></router-view>
		<Layout></Layout>
	</a-watermark>
</template>

<script setup>
	import Layout from '@/layout/index.vue'
</script>

<style lang="scss">
	@import '@/base.scss';

	body {
		margin: 0;
		padding: 0;
		background-color: $bgColor;
	}
</style>