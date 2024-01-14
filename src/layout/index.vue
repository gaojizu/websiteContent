<template>
	<div class="container">
		<div class="botton-content">
			<div class="chl-content" v-for="(item,index) in  navigationLists" :key="index" @click="toPage(item.path)">
				<div class="f-title">{{item.heading}}</div>
				<div class="s-title">{{item.subtitle}}</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { useRouter } from "vue-router";
	import {navigationLists} from './common/navigation.js'
	const router = useRouter();
	const toPage = (path)=>{
		router.push(path)
	}
</script>

<style lang="scss" scoped>
	@import '@/base.scss';
	@import '@/layout.scss';
	
	.container {
		color: $baseColor;
		@extend .common-flex-col-center;
		padding: 40px;
		position: relative;
	
		.botton-content {
			position: fixed;
			bottom: 0;
			height: 100px;
			// background-color: #CD0B0B;
			background: linear-gradient(#e42424,#CD0B0B);
			width: 100%;
			@extend .common-flex-row;
			justify-content: space-around;
			
			.chl-content {
				@extend .common-flex-col-center;
				cursor: pointer;
				flex: 1;
				border: 1px solid #e53232;
				border-bottom: none;
			
				.f-title {
					font-style: normal;
					font-size: 24px;
					font-weight: bold;
				}
			
				.s-title {
					font-size: 16px;
					font-style: italic;
				}
			}
			
			.chl-content:hover {
				// scale: 1.1;
				background: linear-gradient(#c71111,#c70505);
			}
		}
		
	}
</style>