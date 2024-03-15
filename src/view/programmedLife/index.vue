<template>
	<div class="content">
		<a-timeline mode="alternate">
			<a-timeline-item v-for="(item,index) in timeLineDot" :key="index">
				<template #dot v-if="item.isDot">
					<ClockCircleOutlined style="font-size: 16px" />
				</template>
				{{item.company}}
			</a-timeline-item>
		</a-timeline>
	</div>
</template>

<script setup>
	import { ClockCircleOutlined } from '@ant-design/icons-vue';
	import {timeLineDot} from './common/dateTimeLine.js'
</script>

<style lang="scss" scoped>
	@import '@/base.scss';
	@import '@/layout.scss';

	.content {
		background: $baseColor;
		box-sizing: border-box;
		padding: 30px 20px 30px 20px;
	}
</style>