/**
 * @Description: 文章列表
 * @author:clearlove
 * @param 
 * @return 
 * @createTime: 2024-01-17 15:00:13
 */
import vueImplatePlugin from '../MD/vueImplatePlugin.md'
import transparentAttrattributes from '../MD/transparentAttrattributes.md'

export const artcleLists = [
	{
		title: '兼容vue2和vue3版本的插件实现过程',
		subTitle: 'Implementation process of plugins compatible with Vue2 and Vue3 versions',
		author: 'clearlove',
		date: '2023-04-24',
		tags: [
			{
				tagName: 'vue',
				tagColor: '#f50'
			},
			{
				tagName: 'javaScript',
				tagColor: '#2db7f5'
			}
		],
		path: vueImplatePlugin
	 },
	 {
	 	title: '了解一下透传Attrsbutes',
	 	subTitle: 'Learn about transparent Attrattributes',
	 	author: 'clearlove',
	 	date: '2023-05-24',
	 	tags: [
	 		{
	 			tagName: 'vue',
	 			tagColor: '#f50'
	 		},
			{
				tagName: 'Attrsbutes',
				tagColor: '#22e3f9'
			},
	 		{
	 			tagName: 'javaScript',
	 			tagColor: '#2db7f5'
	 		}
	 	],
	 	path: transparentAttrattributes
	  }
 ]