<template>
	<div class="warpper">
		<div class="content">
			<!-- <div class="its-image" id="itsImage"></div> -->
			<div class="its-me" id="itsMe">IT`S ME</div>
		</div>
		<v-parallax :src="material">
			<div class="its-content">
				<h1>content</h1>
			</div>
		</v-parallax>
	</div>

</template>

<script setup>
	import { onMounted } from 'vue'
	import { isBottom } from '@/common/utils'
	import material from '@/assets/images/material.jpg'

	// 滚动效果
	const handleScroll = () => {
		const scrollingText = document.getElementById('itsMe');
		const scrollY = window.scrollY;
		const scale = 1 + scrollY * 0.05;
		scrollingText.style.transform = `scale(${scale})`;
		if (isBottom()) {
			console.log("触底啦！");
			scrollingText.style.display = 'none';
		} else {
			scrollingText.style.display = 'block';
		}
	}

	onMounted(() => {
		window.addEventListener('scroll', handleScroll);
	})
</script>

<style lang="scss" scoped>
	@import '@/base.scss';
	@import '@/layout.scss';

	.warpper {
		padding-bottom: 100px;

		.content {
			height: 300vh;
			@extend .common-flex-row-center;
			color: $baseColor;
			box-sizing: border-box;
			position: relative;

			.its-me {
				font-size: 80px;
				position: fixed;
				top: 45%;
				text-align: center;
			}

			.its-image {
				position: fixed;
				top: 0;
				left: 0;
				background: url('@/assets/images/funcss.jpg') no-repeat;
				width: 100vw;
				height: 100vh;
				background-size: cover;
				background-position: center;
			}
		}

		.its-content {
			color: $baseColor;
		}
	}
</style>