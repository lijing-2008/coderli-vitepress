const path = require('path');
const fs = require('fs');

//递归获取指定目录下的所有指定后缀名文件列表
export const walk = function (dir, subDir = '') {
	let results = [];
	const list = fs.readdirSync(dir + subDir);
	list.forEach((file) => {
		file = dir + subDir + '/' + file;
		if (path.extname(file) === '.md') {
			results.push(file);
		}
	})
	const items = results.map((item) => {
		return {
			text: path.basename(item, '.md'),
			link: item.slice(6, -3)
		}
	}).sort((a, b) => {
		const index1 = Number(a.text.split('.')[0])
		const index2 = Number(b.text.split('.')[0])
		return index1 - index2
	})
	return {
		text: subDir ?? '默认值',
		collapsible: true,
		collapsed: false,
		items: items
	}
};
