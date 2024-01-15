<template>
	<div class="image-flex">
		<div class="img-item" v-for="(item,index) in webHistory" :key="index">
			<img class="img-single" :src="`${item.imgUrl}${index}`" alt="" />
			<div class="font-conent">
				<div class="font-title">
					<h1>{{item.heading}}</h1>
					<h5>{{item.enHeading}}</h5>
				</div>
				<div class="font-desc">{{item.content}}</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { webHistory } from './common/constant'
</script>

<style lang="scss" scoped>
	@import '@/base.scss';
	@import '@/layout.scss';

	.image-flex {
		@extend .common-flex-row;
		width: 100%;
		align-items: center;
		height: calc(100vh - 186px);

		.img-item {
			flex: 1;
			height: 400px;
			margin: 0 10px;
			position: relative;
			display: inline-block;
			overflow: hidden;
			// mix-blend-mode: difference; /* 使用混合模式增加对比度 */
			box-shadow: 0px 20px 60px rgba(0, 0, 0, 0.8);

			//border: 1px solid $baseColor;
			/* 隐藏超出边框的部分 */
			.font-conent {
				color: $baseColor;
				width: 100%;
				height: 100%;
				position: absolute;
				top: 0;
				left: 0;
				@extend .common-flex-col;
				align-items: center;
				justify-content: end;
				/* 将文本设置为透明 */
				background-clip: text;
				/* 将背景图裁剪到文本的形状 */
				-webkit-background-clip: text;

				/* 兼容性设置，针对一些旧版本的浏览器 */
				.font-title {
					padding: 10px;
					box-sizing: border-box;
					width: 100%;
					text-align: center;
					opacity: 1;
					visibility: visible;
					transition: visibility 0s, opacity 1.5s;
					background-color: rgba(0, 0, 0, 0.5);

					h1 {
						margin: 0;
					}

					h5 {
						margin: 0;
					}
				}

				.font-desc {
					font-size: 16px;
					width: 100%;
					padding: 10px;
					box-sizing: border-box;
					position: absolute;
					bottom: 0;
					left: 0;
					visibility: hidden;
					opacity: 0;
					/* 初始状态透明 */
					background-color: rgba(0, 0, 0, 0.5);
					transition: visibility 0s, opacity 1.5s;
					/* 添加过渡效果 */
				}
			}

			.img-single {
				width: 100%;
				height: 100%;
				max-width: 100%;
				display: block;
				object-fit: cover;
				transition: transform 0.3s ease;
				transform-origin: center;
			}
		}

		.img-item:hover .img-single {
			transform: scale(1.2);
			filter: blur(5px);
			outline: 2px solid transparent;
		}

		.img-item:hover .font-desc {
			/* 鼠标放上时显示元素 */
			visibility: visible;
			opacity: 1;
			/* 鼠标放上时逐渐显示元素 */
		}

		.img-item:hover .font-title {
			visibility: hidden;
			opacity: 0;
		}

		.img-item:nth-child(odd) {
			margin-top: 60px;
		}
	}
</style>