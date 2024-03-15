<template>
	<div>
		<a-drawer class="drawer" :closable='false' :open="openDrawer" width="70%" size="large" :title="title" :placement="placement" @close="closeDrawer">
			<!-- 自定义内容 -->
			<slot name="mdFile"></slot>
			<!-- 默认md文件内容 -->
			<a-watermark content="clearlove" fontStyle='italic' :fontSize='30' color="rgba(0,0,0,.05)">
				<v-md-preview :text="markdownContent"></v-md-preview>
			</a-watermark>
			<!-- 关闭区域 -->
			<div class="closeIcon" @click="closeDrawer">
				<img src="@/assets/images/flower.png" />
			</div>
			<div class="showTip" @click="closeDrawer">
				<!-- 这里放的是自己录制的视频 -->
				<!-- <img src="@/assets/images/jige.gif" alt="" /> -->
			</div>
		</a-drawer>
	</div>
</template>

<script setup>
	defineProps({
		openDrawer: {
			type: Boolean,
			default: () => {
				return true
			}
		},
		placement: {
			type: String,
			default: () => {
				return 'right'
			}
		},
		title: {
			type: String,
			default: () => {
				return 'title'
			}
		},
		markdownContent: {
			type: String,
			default: () => {
				return 'md'
			}
		}
	})

	const emit = defineEmits(['closeDrawer'])
	const closeDrawer = () => {
		emit('closeDrawer', false)
	}
</script>

<style scoped lang="scss">
	@import '@/base.scss';
	@import '@/layout.scss';

	.common-absolute {
		position: absolute;
	}

	.drawer {
		position: relative;

		.showTip {
			position: absolute;
			top: 10px;
			left: calc(-30% - 100px);
			width: calc(30%);
			height: 100vh;
			// border: 1px solid #f40;
			// background-color: $baseColor;
			color: $baseColor;

			img {
				margin: 10px 0;
			}
		}

		.closeIcon {
			position: absolute;
			top: 3px;
			left: -65px;
			width: 60px;
			height: 56px;
			border-radius: 60px 0 0 60px;
			background-color: transparent;

			img {
				width: 100%;
				height: 100%;
			}

			img:hover {
				cursor: pointer;
			}
		}
	}
</style>