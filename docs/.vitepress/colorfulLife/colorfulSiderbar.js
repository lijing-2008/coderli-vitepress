import {walk} from "../scripts/utils";
const baseDir = './docs/colorfulLife/'
export const colorfulSidebar = [
	walk(baseDir, '个人总结'),
	walk(baseDir, '杂七杂八')
]
