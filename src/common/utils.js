/**
 * @Description:工具类
 * @author:clearlove
 * @param 
 * @return 
 * @createTime: 2024-01-17 11:27:43
 */

// TODO: 页面是否触底
export const isBottom = () => {
	// 获取文档高度
	const documentHeight = document.documentElement.scrollHeight;
	// 获取窗口可视区域的高度
	const windowHeight = window.innerHeight || document.documentElement.clientHeight;
	// 获取当前滚动的距离
	const scrollY = window.scrollY || window.pageYOffset || document.body.scrollTop + (document.documentElement && document.documentElement.scrollTop || 0);
	// 判断是否已经滚动到底部，可以根据需要调整阈值
	return documentHeight - (scrollY + windowHeight) < 10;
}