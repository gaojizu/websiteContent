<template>
	<div class="content">
		<div class="art-item" v-for="i in 30" :key="i">
			<div class="item-left">
				<div class="item-sort">0{{i}}.</div>
				<div class="item-heading">我是一个标题</div>
			</div>
			<div class="item-right">
				{{new Date()}}
			</div>
		</div>
	</div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
	@import '@/base.scss';
	@import '@/layout.scss';

	.content {
		// @extend .common-bg-image-cover;
		color: $baseColor;
		background: url(@/assets/images/funcss.jpg) no-repeat;
		// filter: contrast(150%);
		padding-bottom: 100px;
		width: 100vw;
		height: 100vh;
		background-size: cover;
		background-position: center;

		.art-item {
			box-sizing: border-box;
			border-top: 1px solid $baseColor;
			@extend .common-flex-row;
			justify-content: space-between;
			padding: 30px 15px;
			color: $baseColor;
			font-size: 20px;
			background-color: rgba(255, 255, 255, 0.3);

			.item-left {
				@extend .common-flex-row;

				.item-sort {
					width: 150px;
					box-sizing: border-box;
					font-size: 30px;
				}
				.item-heading:hover{
					cursor: pointer;
				}
			}
		}

		.art-item:hover {
			background-color: rgba(255, 255, 255, 0);
			box-sizing: border-box;

			.item-sort {
				transition:  0.5s ease;
				padding: 0 0 0 20px;
			}

			.item-right {
				transition:  0.5s ease;
				padding: 0 20px 0 0;
			}
		}
	}
</style>