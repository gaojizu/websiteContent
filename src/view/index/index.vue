<template>
	<div class="container">
		<div class="content">
			<component :is="dynamicComponent"></component>
		</div>
		<!-- 图片布局 -->
		<ImageLayout></ImageLayout>
	</div>
</template>

<script setup>
	import { ref } from 'vue'
	import Default from '@/components/default/index.vue'
	import ImageLayout from '@/components/ImageLayout/index.vue'
	const dynamicComponent = ref(Default)
</script>

<style scoped lang="scss">
	@import '@/base.scss';
	@import '@/layout.scss';
	
	.container {
		color: $baseColor;
		@extend .common-flex-col-center;
		position: relative;
		.content {
			width: 400px;
			
		}
	}
</style>