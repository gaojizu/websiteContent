<template>
	<h1 class="animate__backInDown">Hi, my friend</h1>
	<hr class="con-hr" />
</template>
<script setup>
</script>
<style lang="scss" scoped>
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
</style>