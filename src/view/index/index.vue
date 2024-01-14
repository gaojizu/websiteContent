<template>
	<div class="container">
		<div class="content">
			<component :is="dynamicComponent"></component>
			<hr class="con-hr" />
		</div>
		<h1>nihao</h1>
	</div>
</template>

<script setup>
	import {ref} from 'vue'
	import Default from '@/components/default/index.vue'
	const dynamicComponent = ref(Default)
</script>

<style scoped lang="scss">
	@import '@/base.scss';
	@import '@/layout.scss';

	.container {
		color: #fff;
		@extend .common-flex-col-center;
		padding: 40px;
		position: relative;
		.content {
			width: 400px;

			h1 {
				font-size: 48px;
				font-weight: bold;
			}

			/* 通过CSS实现打字效果 */
			@keyframes typing {
				from {
					width: 0;
				}

				to {
					width: 100%;
				}
			}

			/* 应用动画到文本元素 */
			h1 {
				overflow: hidden;
				/* 隐藏超出部分 */
				border-right: .1em solid white;
				/* 创建光标效果 */
				white-space: nowrap;
				/* 文本不换行 */
				margin: 0 auto;
				/* 居中 */
				letter-spacing: .15em;
				/* 字母间距 */
				animation: typing 3.5s steps(40, end), blink-caret .75s step-end infinite;
				/* 应用动画 */
			}

			/* 创建光标闪烁效果 */
			@keyframes blink-caret {

				from,
				to {
					border-color: transparent;
				}

				50% {
					border-color: orange;
				}
			}

			hr {
				width: 400px;
			}
		}
	}
</style>