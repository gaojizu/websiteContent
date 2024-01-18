<template>
	<div class="root">
		<div class="constater">
			<div class="content">
				<div class="art-content" v-for="(item,index) in artcleLists" :key="index">
					<div class="art-show-content">
						<div class="art-heading">{{item.title}}</div>
						<div class="art-sub-title">{{item.subTitle}}</div>
						<div class="art-author">作者: {{item.author}}</div>
						<div class="art-date">日期: {{item.date}}</div>
						<div class="art-label">
							<a-tag class="art-tag" v-for="(it,idx) in item.tags" :color="it.tagColor" :key="idx">{{it.tagName}}</a-tag>
						</div>
					</div>
					<div class="art-option">
						<button class="art-btn" @click="handleReadMore(item)">READ MORE</button>
					</div>
				</div>
			</div>
		</div>
		<RenderMdDrawer :openDrawer="openDrawer" :markdownContent="markdownContent" :title="titleDrawer" @closeDrawer="closeDrawer">
		</RenderMdDrawer>
	</div>
</template>

<script setup>
	import { ref } from 'vue'
	import { artcleLists } from './common/artcleLists.js'
	import { useGetMarkdownFile } from '@/hooks/useGetMarkdownFile'
	import RenderMdDrawer from '@/components/RenderMdDrawer/index.vue'

	const openDrawer = ref(false)
	const titleDrawer = ref('')
	// TODO: 关闭抽屉
	const closeDrawer = (val) => {
		openDrawer.value = val
	}
	const markdownContent = ref()
	// TODO: 阅读更多
	const handleReadMore = async (item) => {
		markdownContent.value = await useGetMarkdownFile(item.path)
		titleDrawer.value = item.title
		openDrawer.value = true
	}
</script>

<style lang="scss" scoped>
	@import './index.scss'
</style>