<template>
	<router-view></router-view>
	<Layout></Layout>
</template>

<script setup>
	import Layout from '@/layout/index.vue'
</script>

<style lang="scss">
	@import '@/base.scss';
  body{
		margin: 0;
		padding: 0;
		background-color: $bgColor;
	}
</style>