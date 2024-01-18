/**
 * @Description: 获取markdown源文件
 * @author:clearlove
 * @param 
 * @return 
 * @createTime: 2024-01-17 21:31:18
 */

/**
 * @path md文件路径
 * @return markdownText md源文件
 */
export const useGetMarkdownFile = async (path) => {
	const response = await fetch(path);
	const markdownText = await response.text();
	return markdownText
}